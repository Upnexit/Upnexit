
CREATE TABLE public.client_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  logo_url text,
  rating integer NOT NULL DEFAULT 5,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.client_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view client reviews" ON public.client_reviews FOR SELECT USING (true);
CREATE POLICY "Admins can insert client reviews" ON public.client_reviews FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update client reviews" ON public.client_reviews FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete client reviews" ON public.client_reviews FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));
