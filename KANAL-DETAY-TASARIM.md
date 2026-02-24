# 📺 KANAL DETAY SAYFASI - TASARIM DOKÜMANI

## 🎯 Sayfa Amacı
Kanal hakkında detaylı bilgi, AI değerlendirmesi, öne çıkan özellikler ve içerik örnekleri sunmak.

## 🎨 Sayfa Yapısı ve Bileşenler

### 1. HERO SECTION (Full-Width Görsel Banner)
**Tasarım:** Ana sayfadaki Weekly Person Card stilinde
- **Background:** Kanal görseli (full-width, gradient overlay)
- **Overlay:** Siyah gradient (from-black/90 via-black/60 to-transparent)
- **Content:**
  - Status badge (top-left)
  - Topic badge (top-left, altında)
  - Kanal adı (büyük, bold, beyaz)
  - Kanal başlığı/sloganı (alt başlık)
  - İstatistikler (görüntülenme, abone, video sayısı)
  - Sosyal medya butonları
  - "Kanalı Ziyaret Et" CTA button
- **Height:** 500-600px
- **Responsive:** Mobile'da 400px

### 2. ABOUT SECTION (Hakkında)
**Layout:** Container içinde, 2 kolon (Desktop)
- **Sol Kolon (60%):**
  - Bölüm başlığı: "Kanal Hakkında"
  - Detaylı açıklama (3-4 paragraf)
  - Kuruluş tarihi
  - İçerik kategorileri (chips)
  - Yayın sıklığı
  
- **Sağ Kolon (40%):**
  - Hızlı İstatistikler Kartı:
    - Toplam İzlenme
    - Toplam Abone
    - Video Sayısı
    - Ortalama Görüntülenme
    - Aylık Yeni Video
  - "Kanalı Öner" butonu

### 3. AI DEĞERLENDIRMESI SECTION
**Tasarım:** Premium card with gradient border
- **Başlık:** "🤖 AI Değerlendirmesi"
- **Alt başlık:** "Platformumuzun yapay zeka asistanı tarafından değerlendirildi"
- **İçerik:**
  - Genel değerlendirme metni (2-3 paragraf)
  - Güçlü yönler (checkmark list)
  - Hedef kitle tanımı
  - İçerik kalitesi puanı (5/5 stars)
- **Görsel:** 
  - Sol tarafta AI avatar/icon
  - Gradient background (indigo → purple)
  - Glass morphism efekt

### 4. ÖZELLIKLER SECTION (İyi Özellikleri)
**Başlık:** "✨ Neden Bu Kanalı Öneriyoruz?"
**Layout:** Grid (3 kolon → 2 → 1)
**Her Özellik Kartı:**
- İkon (büyük, renkli)
- Özellik başlığı
- Açıklama
- Kriterlerimize göre sıralanmış:
  1. 🛡️ Ahlaki Değerlere Uygunluk
  2. 📚 Eğitici İçerik Kalitesi
  3. 🎯 Bilimsel Doğruluk
  4. 👨‍👩‍👧‍👦 Aile Uygunluğu
  5. 💡 Özgün ve Yaratıcı İçerik
  6. 🌟 Toplumsal Fayda

### 5. İÇERİK ÖRNEKLERİ SECTION
**Başlık:** "🎬 Öne Çıkan İçerikler"
**Alt başlık:** "Bu kanaldan izlemenizi önerdiğimiz videolar"
**Layout:** Grid (2 kolon → 1)
**Her İçerik Kartı:**
- Video thumbnail (16:9 aspect ratio)
- Video başlığı
- Video linki
- **Bizim Yorumumuz:**
  - Neden öneriyoruz
  - Hangi konuları kapsıyor
  - Hedef kitle
  - Öne çıkan noktalar
- İzlenme/beğeni sayıları
- Süre
- Yayın tarihi
- "İzle" butonu

### 6. BENZER KANALLAR SECTION
**Başlık:** "📺 Benzer Kanallar"
**Alt başlık:** "Bu kanala ilgi duyuyorsanız bunları da beğenebilirsiniz"
**Layout:** Horizontal slider (4 kart göster)
- ProfileCard component kullan (mevcut)
- Aynı topic'ten kanallar
- Aynı status'ten kanallar

### 7. CTA SECTION (Son Harekete Geçirme)
**Background:** Gradient (indigo → purple)
**Content:**
- "Kaliteli İçerik Üretiyorsunuz?"
- "Kanalınızı bize önerin"
- CTA button: "Kanal Öner"

## 🎨 Tasarım Detayları

### Color Scheme
- Primary: Indigo (600-700)
- Secondary: Purple (600-700)
- Accent: Pink (500-600)
- Success: Green (500-600) - AI approval
- Neutral: Gray (50-900)

