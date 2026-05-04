-- SEO rank tracking tables
create table if not exists public.seo_keywords (
  id uuid primary key default gen_random_uuid(),
  keyword text not null unique,
  target_domain text not null default 'upnexit.pro.bd',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.seo_rank_history (
  id uuid primary key default gen_random_uuid(),
  keyword_id uuid not null references public.seo_keywords(id) on delete cascade,
  position int,
  found_url text,
  engine text not null default 'duckduckgo',
  checked_at timestamptz not null default now()
);

create index if not exists idx_seo_rank_history_keyword on public.seo_rank_history(keyword_id, checked_at desc);

alter table public.seo_keywords enable row level security;
alter table public.seo_rank_history enable row level security;

create policy "Admins manage seo_keywords"
  on public.seo_keywords for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins read seo_rank_history"
  on public.seo_rank_history for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins insert seo_rank_history"
  on public.seo_rank_history for insert
  to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

-- Seed keywords
insert into public.seo_keywords (keyword) values
  ('upnex it'), ('Upnex It'), ('UPNEX IT'), ('upnexit'), ('upnex-it'),
  ('upnex it bangladesh'), ('upnexit bd'), ('upnex it pro'), ('upnext it'),
  ('upnex it naogaon'), ('upnex it ltd'), ('আপনেক্স আইটি'), ('আপনেক্স'),
  ('উপনেক্স আইটি'), ('software company naogaon')
on conflict (keyword) do nothing;

-- Weekly cron via pg_cron + pg_net to invoke edge function
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Remove existing job if present
do $$
begin
  perform cron.unschedule('seo-weekly-rank-check');
exception when others then null;
end$$;

select cron.schedule(
  'seo-weekly-rank-check',
  '0 3 * * 1', -- every Monday 03:00 UTC
  $$
  select net.http_post(
    url := 'https://jbkzetqirqmyuijkfhvy.supabase.co/functions/v1/seo-rank-check',
    headers := jsonb_build_object('Content-Type','application/json','x-cron-secret', current_setting('app.cron_secret', true)),
    body := jsonb_build_object('source','cron')
  );
  $$
);