# 🗄️ ADIM 3: Database Setup - Supabase

## 📋 Hızlı Başlangıç

Bu adımda Supabase'de `admin_users` tablosunu oluşturacağız.

---

## 🚀 Adım Adım Kurulum

### 1️⃣ Supabase Dashboard'a Girin

1. Tarayıcınızda açın: **https://supabase.com/dashboard**
2. Projenizi seçin (Hakikat BU projesi)

### 2️⃣ SQL Editor'ü Açın

1. Sol menüden **"SQL Editor"** seçeneğine tıklayın
2. **"New Query"** butonuna tıklayın

### 3️⃣ SQL Script'i Kopyalayın

Aşağıdaki dosyayı açın:
```
src/features/admin/utils/setup-database.sql
```

**Tüm içeriği kopyalayın** (Ctrl+A, Ctrl+C)

### 4️⃣ SQL Editor'e Yapıştırın

1. SQL Editor'deki boş alana **yapıştırın** (Ctrl+V)
2. Sağ alt köşedeki **"Run"** butonuna tıklayın ▶️

### 5️⃣ Başarı Kontrolü

Script çalıştıktan sonra şu mesajı göreceksiniz:
```
✅ Success. No rows returned
```

Bu normal! Tablolar arka planda oluşturuldu.

---

## 🔍 Doğrulama Adımları

### Tablo Oluşturuldu mu Kontrol Edin

1. Sol menüden **"Table Editor"** seçin
2. Tablolar listesinde **"admin_users"** tablosunu göreceksiniz
3. Tıklayın ve içeriğini görün

**Beklenen Yapı:**
```
| id (UUID) | email | name | role | created_at | updated_at |
```

**İlk Admin Kullanıcısı:**
```
email: admin@hakikatbu.com
name: Admin User
role: admin
```

---

## 🧪 Test: Admin Kullanıcısını Manuel Kontrol

### SQL Editor'de Test Query Çalıştırın:

```sql
SELECT * FROM admin_users WHERE email = 'admin@hakikatbu.com';
```

**Beklenen Sonuç:**
```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "email": "admin@hakikatbu.com",
  "name": "Admin User",
  "role": "admin",
  "created_at": "2026-01-23T...",
  "updated_at": "2026-01-23T..."
}
```

---

## 🎯 Script Ne Yapar?

### 1. **admin_users Tablosu Oluşturur**
- `id`: Benzersiz UUID (otomatik oluşur)
- `email`: Admin e-posta adresi (UNIQUE)
- `name`: Admin adı
- `role`: Rol (sadece 'admin' olabilir)
- `created_at`: Oluşturulma tarihi
- `updated_at`: Güncellenme tarihi

### 2. **Row Level Security (RLS) Kurar**
- Admin kullanıcıları sadece kendi verilerine erişebilir
- Güvenlik politikaları otomatik çalışır

### 3. **İlk Admin Kullanıcısını Ekler**
- Email: `admin@hakikatbu.com`
- Password: `admin123` (hardcoded - AuthService'te)

### 4. **Triggers Oluşturur**
- `updated_at` her update'te otomatik güncellenir

### 5. **Performans İndeksleri Ekler**
- `email` ve `created_at` için hızlı arama

---

## ⚠️ Önemli Notlar

### 🔐 Güvenlik
- **Production'da şifreyi değiştirin!**
- Şu an şifre hardcoded: `admin123` (AuthService.ts'de)
- Gerçek production'da bcrypt ile hash'lenmiş şifre kullanılmalı

### 🔄 Script Tekrar Çalıştırılabilir
- `CREATE TABLE IF NOT EXISTS` kullanılıyor
- `ON CONFLICT DO NOTHING` ile duplicate hata önleniyor
- İstediğiniz kadar çalıştırabilirsiniz, zarar vermez

### 🗑️ Tabloyu Silmek İsterseniz
```sql
DROP TABLE IF EXISTS public.admin_users CASCADE;
```

---

## 🎉 Başarılı Kurulum Sonrası

Database kurulduktan sonra:

### ✅ Yapabilecekleriniz:
1. Login sistemi **tamamen çalışır** 🔐
2. Dashboard'a **erişebilirsiniz** 📊
3. Logout **çalışır** 🚪
4. Protected routes **koruma altında** 🛡️

### 🧪 Test Adımları:
1. Development server'ı başlatın:
   ```bash
   npm run dev
   ```

2. Login sayfasına gidin:
   ```
   http://localhost:3000/admin/login
   ```

3. Test bilgilerini girin:
   - **Email:** `admin@hakikatbu.com`
   - **Şifre:** `admin123`

4. **Başarılı!** Dashboard'a yönlendirileceksiniz! 🎉

---

## 🐛 Sorun Giderme

### Hata: "relation admin_users does not exist"
**Çözüm:** SQL script henüz çalıştırılmamış. Yukarıdaki adımları takip edin.

### Hata: "invalid credentials"
**Olası Sebepler:**
1. Admin kullanıcısı eklenmemiş → SQL script'i tekrar çalıştırın
2. Yanlış şifre girilmiş → `admin123` yazın (case sensitive)
3. Supabase bağlantı hatası → `.env.local` dosyasını kontrol edin

### Hata: "duplicate key value violates unique constraint"
**Normal!** Admin kullanıcısı zaten var. Sorun değil, devam edin.

---

## 📊 Database Schema

```sql
CREATE TABLE admin_users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_created_at ON admin_users(created_at DESC);

-- RLS Policies
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin users can view their own data" ...
```

---

## 🔜 Sonraki Adım: ADIM 4

Database kurduktan sonra **ADIM 4: User Profile Management**'a geçeceğiz:
- ✅ Profil ekleme formu
- ✅ Profil düzenleme
- ✅ Profil silme
- ✅ API entegrasyonu

---

## 💡 İpucu

Database'i kurduktan sonra Supabase Table Editor'de:
- Yeni admin kullanıcıları ekleyebilirsiniz
- Mevcut admin'leri düzenleyebilirsiniz
- Rolleri değiştirebilirsiniz

**Manuel Admin Ekleme:**
```sql
INSERT INTO admin_users (email, name, role)
VALUES ('yeni-admin@hakikatbu.com', 'Yeni Admin', 'admin');
```

---

## ✅ Checklist

Database kurulumu için kontrol listesi:

- [ ] Supabase Dashboard'a giriş yaptım
- [ ] SQL Editor'ü açtım
- [ ] setup-database.sql dosyasını kopyaladım
- [ ] SQL Editor'de "Run" butonuna bastım
- [ ] "Success" mesajını gördüm
- [ ] Table Editor'de admin_users tablosunu gördüm
- [ ] İlk admin kullanıcısını gördüm
- [ ] Test query çalıştırdım (opsiyonel)
- [ ] Login sayfasında giriş yaptım
- [ ] Dashboard'a yönlendirildim

**Hepsi ✅ ise ADIM 3 TAMAMLANDI!** 🎉
