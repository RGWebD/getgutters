CREATE TABLE public.chat_conversations (
  id uuid PRIMARY KEY,
  messages jsonb NOT NULL DEFAULT '[]'::jsonb,
  lead_captured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.chat_conversations TO service_role;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estimate_requests ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'form';