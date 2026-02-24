'use client';

import { useState, useCallback } from 'react';
import type { ContactFormData, ContactFormErrors, ContactFormState } from '../types';
import { validateForm, hasErrors } from '../utils/validation';
import {
  validateFullName,
  validateEmail,
  validateSubject,
  validateMessage,
  validateKVKK
} from '../utils/validation';

const initialFormData: ContactFormData = {
  fullName: '',
  email: '',
  subject: '',
  message: '',
  kvkkConsent: false
};

export function useContactForm() {
  const [formState, setFormState] = useState<ContactFormState>({
    data: initialFormData,
    errors: {},
    isSubmitting: false,
    isSuccess: false,
    isError: false
  });

  // Tek bir alanı güncelle
  const updateField = useCallback(
    <K extends keyof ContactFormData>(field: K, value: ContactFormData[K]) => {
      setFormState((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          [field]: value
        },
        errors: {
          ...prev.errors,
          [field]: undefined // Clear error for this field
        }
      }));
    },
    []
  );

  // Tek bir alanı validate et (onChange için)
  const validateField = useCallback(
    (field: keyof ContactFormData) => {
      const value = formState.data[field];
      let error: string | undefined;

      switch (field) {
        case 'fullName':
          error = validateFullName(value as string);
          break;
        case 'email':
          error = validateEmail(value as string);
          break;
        case 'subject':
          error = validateSubject(value as string);
          break;
        case 'message':
          error = validateMessage(value as string);
          break;
        case 'kvkkConsent':
          error = validateKVKK(value as boolean);
          break;
      }

      if (error) {
        setFormState((prev) => ({
          ...prev,
          errors: {
            ...prev.errors,
            [field]: error
          }
        }));
      }
    },
    [formState.data]
  );

  // Formu submit et
  const submitForm = useCallback(async () => {
    // Validate all fields
    const errors = validateForm(formState.data);

    if (hasErrors(errors)) {
      setFormState((prev) => ({
        ...prev,
        errors
      }));
      return false;
    }

    // Start submitting
    setFormState((prev) => ({
      ...prev,
      isSubmitting: true,
      isError: false,
      errorMessage: undefined
    }));

    try {
      // API'ye gönder
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState.data),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu');
      }

      // Success - Form resetle
      setFormState({
        data: initialFormData,
        errors: {},
        isSubmitting: false,
        isSuccess: true,
        isError: false
      });

      return true;
    } catch (error) {
      // Error
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        isError: true,
        errorMessage: error instanceof Error ? error.message : 'Bir hata oluştu. Lütfen tekrar deneyin.'
      }));

      return false;
    }
  }, [formState.data]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormState({
      data: initialFormData,
      errors: {},
      isSubmitting: false,
      isSuccess: false,
      isError: false
    });
  }, []);

  // Close success/error modal
  const closeModal = useCallback(() => {
    setFormState((prev) => ({
      ...prev,
      isSuccess: false,
      isError: false,
      errorMessage: undefined
    }));
  }, []);

  return {
    formData: formState.data,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    isSuccess: formState.isSuccess,
    isError: formState.isError,
    errorMessage: formState.errorMessage,
    updateField,
    validateField,
    submitForm,
    resetForm,
    closeModal
  };
}
