'use client';

import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useContactForm } from '../hooks/use-contact-form';
import { subjectOptions } from '../utils/contact-data';
import { cn } from '@/lib/utils';

export function ContactForm() {
  const {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    isError,
    errorMessage,
    updateField,
    validateField,
    submitForm,
    closeModal
  } = useContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6" aria-label="İletişim formu">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-2">
            Ad Soyad <span className="text-red-500" aria-label="zorunlu">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            onBlur={() => validateField('fullName')}
            placeholder="Adınız ve soyadınız"
            aria-required="true"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            className={cn(
              'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200',
              'focus:outline-none focus:ring-4 focus:ring-indigo-600/10',
              errors.fullName
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 focus:border-indigo-600'
            )}
          />
          {errors.fullName && (
            <p id="fullName-error" className="mt-2 text-sm text-red-600 flex items-center gap-1" role="alert">
              <AlertCircle size={14} aria-hidden="true" />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
            E-posta <span className="text-red-500" aria-label="zorunlu">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            onBlur={() => validateField('email')}
            placeholder="ornek@email.com"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={cn(
              'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200',
              'focus:outline-none focus:ring-4 focus:ring-indigo-600/10',
              errors.email
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 focus:border-indigo-600'
            )}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-sm text-red-600 flex items-center gap-1" role="alert">
              <AlertCircle size={14} aria-hidden="true" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
            Konu <span className="text-red-500" aria-label="zorunlu">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={(e) => updateField('subject', e.target.value as any)}
            onBlur={() => validateField('subject')}
            aria-required="true"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            className={cn(
              'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200',
              'focus:outline-none focus:ring-4 focus:ring-indigo-600/10',
              'appearance-none bg-white cursor-pointer',
              errors.subject
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 focus:border-indigo-600'
            )}
          >
            {subjectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p id="subject-error" className="mt-2 text-sm text-red-600 flex items-center gap-1" role="alert">
              <AlertCircle size={14} aria-hidden="true" />
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
            Mesaj <span className="text-red-500" aria-label="zorunlu">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={(e) => updateField('message', e.target.value)}
            onBlur={() => validateField('message')}
            placeholder="Mesajınızı buraya yazın..."
            rows={6}
            maxLength={1000}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : 'message-counter'}
            className={cn(
              'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200',
              'focus:outline-none focus:ring-4 focus:ring-indigo-600/10',
              'resize-none',
              errors.message
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 focus:border-indigo-600'
            )}
          />
          <div className="flex items-center justify-between mt-2">
            {errors.message ? (
              <p id="message-error" className="text-sm text-red-600 flex items-center gap-1" role="alert">
                <AlertCircle size={14} aria-hidden="true" />
                {errors.message}
              </p>
            ) : (
              <p id="message-counter" className="text-sm text-gray-500" aria-live="polite">
                {formData.message.length} / 1000 karakter
              </p>
            )}
          </div>
        </div>

        {/* KVKK Consent */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="kvkkConsent"
              checked={formData.kvkkConsent}
              onChange={(e) => updateField('kvkkConsent', e.target.checked)}
              onBlur={() => validateField('kvkkConsent')}
              aria-required="true"
              aria-invalid={!!errors.kvkkConsent}
              aria-describedby={errors.kvkkConsent ? 'kvkk-error' : undefined}
              className={cn(
                'mt-1 w-5 h-5 rounded border-2 transition-all',
                'focus:outline-none focus:ring-4 focus:ring-indigo-600/10',
                errors.kvkkConsent
                  ? 'border-red-500'
                  : 'border-gray-300 checked:bg-indigo-600 checked:border-indigo-600'
              )}
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">
              <span className="text-red-500" aria-label="zorunlu">*</span> Kişisel verilerimin işlenmesini kabul ediyorum.{' '}
              <a href="/kvkk" className="text-indigo-600 hover:text-indigo-700 font-semibold underline">
                KVKK Aydınlatma Metni
              </a>
            </span>
          </label>
          {errors.kvkkConsent && (
            <p id="kvkk-error" className="mt-2 text-sm text-red-600 flex items-center gap-1 ml-8" role="alert">
              <AlertCircle size={14} aria-hidden="true" />
              {errors.kvkkConsent}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          aria-label={isSubmitting ? 'Mesaj gönderiliyor' : 'Mesajı gönder'}
          className={cn(
            'w-full px-6 py-4 rounded-xl font-bold text-white',
            'bg-gradient-to-r from-indigo-600 to-purple-600',
            'hover:from-indigo-700 hover:to-purple-700',
            'shadow-xl hover:shadow-2xl',
            'transition-all duration-300',
            'flex items-center justify-center gap-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            !isSubmitting && 'hover:scale-105 active:scale-95'
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" aria-hidden="true" />
              <span>Gönderiliyor...</span>
            </>
          ) : (
            <>
              <Send size={20} aria-hidden="true" />
              <span>Mesajı Gönder</span>
            </>
          )}
        </button>
      </form>

      {/* Success Modal */}
      {isSuccess && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in"
          role="dialog"
          aria-labelledby="success-title"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <CheckCircle2 size={32} className="text-green-600" aria-hidden="true" />
              </div>
              <h3 id="success-title" className="text-2xl font-bold text-gray-900">
                Mesajınız Gönderildi!
              </h3>
              <p className="text-gray-600">
                En kısa sürede size dönüş yapacağız.
              </p>
              <button
                onClick={closeModal}
                className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
                autoFocus
              >
                Tamam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {isError && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in"
          role="alertdialog"
          aria-labelledby="error-title"
          aria-describedby="error-message"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
                <AlertCircle size={32} className="text-red-600" aria-hidden="true" />
              </div>
              <h3 id="error-title" className="text-2xl font-bold text-gray-900">
                Bir Hata Oluştu
              </h3>
              <p id="error-message" className="text-gray-600">
                {errorMessage || 'Lütfen tekrar deneyin.'}
              </p>
              <button
                onClick={closeModal}
                className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
                autoFocus
              >
                Tekrar Dene
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
