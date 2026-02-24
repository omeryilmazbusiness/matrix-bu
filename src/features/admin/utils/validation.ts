import { z } from 'zod';

/**
 * Profile Form Validation Schema
 * Used for creating and editing profiles
 */
export const profileFormSchema = z.object({
  slug: z.string()
    .min(3, 'Slug en az 3 karakter olmalıdır')
    .max(100, 'Slug en fazla 100 karakter olabilir')
    .regex(/^[a-z0-9-]+$/, 'Slug sadece küçük harf, rakam ve tire içerebilir')
    .describe('URL-friendly unique identifier'),
  
  title: z.string()
    .min(3, 'Başlık en az 3 karakter olmalıdır')
    .max(200, 'Başlık en fazla 200 karakter olabilir'),
  
  name: z.string()
    .min(2, 'İsim en az 2 karakter olmalıdır')
    .max(150, 'İsim en fazla 150 karakter olabilir'),
  
  image_url: z.string()
    .url('Geçerli bir URL giriniz')
    .min(1, 'Resim URL zorunludur'),
  
  topic: z.string()
    .min(1, 'Kategori seçiniz')
    .max(50, 'Kategori en fazla 50 karakter olabilir'),
  
  description: z.string()
    .min(10, 'Açıklama en az 10 karakter olmalıdır')
    .max(1000, 'Açıklama en fazla 1000 karakter olabilir'),
  
  youtube_url: z.string()
    .url('Geçerli bir YouTube URL giriniz')
    .optional()
    .or(z.literal('')),
  
  twitter_url: z.string()
    .url('Geçerli bir Twitter URL giriniz')
    .optional()
    .or(z.literal('')),
  
  instagram_url: z.string()
    .url('Geçerli bir Instagram URL giriniz')
    .optional()
    .or(z.literal('')),
  
  status: z.enum(['active', 'verified', 'draft', 'archived'], {
    message: 'Geçerli bir durum seçiniz',
  }),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;

// Topic options for select dropdown
export const topicOptions = [
  { value: 'din-felsefe', label: 'Din & Felsefe' },
  { value: 'tarih', label: 'Tarih' },
  { value: 'bilim', label: 'Bilim & Teknoloji' },
  { value: 'edebiyat', label: 'Edebiyat' },
  { value: 'sanat', label: 'Sanat & Kültür' },
  { value: 'psikoloji', label: 'Psikoloji' },
  { value: 'ekonomi', label: 'Ekonomi & İş' },
  { value: 'egitim', label: 'Eğitim' },
  { value: 'muzik', label: 'Müzik' },
  { value: 'spor', label: 'Spor' },
  { value: 'diger', label: 'Diğer' },
] as const;

// Status options
export const statusOptions = [
  { value: 'draft', label: 'Taslak', color: 'gray' },
  { value: 'active', label: 'Aktif', color: 'blue' },
  { value: 'verified', label: 'Onaylı', color: 'green' },
  { value: 'archived', label: 'Arşivlendi', color: 'red' },
];
