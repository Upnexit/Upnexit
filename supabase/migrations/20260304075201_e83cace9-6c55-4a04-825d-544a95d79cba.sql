
-- Temporarily enable signup to create admin user, we'll create via SQL
-- First create a helper function to make admin users
CREATE OR REPLACE FUNCTION public.make_admin(admin_email TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_user_id UUID;
BEGIN
  SELECT id INTO target_user_id FROM auth.users WHERE email = admin_email;
  IF target_user_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (target_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;
