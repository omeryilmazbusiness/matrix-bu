-- Admin Users Table oluştur
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS politikalarını etkinleştir
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admin users can view all data"
    ON public.admin_users
    FOR SELECT
    USING (true);

CREATE POLICY "Allow insert"
    ON public.admin_users
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow update"
    ON public.admin_users
    FOR UPDATE
    USING (true);

-- İlk admin kullanıcısını ekle
INSERT INTO public.admin_users (email, name, role, is_active)
VALUES ('admin@hakikatbu.com', 'Admin User', 'super_admin', true)
ON CONFLICT (email) DO NOTHING;

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_admin_users_updated_at ON public.admin_users;
CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON public.admin_users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Index'ler
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);
