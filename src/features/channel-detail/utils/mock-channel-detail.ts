import { mockProfiles } from '@/features/profiles/utils/mock-data';
import type { ChannelDetail } from '../types';

export function getChannelDetail(id: string): ChannelDetail | null {
  const channel = mockProfiles.find(p => p.id === id);
  if (!channel) return null;

  // Mock detailed data
  return {
    ...channel,
    longDescription: `${channel.description}\n\nBu kanal, yıllardır kaliteli ve değerli içerikler üreterek izleyicilerine bilgi ve bilinç kazandırmayı hedeflemektedir. İçeriklerde bilimsel doğruluk, ahlaki değerler ve toplumsal fayda her zaman ön plandadır.\n\nHer video titizlikle hazırlanmakta ve kaynaklara dayalı bilgiler sunulmaktadır. Aile değerlerine saygılı, her yaştan izleyicinin güvenle takip edebileceği içerikler üretilmektedir.`,
    foundedDate: channel.created_at,
    contentCategories: getCategories(channel.topic),
    publishFrequency: 'Haftada 2-3 video',
    avgViewsPerVideo: Math.floor(channel.view_count / (channel.video_count || 50)),
    monthlyVideoCount: 8,
    
    aiReview: {
      summary: `${channel.name} kanalı, ${channel.topic} konusunda derinlemesine ve kaliteli içerikler sunan, platformumuzun değerlendirme kriterlerini üst düzeyde karşılayan bir kanaldır. İçeriklerinde bilimsel doğruluk, ahlaki değerlere uygunluk ve eğitici yaklaşım öne çıkmaktadır. Kanal, karmaşık konuları anlaşılır bir dille aktararak, geniş bir kitleye hitap etmeyi başarmaktadır.`,
      strengths: [
        'Bilimsel kaynaklara dayalı, doğrulanabilir içerik üretimi',
        'Ahlaki ve kültürel değerlere saygılı yaklaşım',
        'Karmaşık konuları sade ve anlaşılır dille anlatma becerisi',
        'Her yaş grubuna uygun, aile dostu içerikler',
        'Düzenli yayın sıklığı ve kaliteli prodüksiyon',
        'Toplumsal bilinç oluşturmaya yönelik faydalı içerikler'
      ],
      targetAudience: 'Bu kanal, bilgi seviyesini artırmak isteyen her yaştan izleyiciye hitap etmektedir. Özellikle gençler, öğrenciler ve aile bireyleri ile birlikte izlenebilecek içerikler sunmaktadır. Derin düşünmeyi seven, kaliteli içeriğe değer veren izleyiciler için idealdir.',
      contentQualityScore: channel.status === 'featured' ? 5 : channel.status === 'verified' ? 4.5 : 4,
      generatedAt: new Date().toISOString(),
    },

    features: [
      {
        id: '1',
        title: 'Ahlaki Değerlere Uygunluk',
        description: 'Türk toplumunun ahlaki değerlerine, aile yapısına ve kültürel mirasına tamamen uygun içerikler sunmaktadır.',
        icon: 'shield',
        order: 1,
      },
      {
        id: '2',
        title: 'Eğitici İçerik Kalitesi',
        description: 'Her video, izleyiciye somut bilgi ve beceri kazandırmayı hedefleyerek eğitici değer taşımaktadır.',
        icon: 'book',
        order: 2,
      },
      {
        id: '3',
        title: 'Bilimsel Doğruluk',
        description: 'Tüm bilgiler akademik kaynaklara dayanmakta ve bilimsel metotlarla doğrulanmaktadır.',
        icon: 'target',
        order: 3,
      },
      {
        id: '4',
        title: 'Aile Uygunluğu',
        description: 'Her yaş grubunun ailece güvenle izleyebileceği, aile değerlerine saygılı içerikler.',
        icon: 'home',
        order: 4,
      },
      {
        id: '5',
        title: 'Özgün ve Yaratıcı İçerik',
        description: 'Konuları farklı bakış açılarıyla ele alan, özgün ve yaratıcı içerik üretimi.',
        icon: 'lightbulb',
        order: 5,
      },
      {
        id: '6',
        title: 'Toplumsal Fayda',
        description: 'Topluma pozitif katkı sağlayan, sosyal bilinç oluşturan ve faydalı bilgiler sunan içerikler.',
        icon: 'heart',
        order: 6,
      },
    ],

    featuredVideos: [
      {
        id: '1',
        title: `${channel.topic === 'bilim' ? 'Kuantum Fiziğinin Temelleri' : channel.topic === 'tarih' ? 'Osmanlı İmparatorluğu\'nun Altın Çağı' : channel.topic === 'din-felsefe' ? 'İslam Felsefesinde Bilgi Teorisi' : 'Günümüz Dünya Politikası'}`,
        thumbnailUrl: channel.image_url,
        videoUrl: channel.social_links?.find(l => l.platform === 'youtube')?.url || '#',
        duration: '24:35',
        publishedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        viewCount: 125000,
        likeCount: 8500,
        ourReview: {
          why: 'Bu video, karmaşık bir konuyu son derece anlaşılır bir şekilde açıklıyor ve izleyiciye somut bilgiler sunuyor. Akademik kaynaklara dayalı, bilimsel doğrulukla hazırlanmış içeriği ile öne çıkıyor.',
          topics: ['Temel Kavramlar', 'Tarihsel Gelişim', 'Güncel Uygulamalar', 'Toplumsal Etkileri'],
          targetAudience: 'Lise ve üniversite öğrencileri, konuya ilgi duyan yetişkinler',
          highlights: [
            'Akademik kaynaklara dayalı detaylı açıklamalar',
            'Görsel materyallerle desteklenmiş anlatım',
            'Anlaşılır dil ve mantıklı akış',
            'Pratik örneklerle somutlaştırma'
          ],
        },
      },
      {
        id: '2',
        title: `${channel.topic === 'bilim' ? 'Yapay Zeka ve Geleceğimiz' : channel.topic === 'tarih' ? 'Selçuklu Medeniyetinin İzleri' : channel.topic === 'din-felsefe' ? 'Etik ve Ahlak Felsefesi' : 'Ekonomik Krizler ve Çözüm Yolları'}`,
        thumbnailUrl: channel.image_url,
        videoUrl: channel.social_links?.find(l => l.platform === 'youtube')?.url || '#',
        duration: '18:42',
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        viewCount: 89000,
        likeCount: 6200,
        ourReview: {
          why: 'Güncel ve önemli bir konuyu ele alan bu video, objektif bir bakış açısıyla dengeli bir analiz sunuyor. Ahlaki ve toplumsal boyutları da göz önünde bulundurarak çok yönlü bir değerlendirme yapıyor.',
          topics: ['Teknolojik Gelişmeler', 'Etik Sorunlar', 'Toplumsal Etkiler', 'Gelecek Öngörüleri'],
          targetAudience: 'Teknoloji meraklıları, gençler, karar vericiler',
          highlights: [
            'Güncel araştırmalara dayalı bilgiler',
            'Uzman görüşleriyle zenginleştirilmiş içerik',
            'Etik boyutun detaylı incelemesi',
            'Gelecek için somut öneriler'
          ],
        },
      },
    ],

    similarChannelIds: mockProfiles
      .filter(p => 
        p.id !== channel.id && 
        (p.topic === channel.topic || p.status === channel.status)
      )
      .slice(0, 4)
      .map(p => p.id),
  };
}

function getCategories(topic: string): string[] {
  const categories: Record<string, string[]> = {
    'din-felsefe': ['Felsefe', 'Din Bilimleri', 'Etik', 'Ahlak', 'Düşünce Tarihi'],
    'bilim': ['Fizik', 'Biyoloji', 'Astronomi', 'Teknoloji', 'Matematik'],
    'tarih': ['Osmanlı Tarihi', 'Dünya Tarihi', 'Medeniyet Tarihi', 'Türk Tarihi'],
    'gundem': ['Dünya Politikası', 'Ekonomi', 'Sosyal Konular', 'Analiz', 'Yorum'],
  };
  return categories[topic] || ['Genel'];
}
