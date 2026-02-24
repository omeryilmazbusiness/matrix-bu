# 📬 İLETİŞİM SAYFASI - TASARIM DOKÜMANI

## 🎯 Sayfa Amacı
Kullanıcıların platform ile iletişime geçebilmesi, soru sorabilmesi, öneri sunabilmesi ve destek alabilmesi için profesyonel bir iletişim deneyimi sunmak.

## 🎨 Sayfa Yapısı ve Bileşenler

### 1. HERO SECTION
**Tasarım:** Modern, minimal ve profesyonel
- **Background:** Gradient (indigo → purple) + decorative elements
- **Content:**
  - Ana başlık: "Bizimle İletişime Geçin"
  - Alt başlık: "Sorularınız, önerileriniz veya geri bildirimleriniz için buradayız"
  - Kısa açıklama metni
  - İletişim ikonları (email, telefon, konum)
- **Height:** 400-450px
- **Responsive:** Mobile'da 300px

### 2. CONTACT INFO CARDS (Hızlı İletişim)
**Layout:** 3 kolon grid (Desktop) → 1 kolon (Mobile)
**Her kart:**
- **Email Kartı:**
  - İkon: Mail
  - Başlık: "E-posta Gönderin"
  - Email: info@hakikatbu.com
  - Açıklama: "7/24 size dönüş yapıyoruz"
  - Hover: Scale + shadow effect
  
- **Sosyal Medya Kartı:**
  - İkon: Share2
  - Başlık: "Bizi Takip Edin"
  - Platform linkleri (Twitter, Instagram, YouTube)
  - Açıklama: "Güncel içeriklerimizden haberdar olun"
  
- **Konum Kartı:**
  - İkon: MapPin
  - Başlık: "Adres"
  - Adres bilgisi
  - Açıklama: "Ofisimize ziyaret edebilirsiniz"

### 3. CONTACT FORM SECTION
**Layout:** 2 kolon (60/40 split)

#### Sol Kolon - Form
**Form Alanları:**
1. **Ad Soyad** (required)
   - Input field
   - Placeholder: "Adınız ve soyadınız"
   - Validation: Min 3 karakter

2. **Email** (required)
   - Input field (type: email)
   - Placeholder: "ornek@email.com"
   - Validation: Email formatı

3. **Konu** (required)
   - Select dropdown
   - Options:
     - Genel Bilgi
     - Kanal Önerisi
     - Teknik Destek
     - İş Birliği
     - Diğer
   - Default: "Konu seçiniz..."

4. **Mesaj** (required)
   - Textarea
   - Placeholder: "Mesajınızı buraya yazın..."
   - Rows: 6
   - Validation: Min 10 karakter

5. **KVKK Onayı** (required)
   - Checkbox
   - Label: "Kişisel verilerimin işlenmesini kabul ediyorum"
   - Link: KVKK Aydınlatma Metni

**Submit Button:**
- Text: "Mesajı Gönder"
- Icon: Send
- States: default, loading, success, error
- Full width on mobile

**Form Validation:**
- Real-time validation
- Error messages (kırmızı)
- Success state (yeşil)

#### Sağ Kolon - Info Panel
**Sticky card (Desktop)**
- **Başlık:** "Neden Bize Yazmalısınız?"
- **Benefits listesi:**
  - ✓ Hızlı ve güvenilir yanıt
  - ✓ Uzman ekip desteği
  - ✓ Gizlilik ve güvenlik
  - ✓ 7/24 destek

- **İstatistikler:**
  - 📊 "1000+ Mutlu Kullanıcı"
  - ⚡ "24 saat içinde yanıt"
  - ⭐ "4.8/5 Memnuniyet"

- **FAQ Link:**
  - "Sıkça Sorulan Sorular" butonu

### 4. FAQ SECTION (Sıkça Sorulan Sorular)
**Layout:** Accordion stil
**Kategoriler:**
- Genel Sorular (4-5 soru)
- Kanal Önerme (3-4 soru)
- Teknik Destek (3-4 soru)
- Üyelik ve Hesap (3-4 soru)

**Her FAQ Item:**
- Soru (bold, büyük)
- Cevap (accordion expand/collapse)
- Smooth animation
- Icon: ChevronDown (rotate on expand)

### 5. MAP SECTION (Harita - Optional)
**Eğer fiziksel ofis varsa:**
- Google Maps embed
- Adres göstergesi
- "Yol Tarifi Al" butonu
- Height: 400px

