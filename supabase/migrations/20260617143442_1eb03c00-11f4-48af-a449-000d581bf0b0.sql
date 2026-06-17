
-- 1) blog_comments: remove public SELECT policy, force use of blog_comments_public view
DROP POLICY IF EXISTS "Approved comments readable (columns restricted via grants)" ON public.blog_comments;
REVOKE SELECT ON public.blog_comments FROM anon, authenticated;
-- Ensure the view is accessible publicly
GRANT SELECT ON public.blog_comments_public TO anon, authenticated;

-- 2) site_settings: remove from realtime publication to stop broadcasting contact info
ALTER PUBLICATION supabase_realtime DROP TABLE public.site_settings;

-- 3) team-photos bucket: extend public read to client-logos/ prefix (intentional public client logos)
DROP POLICY IF EXISTS "Public read for branding and team folders" ON storage.objects;
CREATE POLICY "Public read for branding, team, and client-logos folders"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'team-photos'
  AND (
    (storage.foldername(name))[1] IN ('branding', 'team', 'client-logos')
  )
);
