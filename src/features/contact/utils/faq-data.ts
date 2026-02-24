import type { FAQCategoryData, FAQItem } from '../types';

// Genel Sorular
const generalFAQs: FAQItem[] = [
  {
    id: 'g1',
    category: 'genel',
    question: 'Hakikatbu nedir ve ne işe yarar?',
    answer: 'Hakikatbu, internetteki kaliteli ve güvenilir içerik üreticilerini bir araya getiren bir platformdur. Kullanıcılarımız, platformumuz aracılığıyla doğru bilgiye ulaşabilir, topluma faydalı içerikler keşfedebilir ve güvenilir kaynakları takip edebilirler.',
    order: 1
  },
  {
    id: 'g2',
    category: 'genel',
    question: 'Platform tamamen ücretsiz mi?',
    answer: 'Evet, platformumuz tamamen ücretsizdir. Tüm içeriklerimize ve özelliklere ücretsiz olarak erişebilirsiniz. Amacımız, kaliteli içeriği herkese ulaştırmaktır.',
    order: 2
  },
  {
    id: 'g3',
    category: 'genel',
    question: 'Hangi kriterlere göre kanallar değerlendiriliyor?',
    answer: 'Kanalları 6 ana kritere göre değerlendiriyoruz: Ahlaki Değerlere Uygunluk, Eğitici İçerik Kalitesi, Bilimsel Doğruluk, Aile Uygunluğu, Özgün İçerik ve Toplumsal Fayda. Her kanal, uzman ekibimiz ve yapay zeka destekli sistemimiz tarafından detaylı olarak analiz edilir.',
    order: 3
  },
  {
    id: 'g4',
    category: 'genel',
    question: 'Yapay zeka değerlendirmesi nasıl çalışıyor?',
    answer: 'Yapay zeka sistemimiz, kanalların içeriklerini analiz eder, tonunu değerlendirir, hedef kitleyi belirler ve güçlü yönlerini tespit eder. Bu değerlendirmeler, uzman ekibimizin incelemesiyle birleştirilir ve objektif bir sonuç ortaya çıkar.',
    order: 4
  },
  {
    id: 'g5',
    category: 'genel',
    question: 'Ne sıklıkla yeni kanallar ekleniyor?',
    answer: 'Sürekli olarak yeni kanalları değerlendiriyor ve uygun bulduklarımızı platformumuza ekliyoruz. Genellikle haftada 3-5 yeni kanal eklenir. Kullanıcı önerilerini de dikkate alıyoruz.',
    order: 5
  }
];

// Kanal Önerme
const channelSuggestionFAQs: FAQItem[] = [
  {
    id: 'k1',
    category: 'kanal-onerme',
    question: 'Nasıl kanal önerebilirim?',
    answer: 'Kanal önerisinde bulunmak için ana sayfadaki "Kanal Öner" butonuna tıklayabilir veya iletişim formunu kullanabilirsiniz. Kanal adı, URL ve kısa bir açıklama eklemeniz yeterlidir.',
    order: 1
  },
  {
    id: 'k2',
    category: 'kanal-onerme',
    question: 'Önerdiğim kanal ne zaman eklenecek?',
    answer: 'Önerilen kanallar, uzman ekibimiz tarafından 5-7 iş günü içinde değerlendirilir. Uygun bulunan kanallar sisteme eklenir ve sizi bilgilendiririz.',
    order: 2
  },
  {
    id: 'k3',
    category: 'kanal-onerme',
    question: 'Kendi kanalımı önerebilir miyim?',
    answer: 'Evet, kendi kanalınızı da önerebilirsiniz. Değerlendirme sürecimiz tüm kanallar için aynıdır. Kriterlerimize uygunluk kontrol edilir ve objektif bir karar verilir.',
    order: 3
  },
  {
    id: 'k4',
    category: 'kanal-onerme',
    question: 'Hangi platformlardan kanal önerebilirim?',
    answer: 'Şu anda YouTube, Twitter, Instagram ve TikTok platformlarından kanal önerileri kabul ediyoruz. Gelecekte daha fazla platform desteği eklenecektir.',
    order: 4
  }
];

