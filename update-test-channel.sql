-- Update test channel to use local placeholder image
UPDATE public.profiles 
SET thumbnail_high = '/placeholder-channel.svg',
    thumbnail_medium = '/placeholder-channel.svg',
    thumbnail_default = '/placeholder-channel.svg',
    status = 'published'
WHERE channel_title = 'Hakikat Bu - Test Kanalı';

-- Also update Serhendi Vakfı to published status
UPDATE public.profiles 
SET status = 'published'
WHERE channel_title = 'Serhendî Vakfı';

-- Show results
SELECT 
    channel_title, 
    slug, 
    status, 
    thumbnail_high,
    subscriber_count 
FROM public.profiles 
ORDER BY created_at DESC;
