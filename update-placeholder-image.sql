-- Update placeholder image URL in database
UPDATE public.profiles 
SET thumbnail_high = '/placeholder-channel.svg',
    thumbnail_medium = '/placeholder-channel.svg',
    thumbnail_default = '/placeholder-channel.svg'
WHERE youtube_channel_id = 'UC_test_channel_id';
