CREATE TABLE public.lead_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  area TEXT NOT NULL,
  timeline TEXT,
  rooms TEXT[] NOT NULL DEFAULT '{}',
  budget TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.lead_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON public.lead_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 200
    AND length(phone) BETWEEN 1 AND 50
    AND length(area) BETWEEN 1 AND 200
    AND length(budget) BETWEEN 1 AND 100
    AND (timeline IS NULL OR length(timeline) <= 100)
    AND array_length(rooms, 1) IS NOT NULL
    AND array_length(rooms, 1) <= 10
  );