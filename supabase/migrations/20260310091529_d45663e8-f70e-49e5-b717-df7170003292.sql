
-- Fix overly permissive INSERT policy - restrict to own user_id
DROP POLICY "Authenticated users can insert reports" ON public.admin_notifications;

CREATE POLICY "Users can insert own reports"
ON public.admin_notifications
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);
