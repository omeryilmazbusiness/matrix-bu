// Contact Form Types
export type ContactSubject = 
  | 'genel' 
  | 'kanal-onerisi' 
  | 'teknik-destek' 
  | 'is-birligi' 
  | 'diger';

export interface ContactFormData {
  fullName: string;
  email: string;
  subject: ContactSubject | '';
  message: string;
  kvkkConsent: boolean;
}

export interface ContactFormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
  kvkkConsent?: string;
  general?: string;
}

export interface ContactFormState {
  data: ContactFormData;
  errors: ContactFormErrors;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
}

// FAQ Types
export type FAQCategory = 'genel' | 'kanal-onerme' | 'teknik' | 'uyelik';

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
  order: number;
}

export interface FAQCategoryData {
  id: FAQCategory;
  name: string;
  icon: string;
  items: FAQItem[];
}

// Contact Info Types
export interface SocialMediaLinks {
  twitter?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  whatsapp?: string;
  telegram?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  socialMedia: SocialMediaLinks;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Contact Info Card Types
export interface ContactInfoCardData {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  actionLabel?: string;
  actionUrl?: string;
}
