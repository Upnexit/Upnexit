
DROP POLICY IF EXISTS "Anyone can view approved comments" ON public.blog_comments;

CREATE OR REPLACE VIEW public.blog_comments_public
WITH (security_invoker = true) AS
SELECT id, blog_post_id, name, comment, rating, created_at, is_approved
FROM public.blog_comments
WHERE is_approved = true;

CREATE POLICY "Approved comments readable (columns restricted via grants)"
ON public.blog_comments
FOR SELECT
TO anon, authenticated
USING (is_approved = true);

REVOKE SELECT ON public.blog_comments FROM anon, authenticated;
GRANT SELECT (id, blog_post_id, name, comment, rating, created_at, is_approved)
  ON public.blog_comments TO anon, authenticated;
GRANT INSERT ON public.blog_comments TO anon, authenticated;
GRANT SELECT ON public.blog_comments_public TO anon, authenticated;

DROP POLICY IF EXISTS "Anyone can insert page views" ON public.page_views;
CREATE POLICY "Public can insert validated page views"
ON public.page_views
FOR INSERT
TO anon, authenticated
WITH CHECK (
  page_path IS NOT NULL
  AND length(page_path) BETWEEN 1 AND 256
  AND page_path LIKE '/%'
  AND (visitor_id IS NULL OR length(visitor_id) <= 128)
  AND (user_agent IS NULL OR length(user_agent) <= 512)
  AND (referrer IS NULL OR length(referrer) <= 512)
  AND (country IS NULL OR length(country) <= 64)
  AND (country_code IS NULL OR length(country_code) <= 8)
  AND (city IS NULL OR length(city) <= 128)
);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  caller uuid := auth.uid();
  is_caller_admin boolean;
BEGIN
  IF caller IS NULL THEN
    RETURN false;
  END IF;

  IF _user_id <> caller THEN
    SELECT EXISTS (
      SELECT 1 FROM public.user_roles WHERE user_id = caller AND role = 'admin'::app_role
    ) INTO is_caller_admin;
    IF NOT is_caller_admin THEN
      RETURN false;
    END IF;
  END IF;

  RETURN EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  );
END;
$$;
