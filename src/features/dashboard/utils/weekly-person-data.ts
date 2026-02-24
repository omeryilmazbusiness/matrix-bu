import type { WeeklyPerson } from '../types';

export const weeklyPersonData: WeeklyPerson[] = [
  {
    id: 1,
    name: 'İbn Haldun',
    title: 'Sosyolog ve Tarihçi',
    description: 'Modern sosyolojinin kurucusu, Mukaddime eseriyle toplum bilimlerine yeni bir soluk getirdi.',
    image: '/image copy.png',
    period: '1332-1406',
    likes: 3456,
    views: 15234,
    
    fullBiography: `İbn Haldun, 1332 yılında Tunus'ta doğdu ve 1406 yılında Kahire'de vefat etti. Ortaçağ İslam dünyasının en büyük düşünürlerinden biri olarak kabul edilir. Mukaddime adlı eseriyle modern sosyolojinin temellerini attı ve toplumsal olayları bilimsel bir yöntemle inceledi. Hayatı boyunca çeşitli İslam devletlerinde kadılık, vezirlik ve danışmanlık görevlerinde bulundu.`,
    
    birthPlace: 'Tunus',
    deathPlace: 'Kahire, Mısır',
    
    majorWorks: [
      'Mukaddime (Kitab-ı İber\'in Girişi)',
      'Kitab-ı İber (Dünya Tarihi)',
      'et-Ta\'rif bi-İbn Haldun (Otobiyografi)',
      'Şifa\'ü\'s-Sail (Tasavvuf Risalesi)'
    ],
    
    achievements: [
      'Modern sosyolojinin kurucusu olarak kabul edilir',
      'Toplumsal değişim teorisi geliştirdi (Asabiyet kavramı)',
      'Tarih metodolojisine bilimsel yaklaşım getirdi',
      'İktisat ve demografi alanında öncü çalışmalar yaptı',
      'Medeniyet döngüleri teorisini ortaya koydu'
    ],
    
    quote: 'Tarih zahiren haber ve olayların nakli, batınen ise tefekkür ve tahkik, sebep ve sonuçların derin bilgisidir.',
    quoteAuthor: 'İbn Haldun - Mukaddime',
    
    historicalContext: `14. yüzyıl İslam dünyası, siyasi çalkantılar ve hanedanlar arası mücadelelerle doluydu. İbn Haldun, bu dönemde yaşadığı tecrübelerden yola çıkarak toplumsal dinamikleri analiz etti. Endülüs'ün çöküş sürecine tanık oldu ve bu gözlemleri Mukaddime'de toplum teorisine dönüştürdü.`,
    
    legacy: `İbn Haldun'un fikirleri, Avrupa'da Rönesans döneminden itibaren tanınmaya başladı ve modern sosyoloji, tarih felsefesi, ekonomi ve siyaset bilimi üzerinde derin etkiler bıraktı. Arnold Toynbee, Ernest Gellner gibi düşünürler onun eserlerinden etkilenmiştir.`,
    
    relatedVideos: [
      {
        id: '1',
        title: 'İbn Haldun: Mukaddime\'nin Sırları ve Modern Sosyoloji',
        channelName: 'Tarih ve Medeniyet',
        channelAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1280&h=720&fit=crop',
        duration: '24:35',
        views: '145K',
        uploadDate: '2 hafta önce',
        youtubeUrl: 'https://youtube.com',
        description: 'İbn Haldun\'un Mukaddime eserinin detaylı analizi ve modern sosyolojiye katkıları'
      },
      {
        id: '2',
        title: 'Asabiyet Teorisi: Toplumların Yükseliş ve Çöküşü',
        channelName: 'Felsefe Atölyesi',
        channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1280&h=720&fit=crop',
        duration: '18:42',
        views: '89K',
        uploadDate: '1 ay önce',
        youtubeUrl: 'https://youtube.com',
        description: 'İbn Haldun\'un meşhur asabiyet teorisi ve medeniyet döngüleri kavramı'
      },
      {
        id: '3',
        title: 'İbn Haldun\'un Hayat Hikayesi: Bir Düşünür Bir Devlet Adamı',
        channelName: 'Biyografi TV',
        channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1280&h=720&fit=crop',
        duration: '32:18',
        views: '203K',
        uploadDate: '3 hafta önce',
        youtubeUrl: 'https://youtube.com',
        description: 'İbn Haldun\'un doğumundan ölümüne kadar yaşam öyküsü ve etkileri'
      }
    ]
  },
  {
    id: 2,
    name: 'Fatih Sultan Mehmet',
    title: 'Osmanlı Padişahı',
    description: 'İstanbul\'un fethiyle tarihe damga vurdu. Bilim ve sanata büyük önem verdi.',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=800&h=1200&fit=crop',
    period: '1432-1481',
    likes: 5821,
    views: 28901,
    
    fullBiography: `II. Mehmet, 30 Mart 1432'de Edirne'de doğdu ve 3 Mayıs 1481'de İstanbul'da vefat etti. Osmanlı İmparatorluğu'nun yedinci padişahı ve 21 yaşında İstanbul'u fethederek tarihe damga vurdu. Çok yönlü bir hükümdar olarak bilim, sanat ve kültüre büyük önem verdi. Arapça, Farsça, Latince, Yunanca, İbranice ve Sırpça biliyordu. Batı'da "Büyük Türk" olarak anıldı.`,
    
    birthPlace: 'Edirne, Osmanlı İmparatorluğu',
    deathPlace: 'İstanbul, Osmanlı İmparatorluğu',
    
    majorWorks: [
      'İstanbul\'un Fethi (1453)',
      'Mora Yarımadası\'nın Fethi',
      'Trabzon İmparatorluğu\'nun Sona Ermesi',
      'Eflak ve Boğdan\'ın Fethi',
      'Fatih Kanunnamesi'
    ],
    
    achievements: [
      '1453\'te İstanbul\'u fethederek Bizans İmparatorluğu\'na son verdi',
      'Osmanlı İmparatorluğu\'nu bir dünya gücü haline getirdi',
      'İstanbul\'u bilim, sanat ve kültür merkezi yaptı',
      'Çok dilli diplomasi ve kültürel politikalar geliştirdi',
      'Fatih Külliyesi\'ni ve Topkapı Sarayı\'nı inşa ettirdi'
    ],
    
    quote: 'Ya İstanbul\'u alırım, ya İstanbul beni alır.',
    quoteAuthor: 'Fatih Sultan Mehmet',
    
    historicalContext: `15. yüzyıl, Avrupa'da Rönesans'ın başladığı, Doğu-Batı ticaret yollarının önem kazandığı bir dönemdi. İstanbul'un fethi, Ortaçağ'ın sonu ve Yeniçağ'ın başlangıcı olarak kabul edilir. Bu fetih, Osmanlı'yı üç kıtaya yayılan bir imparatorluk haline getirdi.`,
    
    legacy: `Fatih Sultan Mehmet, İstanbul'u fethiyle sadece askeri bir başarı elde etmedi, aynı zamanda İstanbul'u çok kültürlü, çok dinli bir dünya başkenti haline getirdi. Onun kurduğu sistem ve politikalar, Osmanlı İmparatorluğu'nun 400 yıl daha varlığını sürdürmesini sağladı.`,
    
    relatedVideos: [
      {
        id: '1',
        title: 'İstanbul\'un Fethi: 1453\'ün Destansı Hikayesi',
        channelName: 'Tarih Meraklıları',
        channelAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1280&h=720&fit=crop',
        duration: '42:15',
        views: '856K',
        uploadDate: '1 hafta önce',
        youtubeUrl: 'https://youtube.com',
        description: 'İstanbul\'un fethinin detaylı analizi ve tarihi önemi'
      },
      {
        id: '2',
        title: 'Fatih Sultan Mehmet: Dehası ve Vizyonu',
        channelName: 'Osmanlı Belgeseli',
        channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=1280&h=720&fit=crop',
        duration: '35:28',
        views: '421K',
        uploadDate: '2 hafta önce',
        youtubeUrl: 'https://youtube.com',
        description: 'Fatih Sultan Mehmet\'in kişiliği, eğitimi ve devlet yönetimi anlayışı'
      },
      {
        id: '3',
        title: 'Fatih Dönemi Bilim ve Sanat: Rönesans ile Yarışan Medeniyet',
        channelName: 'Kültür ve Medeniyet',
        channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1280&h=720&fit=crop',
        duration: '28:50',
        views: '312K',
        uploadDate: '3 hafta önce',
        youtubeUrl: 'https://youtube.com',
        description: 'Fatih döneminde İstanbul\'da gelişen bilim, sanat ve kültür hayatı'
      }
    ]
  },
  {
    id: 3,
    name: 'Mimar Sinan',
    title: 'Başmimar',
    description: 'Osmanlı mimarisinin zirve ismi, yüzlerce eser bıraktı. Süleymaniye ve Selimiye Camiileri onun eseri.',
    image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=800&h=1200&fit=crop',
    period: '1489-1588',
    likes: 4192,
    views: 19876,
    
    fullBiography: `Mimar Sinan, 1489'da Kayseri'de doğdu ve 1588'de İstanbul'da vefat etti. Osmanlı İmparatorluğu'nun en ünlü mimarı olup, 50 yılı aşkın bir süre başmimarlık yaptı. Devşirme sistemiyle sarayda yetişti ve mühendislik eğitimi aldı. 97 yıllık ömründe 477 esere imza attı. Süleymaniye, Şehzade ve Selimiye camileri başyapıtları arasındadır.`,
    
    birthPlace: 'Ağırnas (Kayseri), Osmanlı İmparatorluğu',
    deathPlace: 'İstanbul, Osmanlı İmparatorluğu',
    
    majorWorks: [
      'Süleymaniye Camii (İstanbul)',
      'Selimiye Camii (Edirne)',
      'Şehzade Camii (İstanbul)',
      'Mihrimah Sultan Camii (Üsküdar ve Edirnekapı)',
      'Kılıç Ali Paşa Camii (İstanbul)'
    ],
    
    achievements: [
      '477 yapıya imza atarak mimarlık tarihinin en üretken ismi oldu',
      'Klasik Osmanlı mimarisini zirveye taşıdı',
      'Mühendislik ve estetik mükemmelliği birleştirdi',
      'Selimiye Camii ile kubbe mühendisliğinin zirvesine ulaştı',
      'Köprüler, hanlar, hamamlar ve çeşmelerle şehir dokusunu şekillendirdi'
    ],
    
    quote: 'Selimiye Camii ile kalfalarımın, Şehzade Camii ile çıraklarımın, Süleymaniye ile ustalığımın eseridir.',
    quoteAuthor: 'Mimar Sinan',
    
    historicalContext: `16. yüzyıl, Osmanlı İmparatorluğu'nun altın çağıydı. Kanuni Sultan Süleyman dönemi, imparatorluğun en geniş sınırlarına ulaştığı ve kültürel açıdan en parlak olduğu dönemdi. Mimar Sinan, bu dönemin mimari dehası olarak imparatorluğun gücünü yapılarıyla taçlandırdı.`,
    
    legacy: `Mimar Sinan'ın eserleri, sadece mimari harikalar değil, aynı zamanda mühendislik biliminin de başyapıtlarıdır. Onun geliştirdiği teknikler ve estetik anlayışı, yüzyıllar boyunca Osmanlı mimarisini etkiledi ve bugün hala dünya çapında hayranlık uyandırmaktadır.`,
    
    relatedVideos: [
      {
        id: '1',
        title: 'Mimar Sinan: Osmanlı\'nın Efsanevi Mimarı',
        channelName: 'Mimarlık Tarihi',
        channelAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1280&h=720&fit=crop',
        duration: '38:22',
        views: '267K',
        uploadDate: '5 gün önce',
        youtubeUrl: 'https://youtube.com',
        description: 'Mimar Sinan\'ın hayatı, eserleri ve mimari dehasının analizi'
      },
      {
        id: '2',
        title: 'Selimiye Camii: Kubbe Mühendisliğinin Zirvesi',
        channelName: 'Sanat ve Bilim',
        channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1280&h=720&fit=crop',
        duration: '25:45',
        views: '189K',
        uploadDate: '2 hafta önce',
        youtubeUrl: 'https://youtube.com',
        description: 'Selimiye Camii\'nin mimari özellikleri ve mühendislik mucizesi'
      },
      {
        id: '3',
        title: 'Süleymaniye\'den Selimiye\'ye: Sinan\'ın Yolculuğu',
        channelName: 'Kültür Sanat',
        channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1591522811280-a8759970b03f?w=1280&h=720&fit=crop',
        duration: '44:12',
        views: '324K',
        uploadDate: '1 ay önce',
        youtubeUrl: 'https://youtube.com',
        description: 'Mimar Sinan\'ın başyapıtlarının karşılaştırmalı analizi'
      }
    ]
  },
  {
    id: 4,
    name: 'Mustafa Kemal Atatürk',
    title: 'Türkiye Cumhuriyeti Kurucusu',
    description: 'Modern Türkiye\'nin kurucusu, askeri deha ve devlet adamı. Türk milletini çağdaş medeniyetler seviyesine çıkardı.',
    image: '/image.png',
    period: '1881-1938',
    likes: 12456,
    views: 89234,
    
    fullBiography: `Mustafa Kemal Atatürk, 1881 yılında Selanik'te doğdu ve 10 Kasım 1938'de İstanbul'da vefat etti. Osmanlı İmparatorluğu'nun son döneminde askeri okulda yetişti ve I. Dünya Savaşı'nda Çanakkale Cephesi'nde efsanevi bir komutan olarak öne çıktı. Kurtuluş Savaşı'nı kazanarak Türkiye Cumhuriyeti'ni kurdu ve ilk cumhurbaşkanı oldu. Devrimci bir lider olarak Türkiye'yi laik, modern ve demokratik bir devlet haline getirdi. Harf devrimi, medeni kanun, kadınlara seçme ve seçilme hakkı gibi çığır açan reformlar gerçekleştirdi.`,
    
    birthPlace: 'Selanik, Osmanlı İmparatorluğu',
    deathPlace: 'İstanbul, Türkiye',
    
    majorWorks: [
      'Kurtuluş Savaşı\'nın Kazanılması (1919-1922)',
      'Türkiye Cumhuriyeti\'nin Kurulması (29 Ekim 1923)',
      'Harf Devrimi (1928)',
      'Türk Medeni Kanunu (1926)',
      'Nutuk - Söylev (1927)',
      'Lozan Antlaşması (1923)'
    ],
    
    achievements: [
      'Kurtuluş Savaşı\'nı kazanarak Türkiye\'nin bağımsızlığını sağladı',
      'Modern, laik ve demokratik Türkiye Cumhuriyeti\'ni kurdu',
      'Kadınlara seçme ve seçilme hakkı verdi (1934)',
      'Latin alfabesine geçişi sağlayarak okuma yazma oranını artırdı',
      'Laiklik, cumhuriyet, milliyetçilik ilkelerini devlet temeline koydu',
      'Türk tarih ve dil kurumlarını kurarak milli kimliği güçlendirdi',
      'Çağdaş hukuk, eğitim ve ekonomik sistemleri kurdu'
    ],
    
    quote: 'Hayatta en hakiki mürşit ilimdir, fendir.',
    quoteAuthor: 'Mustafa Kemal Atatürk',
    
    historicalContext: `20. yüzyılın başları, dünya tarihinin en karmaşık dönemlerinden biriydi. Osmanlı İmparatorluğu yıkılmakta, I. Dünya Savaşı sonrası Anadolu işgal edilmişti. Bu kritik dönemde Atatürk, Türk milletini organize ederek Kurtuluş Savaşı'nı kazandı ve modern Türkiye'nin temellerini attı. Bu süreçte hem askeri bir deha hem de devlet kurucu bir lider olarak tarihe geçti.`,
    
    legacy: `Atatürk'ün kurduğu Türkiye Cumhuriyeti ve gerçekleştirdiği reformlar, Türk milletinin çağdaşlaşmasında çığır açıcı rol oynadı. Onun ilkeleri bugün hala Türkiye Cumhuriyeti'nin temel değerleridir. Kadın hakları, eğitim, bilim ve laiklik konusundaki vizyonu, sadece Türkiye'de değil tüm İslam dünyasında öncü bir rol üstlenmiştir. UNESCO tarafından 1981'de 'Atatürk Yılı' ilan edilmiştir.`,
    
    relatedVideos: [
      {
        id: '1',
        title: 'Atatürk: Bir Milletin Yeniden Doğuşu',
        channelName: 'Cumhuriyet Tarihi',
        channelAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1280&h=720&fit=crop',
        duration: '52:18',
        views: '1.2M',
        uploadDate: '1 hafta önce',
        youtubeUrl: 'https://youtube.com',
        description: 'Atatürk\'ün Kurtuluş Savaşı\'ndan Cumhuriyet\'e uzanan mücadelesi ve devrimleri'
      },
      {
        id: '2',
        title: 'Çanakkale Destanı: Atatürk\'ün Askeri Dehası',
        channelName: 'Askeri Tarih',
        channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1280&h=720&fit=crop',
        duration: '38:45',
        views: '856K',
        uploadDate: '2 hafta önce',
        youtubeUrl: 'https://youtube.com',
        description: 'Çanakkale Savaşı\'nda Atatürk\'ün stratejik kararları ve liderliği'
      },
      {
        id: '3',
        title: 'Atatürk Devrimleri: Çağdaşlaşma Yolculuğu',
        channelName: 'Modern Türkiye',
        channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1280&h=720&fit=crop',
        duration: '45:30',
        views: '678K',
        uploadDate: '3 hafta önce',
        youtubeUrl: 'https://youtube.com',
        description: 'Harf devrimi, kadın hakları ve laiklik: Atatürk devrimlerinin analizi'
      }
    ]
  }
];
