
CREATE TABLE public.daily_quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_date DATE NOT NULL UNIQUE,
  quotes JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.daily_quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Daily quotes are publicly readable"
ON public.daily_quotes
FOR SELECT
USING (true);
