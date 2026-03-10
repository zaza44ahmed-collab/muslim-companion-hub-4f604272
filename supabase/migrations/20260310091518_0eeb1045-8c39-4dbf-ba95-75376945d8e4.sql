
-- Admin notifications table for push notifications from admin
CREATE TABLE public.admin_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'general',
  user_id UUID,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

-- Everyone can read notifications
CREATE POLICY "Anyone can view notifications"
ON public.admin_notifications
FOR SELECT
TO public
USING (true);

-- Only authenticated users can insert (for reports)
CREATE POLICY "Authenticated users can insert reports"
ON public.admin_notifications
FOR INSERT
TO authenticated
WITH CHECK (true);
