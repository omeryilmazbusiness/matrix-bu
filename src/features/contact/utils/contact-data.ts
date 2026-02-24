import type { ContactInfo, ContactInfoCardData } from '../types';

// Platform iletişim bilgileri
export const contactInfo: ContactInfo = {
  email: 'info@hakikatbu.com',
  phone: '+90 (555) 123 45 67',
  address: 'Örnek Mahallesi, Test Caddesi No: 123/4, Kadıköy/İstanbul',
  socialMedia: {
    twitter: 'https://twitter.com/hakikatbu',
    instagram: 'https://instagram.com/hakikatbu',
    youtube: 'https://youtube.com/@hakikatbu',
    linkedin: 'https://linkedin.com/company/hakikatbu',
    whatsapp: 'https://wa.me/905551234567',
    telegram: 'https://t.me/hakikatbu'
  },
  coordinates: {
    lat: 40.9929,
    lng: 29.0261
  }
};

// Hızlı iletişim kartları
export const contactInfoCards: ContactInfoCardData[] = [
  {
    id: 'email',
    icon: 'Mail',
    title: 'E-posta Gönderin',
    subtitle: contactInfo.email,
    description: '7/24 size dönüş yapıyoruz',
    actionLabel: 'Email Gönder',
    actionUrl: `mailto:${contactInfo.email}`
  },
  {
    id: 'social',
    icon: 'Share2',
    title: 'Bizi Takip Edin',
    subtitle: 'Sosyal Medya',
    description: 'Güncel içeriklerimizden haberdar olun',
    actionLabel: 'Takip Et',
    actionUrl: contactInfo.socialMedia.twitter
  },
  {
    id: 'location',
    icon: 'MapPin',
    title: 'Adres',
    subtitle: 'İstanbul / Türkiye',
    description: 'Ofisimize ziyaret edebilirsiniz',
    actionLabel: 'Yol Tarifi',
    actionUrl: `https://maps.google.com/?q=${contactInfo.coordinates?.lat},${contactInfo.coordinates?.lng}`
  }
];

// Konu seçenekleri
export const subjectOptions = [
  { value: '', label: 'Konu seçiniz...' },
  { value: 'genel', label: 'Genel Bilgi' },
  { value: 'kanal-onerisi', label: 'Kanal Önerisi' },
  { value: 'teknik-destek', label: 'Teknik Destek' },
  { value: 'is-birligi', label: 'İş Birliği' },
  { value: 'diger', label: 'Diğer' }
];
