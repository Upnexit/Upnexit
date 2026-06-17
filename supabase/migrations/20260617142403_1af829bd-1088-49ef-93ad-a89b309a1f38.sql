
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.make_admin(text) FROM PUBLIC, anon, authenticated;

CREATE SCHEMA IF NOT EXISTS extensions;
GRANT USAGE ON SCHEMA extensions TO postgres, anon, authenticated, service_role;
DROP EXTENSION IF EXISTS pg_net;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

DROP POLICY IF EXISTS "Anyone can view team photos" ON storage.objects;
CREATE POLICY "Public can view branding and team photos"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'team-photos'
  AND (storage.foldername(name))[1] IN ('branding', 'team')
);

DROP POLICY IF EXISTS "Anyone can send messages" ON public.messages;
CREATE POLICY "Anyone can send messages"
ON public.messages FOR INSERT
WITH CHECK (
  length(coalesce(name, '')) BETWEEN 1 AND 100
  AND length(coalesce(email, '')) BETWEEN 3 AND 255
  AND length(coalesce(message, '')) BETWEEN 1 AND 2000
);

DROP POLICY IF EXISTS "Anyone can insert comments" ON public.blog_comments;
CREATE POLICY "Anyone can insert comments"
ON public.blog_comments FOR INSERT
WITH CHECK (
  length(coalesce(name, '')) BETWEEN 1 AND 100
  AND length(coalesce(email, '')) BETWEEN 3 AND 255
  AND length(coalesce(comment, '')) BETWEEN 1 AND 2000
);