### 6. ALTERNATIVE CONTACT METHODS
**Layout:** Full-width band
**Background:** Light gradient
**Content:**
- "Başka Şekilde de Ulaşabilirsiniz"
- Alternative channels:
  - WhatsApp Business
  - Telegram Channel
  - LinkedIn
- Her biri icon + link button

### 7. SUCCESS/ERROR MODALS
**Success Modal:**
- ✓ İkon (yeşil, animasyonlu)
- Başlık: "Mesajınız Gönderildi!"
- Alt başlık: "En kısa sürede size dönüş yapacağız"
- "Tamam" butonu

**Error Modal:**
- ✗ İkon (kırmızı)
- Başlık: "Bir Hata Oluştu"
- Alt başlık: Error message
- "Tekrar Dene" butonu

## 🎨 Tasarım Detayları

### Color Scheme
- Primary: Indigo (600-700)
- Secondary: Purple (600-700)
- Success: Green (500-600)
- Error: Red (500-600)
- Info: Blue (500-600)
- Neutral: Gray (50-900)

### Typography
- Page Title: 3xl-4xl, font-black
- Section Titles: 2xl-3xl, font-bold
- Form Labels: sm, font-semibold
- Body: base, font-normal
- Helper Text: xs-sm, font-medium

### Spacing
- Section gaps: py-20 sm:py-28
- Form gaps: gap-6
- Input padding: p-3 sm:p-4
- Button padding: px-6 py-3

### Form Design
- **Input Style:**
  - Border: 2px solid gray-200
  - Focus: border-indigo-600 + ring
  - Error: border-red-500
  - Success: border-green-500
  - Rounded: rounded-xl
  - Background: white

- **Button Style:**
  - Gradient: indigo → purple
  - Shadow: xl
  - Hover: scale-105 + shadow-2xl
  - Active: scale-95
  - Disabled: opacity-50 + cursor-not-allowed

### Animations
- Form inputs: focus ring animation
- Submit button: loading spinner
- Success: confetti or checkmark animation
- FAQ accordion: smooth slide down/up
- Cards: hover scale + shadow
- Page sections: staggered fade-in

## 🏗️ Component Yapısı

```
src/features/contact/
├── components/
│   ├── contact-hero.tsx           # Hero section
│   ├── contact-info-cards.tsx     # Email, social, location cards
│   ├── contact-form.tsx           # Main contact form
│   ├── contact-info-panel.tsx     # Right side info panel
│   ├── faq-section.tsx            # FAQ accordion
│   ├── faq-item.tsx               # Single FAQ item
│   ├── map-section.tsx            # Google Maps embed (optional)
│   ├── alternative-contacts.tsx   # WhatsApp, Telegram etc.
│   └── success-modal.tsx          # Success/Error modal
├── hooks/
│   ├── use-contact-form.ts        # Form state + validation
│   └── use-submit-contact.ts      # Form submission logic
├── types/
│   └── index.ts                   # TypeScript types
└── utils/
    ├── validation.ts              # Form validation rules
    └── faq-data.ts                # FAQ content

src/app/iletisim/
└── page.tsx                       # Contact page route
```

## 📊 Data Structure

### Contact Form Type
```typescript
interface ContactFormData {
  fullName: string;
  email: string;
  subject: 'genel' | 'kanal-onerisi' | 'teknik-destek' | 'is-birligi' | 'diger';
  message: string;
  kvkkConsent: boolean;
}

interface ContactFormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
  kvkkConsent?: string;
}

interface ContactFormState {
  data: ContactFormData;
  errors: ContactFormErrors;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
}
```

### FAQ Type
```typescript
interface FAQItem {
  id: string;
  category: 'genel' | 'kanal-onerme' | 'teknik' | 'uyelik';
  question: string;
  answer: string;
  order: number;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: string;
  items: FAQItem[];
}
```

### Contact Info Type
```typescript
interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  socialMedia: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    whatsapp?: string;
    telegram?: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
}
```

## 🎯 Form Validation Rules