// Teknik Destek
const technicalFAQs: FAQItem[] = [
  {
    id: 't1',
    category: 'teknik',
    question: 'Siteye erişim sorunu yaşıyorum, ne yapmalıyım?',
    answer: 'Öncelikle tarayıcınızı yenilemeyi ve önbelleği temizlemeyi deneyin. Sorun devam ederse, farklı bir tarayıcı kullanmayı deneyebilirsiniz. Hala çözülmezse, teknik destek ekibimizle iletişime geçin.',
    order: 1
  },
  {
    id: 't2',
    category: 'teknik',
    question: 'Mobil uygulamanız var mı?',
    answer: 'Şu anda mobil uygulamamız bulunmuyor, ancak web sitemiz tamamen mobil uyumludur. Telefonunuzun tarayıcısından rahatlıkla kullanabilirsiniz. Mobil uygulama geliştirme çalışmalarımız devam ediyor.',
    order: 2
  },
  {
    id: 't3',
    category: 'teknik',
    question: 'Videolar açılmıyor, ne yapmalıyım?',
    answer: 'Videolar doğrudan kaynak platformlardan (YouTube, vb.) oynatılır. Sorun varsa, önce kaynak platformda videonun erişilebilir olduğunu kontrol edin. Ayrıca tarayıcı eklentilerinizin (reklam engelleyici vb.) videoları engellemediğinden emin olun.',
    order: 3
  },
  {
    id: 't4',
    category: 'teknik',
    question: 'Siteyi karanlık modda kullanabilir miyim?',
    answer: 'Karanlık mod özelliği şu anda geliştirme aşamasındadır. Yakında kullanıma sunulacaktır. Güncellemelerden haberdar olmak için sosyal medya hesaplarımızı takip edebilirsiniz.',
    order: 4
  }
];

// Üyelik ve Hesap
const accountFAQs: FAQItem[] = [
  {
    id: 'u1',
    category: 'uyelik',
    question: 'Üyelik gerekli mi?',
    answer: 'Hayır, platformumuzda içerikleri görüntülemek için üyelik gerekmez. Ancak ileride kanal favorileyebilme, yorum yapabilme gibi özellikler için üyelik sistemi eklenecektir.',
    order: 1
  },
  {
    id: 'u2',
    category: 'uyelik',
    question: 'Kişisel verilerim güvende mi?',
    answer: 'Evet, tüm kişisel verileriniz KVKK ve GDPR uyarınca güvenli şekilde saklanır. Verileriniz üçüncü şahıslarla paylaşılmaz. Gizlilik politikamızı inceleyebilirsiniz.',
    order: 2
  },
  {
    id: 'u3',
    category: 'uyelik',
    question: 'Bülten aboneliğimi nasıl iptal edebilirim?',
    answer: 'Bülten e-postalarının altındaki "Abonelikten Çık" linkine tıklayarak aboneliğinizi iptal edebilirsiniz. Alternatif olarak iletişim formundan da talepte bulunabilirsiniz.',
    order: 3
  }
];

// Tüm FAQ kategorilerini birleştir
export const faqCategories: FAQCategoryData[] = [
  {
    id: 'genel',
    name: 'Genel Sorular',
    icon: 'HelpCircle',
    items: generalFAQs
  },
  {
    id: 'kanal-onerme',
    name: 'Kanal Önerme',
    icon: 'PlusCircle',
    items: channelSuggestionFAQs
  },
  {
    id: 'teknik',
    name: 'Teknik Destek',
    icon: 'Settings',
    items: technicalFAQs
  },
  {
    id: 'uyelik',
    name: 'Üyelik ve Hesap',
    icon: 'User',
    items: accountFAQs
  }
];

// Tüm FAQ'ları düz liste olarak
export const allFAQs: FAQItem[] = [
  ...generalFAQs,
  ...channelSuggestionFAQs,
  ...technicalFAQs,
  ...accountFAQs
];
