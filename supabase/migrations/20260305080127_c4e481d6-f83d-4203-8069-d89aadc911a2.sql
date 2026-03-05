
CREATE TABLE public.chatbot_qa (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.chatbot_qa ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active chatbot QA" ON public.chatbot_qa
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert chatbot QA" ON public.chatbot_qa
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update chatbot QA" ON public.chatbot_qa
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete chatbot QA" ON public.chatbot_qa
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));
