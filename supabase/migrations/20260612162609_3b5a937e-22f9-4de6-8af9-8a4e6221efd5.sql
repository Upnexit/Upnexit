ALTER TABLE public.site_settings REPLICA IDENTITY FULL;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='site_settings'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings';
  END IF;
END$$;