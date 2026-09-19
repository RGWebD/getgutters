CREATE TABLE public.estimate_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.estimate_requests TO anon;
GRANT SELECT, INSERT ON public.estimate_requests TO authenticated;
GRANT ALL ON public.estimate_requests TO service_role;
ALTER TABLE public.estimate_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an estimate request" ON public.estimate_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Estimate requests are readable" ON public.estimate_requests FOR SELECT TO anon, authenticated USING (true);