```typescript
const validationRules = {
  fullName: {
    required: "Ad soyad zorunludur",
    minLength: { value: 3, message: "En az 3 karakter olmalıdır" },
    pattern: { 
      value: /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 
      message: "Sadece harf içermelidir" 
    }
  },
  email: {
    required: "Email zorunludur",
    pattern: { 
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Geçerli bir email adresi giriniz"
    }
  },
  subject: {
    required: "Konu seçimi zorunludur"
  },
  message: {
    required: "Mesaj zorunludur",
    minLength: { value: 10, message: "En az 10 karakter olmalıdır" },
    maxLength: { value: 1000, message: "En fazla 1000 karakter olabilir" }
  },
  kvkkConsent: {
    required: "KVKK onayı zorunludur"
  }
}
```

## 🚀 Form Submission Flow

```
1. User fills form
   ↓
2. Real-time validation (onChange)
   ↓
3. Submit button clicked
   ↓
4. Final validation (onSubmit)
   ↓
5. Show loading state
   ↓
6. API call (/api/contact/submit)
   ↓
7a. Success → Show success modal → Clear form
7b. Error → Show error message → Keep form data
   ↓
8. User can retry or close
```

## 📱 Responsive Behavior

### Mobile (< 640px)
- Hero: 300px height
- Contact cards: 1 kolon, stacked
- Form: Full width, single kolon
- Info panel: Below form
- FAQ: Full width accordion
- Buttons: Full width

### Tablet (640px - 1024px)
- Hero: 350px height
- Contact cards: 2 kolon
- Form: Full width, single kolon
- Info panel: Below form

### Desktop (> 1024px)
- Hero: 450px height
- Contact cards: 3 kolon
- Form: 2 kolon (60/40 split)
- Info panel: Sticky right side
- FAQ: 2 kolon layout

## 🔒 Security & Privacy

- **KVKK Compliance:**
  - Açık onay (checkbox)
  - Aydınlatma metni linki
  - Veri saklama süresi bilgisi

- **Rate Limiting:**
  - Max 3 submission / saat
  - IP based tracking
  - Spam prevention

- **Data Sanitization:**
  - XSS prevention
  - SQL injection protection
  - Email validation
  - Content filtering

## ✨ UX Enhancements

- **Auto-save Draft:**
  - LocalStorage ile form data sakla
  - Sayfa yenilendiğinde geri yükle
  - "Taslak kaydedildi" mesajı

- **Smart Suggestions:**
  - Sık sorulan konular için quick reply
  - Email domain önerileri
  - FAQ ile ilişkilendir

- **Accessibility:**
  - ARIA labels
  - Keyboard navigation
  - Screen reader support
  - Focus indicators
  - Error announcements

- **Performance:**
  - Form debouncing (validation)
  - Lazy load map
  - Optimistic UI updates
  - Progressive enhancement

## 📊 Analytics Events

```typescript
// Track these events
analytics.track('contact_form_viewed');
analytics.track('contact_form_started', { field: 'fullName' });
analytics.track('contact_form_submitted', { subject: 'genel' });
analytics.track('contact_form_success');
analytics.track('contact_form_error', { error: 'validation' });
analytics.track('faq_item_clicked', { question_id: '123' });
```

## 🎨 Visual Hierarchy

**Priority Levels:**
1. **Primary:** Contact Form (Main CTA)
2. **Secondary:** Contact Info Cards
3. **Tertiary:** FAQ Section
4. **Supporting:** Alternative Contacts, Map

**Call-to-Actions:**
1. "Mesajı Gönder" (Primary CTA)
2. "WhatsApp'tan Yaz" (Secondary CTA)
3. "SSS'ye Göz At" (Tertiary CTA)

## 🌟 Delight Features (Phase 2)

- [ ] Live chat widget
- [ ] Estimated response time
- [ ] Attachment upload (images, files)
- [ ] Voice message option
- [ ] Video call scheduling
- [ ] AI chatbot (quick answers)
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Custom themes
- [ ] Ticket system integration

---

## 📋 Implementation Checklist

### Phase 1 (MVP):
- [ ] Hero section
- [ ] Contact info cards
- [ ] Contact form (all fields)
- [ ] Form validation
- [ ] Success/Error handling
- [ ] FAQ section (basic)
- [ ] Mobile responsive

### Phase 2 (Enhancement):
- [ ] Auto-save draft
- [ ] Map integration
- [ ] Alternative contacts
- [ ] Advanced FAQ (search, categories)
- [ ] Analytics integration
- [ ] Rate limiting
- [ ] Email notifications

### Phase 3 (Advanced):
- [ ] Live chat
- [ ] AI suggestions
- [ ] Attachment support
- [ ] Ticket system
- [ ] Multi-language

