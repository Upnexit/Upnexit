
-- The "Anyone can send messages" INSERT policy with WITH CHECK (true) is intentional
-- because unauthenticated visitors need to submit contact forms.
-- Add a rate-limiting note but keep the policy as-is since it's a public contact form.

-- Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES
  ('company_name', 'Upnex It'),
  ('email', 'upnex360@gmail.com'),
  ('phone', '+880 1628112731'),
  ('location_bn', 'সাপাহার, নওগাঁ, বাংলাদেশ'),
  ('location_en', 'Sapahar, Naogaon, Bangladesh'),
  ('clients_count', '10+'),
  ('projects_count', '50+'),
  ('years_experience', '2+'),
  ('youtube_video_id', 'GuXDGUQbawI');