### Typography
- Hero Title: 3xl-5xl, font-black
- Section Titles: 2xl-3xl, font-bold
- Body: base-lg, font-normal
- Captions: sm-xs, font-medium

### Spacing
- Section gaps: py-20 sm:py-28
- Component gaps: gap-8 sm:gap-12
- Content padding: p-6 sm:p-8

### Animations
- Hero: fade-in + slide-in-from-bottom
- Sections: staggered fade-in (100ms delay)
- Cards: hover scale + shadow
- Stats: count-up animation
- AI Section: typing effect (optional)

## 🏗️ Component Yapısı

```
src/features/channel-detail/
├── components/
│   ├── channel-hero.tsx           # Hero section
│   ├── channel-about.tsx          # Hakkında bölümü
│   ├── channel-stats-card.tsx     # İstatistik kartı
│   ├── ai-review-section.tsx      # AI değerlendirmesi
│   ├── channel-features.tsx       # Özellikler grid
│   ├── feature-card.tsx           # Tek özellik kartı
│   ├── content-examples.tsx       # İçerik örnekleri
│   ├── video-card.tsx             # Video kartı + yorumumuz
│   ├── similar-channels.tsx       # Benzer kanallar slider
│   └── channel-cta.tsx            # Son CTA
├── types/
│   └── index.ts                   # TypeScript types
└── utils/
    ├── generate-ai-review.ts      # AI review generator
    └── get-similar-channels.ts    # Benzer kanal bulma

src/app/kanallar/[id]/
└── page.tsx                       # Dynamic route page
```

## 📊 Data Structure

### Channel Detail Type
```typescript
interface ChannelDetail extends Channel {
  // Basic Info (extends Channel)
  
  // Extended Info
  longDescription: string;
  foundedDate: string;
  contentCategories: string[];
  publishFrequency: string;
  avgViewsPerVideo: number;
  monthlyVideoCount: number;
  
  // AI Review
  aiReview: {
    summary: string;
    strengths: string[];
    targetAudience: string;
    contentQualityScore: number; // 1-5
    generatedAt: string;
  };
  
  // Features (Why we recommend)
  features: {
    id: string;
    title: string;
    description: string;
    icon: string;
    order: number;
  }[];
  
  // Featured Videos
  featuredVideos: {
    id: string;
    title: string;
    thumbnailUrl: string;
    videoUrl: string;
    duration: string;
    publishedAt: string;
    viewCount: number;
    likeCount: number;
    ourReview: {
      why: string;          // Neden öneriyoruz
      topics: string[];     // Hangi konuları kapsıyor
      targetAudience: string; // Hedef kitle
      highlights: string[]; // Öne çıkan noktalar
    };
  }[];
  
  // Similar Channels
  similarChannels: Channel[];
}
```

## 🎯 SOLID Principles

### Single Responsibility
- Her component tek bir işe odaklanır
- `channel-hero.tsx` sadece hero section
- `ai-review-section.tsx` sadece AI değerlendirmesi
- `video-card.tsx` sadece video kartı

### Open/Closed
- Feature kartları generic `FeatureCard` component ile
- Video kartları generic `VideoCard` component ile
- Props ile özelleştirilebilir, kod değişikliği gerektirmez

### Liskov Substitution
- Channel type'ı extend edilebilir
- Base Channel component'i her yerde kullanılabilir

### Interface Segregation
- Her component sadece ihtiyacı olan props'ları alır
- Optional props ile esneklik

### Dependency Inversion
- Utils klasöründe yardımcı fonksiyonlar
- Component'ler direkt data'ya bağımlı değil
- Props aracılığıyla data injection

## 📱 Responsive Behavior

### Mobile (< 640px)
- Hero: 400px height
- About: 1 kolon
- Features: 1 kolon
- Videos: 1 kolon
- Stats: stacked layout

### Tablet (640px - 1024px)
- Hero: 500px height
- About: 1 kolon
- Features: 2 kolon
- Videos: 1 kolon

### Desktop (> 1024px)
- Hero: 600px height
- About: 2 kolon (60/40)
- Features: 3 kolon
- Videos: 2 kolon

## 🚀 SEO ve Meta Tags

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const channel = await getChannelById(params.id);
  
  return {
    title: `${channel.name} - Hakikatbu`,
    description: channel.description,
    openGraph: {
      title: channel.name,
      description: channel.description,
      images: [channel.image_url],
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: channel.name,
      description: channel.description,
      images: [channel.image_url],
    },
  };
}
```

## ✨ Ekstra Özellikler (Phase 2)

- [ ] Video embed önizleme
- [ ] Yorum sistemi
- [ ] Kanal karşılaştırma
- [ ] Takip et butonu (favorite)
- [ ] Paylaş butonları
- [ ] QR kod (mobil paylaşım için)
- [ ] İstatistik grafikleri
- [ ] Son videolar timeline
- [ ] Kanal transkript/altyazı arama
