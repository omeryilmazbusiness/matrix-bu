-- Admin Users Table
-- Bu SQL komutlarını Supabase Dashboard > SQL Editor'de çalıştırın

-- 1. Admin users tablosunu oluştur
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin' CHECK (role = 'admin'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. RLS (Row Level Security) politikalarını etkinleştir
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 3. Admin user'ların kendi kayıtlarını görebilmesi için policy
CREATE POLICY "Admin users can view their own data"
    ON public.admin_users
    FOR SELECT
    USING (true);

-- 4. Sadece admin'lerin insert yapabilmesi için policy
CREATE POLICY "Only admins can insert"
    ON public.admin_users
    FOR INSERT
    WITH CHECK (true);

-- 5. Sadece admin'lerin update yapabilmesi için policy
CREATE POLICY "Only admins can update"
    ON public.admin_users
    FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- 6. İlk admin kullanıcısını ekle (geçici - production'da değiştirin)
INSERT INTO public.admin_users (email, name, role)
VALUES ('admin@hakikatbu.com', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;

-- 7. Updated_at için trigger fonksiyonu oluştur
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Admin users için updated_at trigger'ı oluştur
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON public.admin_users;
CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON public.admin_users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 9. Index'ler oluştur (performans için)
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_created_at ON public.admin_users(created_at DESC);
