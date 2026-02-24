-- Eksik kolonları profiles tablosuna ekle
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS youtube_url VARCHAR(500);

-- Mevcut kayıtları güncelle (youtube_channel_url -> youtube_url kopyala)
UPDATE public.profiles 
SET youtube_url = youtube_channel_url
WHERE youtube_url IS NULL AND youtube_channel_url IS NOT NULL;

-- Kontrol et
SELECT 
  id, 
  name, 
  title, 
  slug, 
  image_url, 
  youtube_url, 
  youtube_channel_url,
  channel_title,
  topic,
  status
FROM public.profiles 
LIMIT 5;
