'use client';

import { Container } from '@/shared/components/layout';
import { 
  Target, 
  Heart, 
  Shield, 
  Users, 
  Award, 
  Sparkles,
  CheckCircle2,
  BookOpen,
  Home as HomeIcon,
  Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TeamSection } from '@/features/about/components/team-section';
import { TimelineSection } from '@/features/about/components/timeline-section';

const missionPoints = [
  {
    icon: Shield,
    title: 'Ahlaki Değerler',
    description: 'Türk toplumunun ahlaki değerlerine, aile yapısına ve kültürel mirasına uygun içerikleri özenle seçiyoruz.'
  },
  {
    icon: Scale,
    title: 'Adil Değerlendirme',
    description: 'Her kanalı objektif kriterlerle, içerik kalitesi ve toplumsal faydası açısından değerlendiriyoruz.'
  },
  {
    icon: BookOpen,
    title: 'Eğitici İçerik',
    description: 'Bilim, tarih, felsefe ve güncel konularda güvenilir, doğru bilgiye ulaşmanızı sağlıyoruz.'
  },
  {
    icon: HomeIcon,
    title: 'Aile Dostu',
    description: 'Her yaştan izleyicinin güvenle takip edebileceği, aile değerlerine saygılı kanalları sunuyoruz.'
  }
];

const values = [
  {
    icon: Heart,
    title: 'Toplumsal Fayda',
    description: 'İçeriklerin topluma katkı sağlamasını, bilgi ve bilinç düzeyini artırmasını hedefliyoruz.'
  },
  {
    icon: Award,
    title: 'Kalite Standartları',
    description: 'Sadece yüksek kaliteli, araştırmaya dayalı ve güvenilir kaynaklara sahip içerikleri seçiyoruz.'
  },
  {
    icon: Users,
    title: 'Topluluk Odaklı',
    description: 'Kullanıcılarımızın önerileri ve geri bildirimleriyle birlikte büyüyen bir platformuz.'
  }
];

