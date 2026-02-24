import { NextRequest, NextResponse } from 'next/server';

// Email gönderimi için burada Resend, SendGrid, veya Nodemailer kullanılabilir
// Şimdilik console'a logla ve başarılı döndür

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, subject, message, kvkkConsent } = body;

    // Validasyon
    if (!fullName || !email || !subject || !message || !kvkkConsent) {
      return NextResponse.json(
        { error: 'Tüm alanlar zorunludur' },
        { status: 400 }
      );
    }

    // Email validasyonu
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir email adresi giriniz' },
        { status: 400 }
      );
    }

    // İletişim formunu loglayalım (gerçek üretimde email gönderilir)
    console.log('📧 Yeni İletişim Formu:', {
      fullName,
      email,
      subject,
      message: message.substring(0, 100) + '...',
      timestamp: new Date().toISOString()
    });

    // TODO: Email gönderimi
    // Örnek: Resend, SendGrid, Nodemailer ile email gönder
    // await sendEmail({
    //   to: 'info@hakikatbu.com',
    //   subject: `İletişim Formu: ${subject}`,
    //   html: emailTemplate
    // });

    // TODO: Veritabanına kaydet
    // Supabase veya başka bir veritabanına form verisini kaydet
    // await supabase.from('contact_submissions').insert({...})

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mesajınız başarıyla gönderildi' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Contact form error:', error);
    return NextResponse.json(
      { 
        error: 'Mesaj gönderilirken bir hata oluştu',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    );
  }
}
