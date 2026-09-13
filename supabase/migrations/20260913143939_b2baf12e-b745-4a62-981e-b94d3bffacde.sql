CREATE TABLE public.page_views (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path text NOT NULL,
  referrer text,
  user_agent text,
  visitor_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX page_views_created_at_idx ON public.page_views (created_at DESC);
GRANT SELECT, INSERT ON public.page_views TO anon;
GRANT SELECT, INSERT ON public.page_views TO authenticated;
GRANT ALL ON public.page_views TO service_role;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can record a page view" ON public.page_views FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can read page views" ON public.page_views FOR SELECT TO anon, authenticated USING (true);