const stats = [
  { number: '100+', label: 'Doğrulanmış Kanal' },
  { number: '50K+', label: 'Mutlu Kullanıcı' },
  { number: '1M+', label: 'İzlenme' },
  { number: '%99', label: 'Memnuniyet' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-70" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-200/50 shadow-lg">
              <Sparkles size={16} className="text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-700">Topluma Değer Katıyoruz</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
              Neden{' '}
              <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Hakikatbu
              </span>
              ?
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Dijital dünyada kaliteli, güvenilir ve toplumumuzun değerlerine uygun içeriklere 
              ulaşmayı kolaylaştırmak için yola çıktık. Her içerik önerimiz, ailelerimizin ve 
              gençlerimizin güvenle izleyebileceği standartlarda.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 pt-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="relative group animate-in fade-in slide-in-from-bottom-4 duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-3xl sm:text-4xl font-black bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-semibold">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Mission Section */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg mb-4">
                <Target size={28} className="text-white" strokeWidth={2} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                Misyonumuz
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Toplumumuzun ihtiyaç duyduğu kaliteli içeriği, doğru kriterlerle sizlere ulaştırıyoruz
              </p>
            </div>

            {/* Mission Grid */}
            <div className="grid sm:grid-cols-2 gap-8">
              {missionPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div
                    key={index}
                    className="group relative animate-in fade-in slide-in-from-bottom-4 duration-700"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative h-full p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200/50 hover:border-indigo-200 shadow-lg hover:shadow-2xl transition-all duration-300">
                      {/* Icon */}
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-linear-to-br from-indigo-100 to-purple-100 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon size={24} className="text-indigo-600" strokeWidth={2} />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {point.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {point.description}
                      </p>

                      {/* Decorative Element */}
                      <div className="absolute top-4 right-4 w-24 h-24 bg-indigo-100 rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Why Section - Detailed Explanation */}
      <section className="py-20 sm:py-28 bg-linear-to-b from-white to-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 space-y-8 border border-gray-200/50">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg mb-4">
                  <Heart size={28} className="text-white" strokeWidth={2} />
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                  Neden Bu Platformu Oluşturduk?
                </h2>
              </div>

              <div className="prose prose-lg max-w-none space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Günümüzde dijital içerik dünyası hızla genişlerken, <strong className="text-indigo-600">kaliteli ve değerlerimize uygun içeriklere ulaşmak</strong> giderek zorlaşıyor. 
                  Her gün yüzlerce kanal ve binlerce video karşımıza çıkıyor, ancak hangisinin gerçekten faydalı, 
                  güvenilir ve ailelerimizle paylaşabileceğimiz nitelikte olduğunu bulmak zor.
                </p>

                <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                  <p className="text-base font-semibold text-indigo-900 mb-2">
                    💡 Temel Amacımız
                  </p>
                  <p className="text-gray-700">
                    Hakikatbu olarak, <strong>Türk toplumunun kültürel değerlerine, aile yapısına ve ahlaki ölçülerine</strong> saygı duyan, 
                    aynı zamanda bilimsel, tarihsel ve felsefi derinliğe sahip içerikleri sizler için filtreliyoruz.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  🎯 Değerlendirme Kriterlerimiz
                </h3>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" strokeWidth={2.5} />
                    <div>
                      <strong className="text-gray-900">Ahlaki ve Etik Değerler:</strong> İçeriklerin toplumumuzun geleneklerine, 
                      aile yapısına ve ahlaki prensiplerine uygunluğunu titizlikle kontrol ediyoruz.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" strokeWidth={2.5} />
                    <div>
                      <strong className="text-gray-900">Bilimsel Doğruluk:</strong> Paylaşılan bilgilerin kaynağını, 
                      doğruluğunu ve akademik değerini araştırarak doğruluyoruz.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" strokeWidth={2.5} />
                    <div>
                      <strong className="text-gray-900">Eğitici Değer:</strong> İçeriklerin izleyiciye katkı sağlaması, 
                      bilinç ve bilgi düzeyini artırması önceliğimizdir.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" strokeWidth={2.5} />
                    <div>
                      <strong className="text-gray-900">Aile Uygunluğu:</strong> Her yaş grubunun güvenle izleyebileceği, 
                      ailece takip edilebilecek içerikleri seçiyoruz.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" strokeWidth={2.5} />
                    <div>
                      <strong className="text-gray-900">Toplumsal Sorumluluk:</strong> Topluma fayda sağlayan, 
                      sosyal bilinç oluşturan ve pozitif etki yaratan içeriklere öncelik veriyoruz.
                    </div>
                  </li>
                </ul>

                <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 mt-8">
                  <p className="text-base font-semibold text-amber-900 mb-2">
                    🏆 Kalite Garantisi
                  </p>
                  <p className="text-gray-700">
                    Platform üzerinde yer alan her kanal, uzman ekibimiz tarafından detaylı olarak incelenir. 
                    Sadece belirli standartları karşılayan, toplumumuzun değerlerine saygılı ve kaliteli içerik üreten 
                    kanallar listemize dahil edilir.
                  </p>
                </div>

                <p className="text-lg font-semibold text-gray-900 mt-8">
                  Hakikatbu, dijital dünyadaki bilgi kirliliğine karşı bir <span className="text-indigo-600">güven köprüsü</span> olmayı hedefliyor. 
                  Ailenizle birlikte güvenle izleyebileceğiniz, kendinizi geliştirebileceğiniz ve toplumumuza katkı sağlayan 
                  içeriklere kolay erişim sağlıyoruz.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg mb-4">
                <Award size={28} className="text-white" strokeWidth={2} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                Değerlerimiz
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Platformumuzu yönlendiren temel prensipler
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid sm:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="group text-center animate-in fade-in slide-in-from-bottom-4 duration-700"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200/50 hover:border-purple-200 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                      {/* Icon */}
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-100 to-pink-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon size={28} className="text-purple-600" strokeWidth={2} />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline Section - NEW */}
      <TimelineSection />

      {/* Team Section - NEW */}
      <TeamSection />

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center space-y-8 text-white">
            <h2 className="text-3xl sm:text-4xl font-black">
              Birlikte Daha Güçlüyüz
            </h2>
            <p className="text-lg sm:text-xl opacity-90">
              Siz de kaliteli içerik önerilerinizle platformumuza katkıda bulunabilirsiniz. 
              Her öneri, daha iyi bir dijital dünya için önemli bir adımdır.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="/"
                className={cn(
                  'inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base',
                  'bg-white text-indigo-600 shadow-2xl',
                  'hover:scale-105 active:scale-95 transition-all duration-300'
                )}
              >
                Kanalları Keşfet
                <Sparkles size={20} strokeWidth={2.5} />
              </a>
              <a
                href="/iletisim"
                className={cn(
                  'inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base',
                  'bg-white/10 backdrop-blur-sm text-white border-2 border-white/30',
                  'hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300'
                )}
              >
                Bizimle İletişime Geçin
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
