-- Public visitors may record anonymous page views, but only the server-side
-- service role may read analytics or estimate-request data.

DROP POLICY IF EXISTS "Estimate requests are readable"
  ON public.estimate_requests;
DROP POLICY IF EXISTS "Anyone can submit an estimate request"
  ON public.estimate_requests;
REVOKE SELECT, INSERT ON public.estimate_requests FROM anon, authenticated;

DROP POLICY IF EXISTS "Anyone can read page views"
  ON public.page_views;
REVOKE SELECT ON public.page_views FROM anon, authenticated;

ALTER TABLE public.estimate_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
