import type { Metadata } from 'next';
import { ContactHero } from '@/features/contact/components/contact-hero';
import { ContactForm } from '@/features/contact/components/contact-form';
import { ContactInfoCards } from '@/features/contact/components/contact-info-cards';
import { FAQSection } from '@/features/contact/components/faq-section';

export const metadata: Metadata = {
  title: 'İletişim | Hakikatbu - Bize Ulaşın',
  description: 'Hakikatbu ile iletişime geçin. Sorularınız, önerileriniz ve geri bildirimleriniz için bizimle iletişime geçebilirsiniz.',
  keywords: ['iletişim', 'hakikatbu iletişim', 'destek', 'geri bildirim', 'kanal önerisi'],
  openGraph: {
    title: 'İletişim | Hakikatbu',
    description: 'Hakikatbu ile iletişime geçin. Sorularınız, önerileriniz için bizimle iletişime geçebilirsiniz.',
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'İletişim | Hakikatbu',
    description: 'Hakikatbu ile iletişime geçin.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IletisimPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <ContactHero />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Bizimle İletişime Geçin
            </h2>
            <p className="text-lg text-gray-600">
              Formu doldurun, en kısa sürede size dönüş yapalım
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <ContactInfoCards />
    </div>
  );
}
