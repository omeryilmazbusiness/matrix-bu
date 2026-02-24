import type { ContactFormData, ContactFormErrors } from '../types';

export const validateFullName = (value: string): string | undefined => {
  if (!value.trim()) {
    return 'Ad soyad zorunludur';
  }
  if (value.trim().length < 3) {
    return 'En az 3 karakter olmalıdır';
  }
  if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(value)) {
    return 'Sadece harf içermelidir';
  }
  return undefined;
};

export const validateEmail = (value: string): string | undefined => {
  if (!value.trim()) {
    return 'Email zorunludur';
  }
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(value)) {
    return 'Geçerli bir email adresi giriniz';
  }
  return undefined;
};

export const validateSubject = (value: string): string | undefined => {
  if (!value) {
    return 'Konu seçimi zorunludur';
  }
  return undefined;
};

export const validateMessage = (value: string): string | undefined => {
  if (!value.trim()) {
    return 'Mesaj zorunludur';
  }
  if (value.trim().length < 10) {
    return 'En az 10 karakter olmalıdır';
  }
  if (value.trim().length > 1000) {
    return 'En fazla 1000 karakter olabilir';
  }
  return undefined;
};

export const validateKVKK = (value: boolean): string | undefined => {
  if (!value) {
    return 'KVKK onayı zorunludur';
  }
  return undefined;
};

export const validateForm = (data: ContactFormData): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  const fullNameError = validateFullName(data.fullName);
  if (fullNameError) errors.fullName = fullNameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const subjectError = validateSubject(data.subject);
  if (subjectError) errors.subject = subjectError;

  const messageError = validateMessage(data.message);
  if (messageError) errors.message = messageError;

  const kvkkError = validateKVKK(data.kvkkConsent);
  if (kvkkError) errors.kvkkConsent = kvkkError;

  return errors;
};

export const hasErrors = (errors: ContactFormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
