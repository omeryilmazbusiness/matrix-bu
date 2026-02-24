# Admin Backend Mimarisi

## 🏗️ Mimari Katmanlar (SOLID Prensipler)

```
┌─────────────────────────────────────────┐
│          API Routes Layer               │ ← HTTP Endpoints
│   /api/admin/auth, /api/admin/profiles  │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Services Layer                  │ ← Business Logic
│   AuthService, ProfileService           │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│       Repository Layer                  │ ← Data Access
│   AdminRepository, ProfileRepository    │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Database (Supabase)             │ ← PostgreSQL
└─────────────────────────────────────────┘
```

## 🔑 SOLID Prensipleri

1. **Single Responsibility**: Her class sadece bir işten sorumlu
   - `AuthService`: Sadece authentication
   - `ProfileService`: Sadece profile işlemleri
   - `AdminRepository`: Sadece admin veritabanı işlemleri

2. **Open/Closed**: Yeni özellikler eklenebilir, mevcut kod değişmez

3. **Liskov Substitution**: Interface implementasyonları değiştirilebilir

4. **Interface Segregation**: Her interface sadece gerekli metodları içerir

5. **Dependency Inversion**: Service'ler interface'lere bağımlı, concrete class'lara değil

## 🚀 Kurulum

### 1. Database Setup (Supabase)

Supabase Dashboard'a gidin ve SQL Editor'de şu dosyayı çalıştırın:
```bash
src/features/admin/utils/setup-database.sql
```

Bu komut:
- ✅ `admin_users` tablosunu oluşturur
- ✅ RLS (Row Level Security) politikalarını kurar
- ✅ İlk admin kullanıcısını ekler (`admin@hakikatbu.com`)
- ✅ Trigger'ları ve index'leri oluşturur

### 2. Environment Variables

`.env.local` dosyasında JWT secret'ı ekleyin:
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
```

### 3. Test Admin Credentials

Geçici test için:
- **Email**: `admin@hakikatbu.com`
- **Password**: `admin123` (geçici - AuthService'te hardcoded)

⚠️ **Production'da değiştirin!**

## 📡 API Endpoints

### Authentication

#### Login
```
POST /api/admin/auth/login
Body: {
  "email": "admin@hakikatbu.com",
  "password": "admin123"
}
Response: {
  "success": true,
  "data": {
    "user": { ... },
    "expiresAt": 1234567890
  }
}
```

#### Check Session
```
GET /api/admin/auth/me
Headers: Cookie: admin_token=xxx
Response: {
  "success": true,
  "data": {
    "user": { ... }
  }
}
```

#### Logout
```
POST /api/admin/auth/logout
Response: {
  "success": true,
  "message": "Logged out successfully"
}
```

### Profiles/Channels Management

#### List All Profiles
```
GET /api/admin/profiles
GET /api/admin/profiles?topic=din-felsefe&status=active
Response: {
  "success": true,
  "data": [ ... ]
}
```

#### Create Profile
```
POST /api/admin/profiles
Body: {
  "slug": "ali-osman-tuzcu",
  "title": "Ali Osman Tuzcu",
  "name": "Ali Osman Tuzcu",
  "image_url": "https://...",
  "topic": "din-felsefe",
  "description": "...",
  "status": "active"
}
```

#### Get Single Profile
```
GET /api/admin/profiles/[id]
```

#### Update Profile
```
PUT /api/admin/profiles/[id]
Body: { "status": "verified" }
```

#### Delete Profile
```
DELETE /api/admin/profiles/[id]
```

## 🔒 Security

- **JWT Tokens**: 24 saat geçerlilik
- **HttpOnly Cookies**: XSS saldırılarına karşı korumalı
- **SameSite Strict**: CSRF saldırılarına karşı korumalı
- **Row Level Security (RLS)**: Supabase seviyesinde güvenlik
- **Authentication Middleware**: Her endpoint token kontrolü yapar

## 🧪 Test Etme

### 1. Login Test
```bash
curl -X POST http://localhost:3000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hakikatbu.com","password":"admin123"}'
```

### 2. Profile Listeleme (with cookie)
```bash
curl -X GET http://localhost:3000/api/admin/profiles \
  -H "Cookie: admin_token=YOUR_TOKEN_HERE"
```

## 📂 Dosya Yapısı

```
src/features/admin/
├── types/
│   └── index.ts              # TypeScript interfaces
├── repositories/
│   ├── admin.repository.ts   # Admin data access
│   └── profile.repository.ts # Profile data access
├── services/
│   ├── auth.service.ts       # Authentication logic
│   └── profile.service.ts    # Profile business logic
└── utils/
    └── setup-database.sql    # Database setup script

src/app/api/admin/
├── auth/
│   ├── login/route.ts        # POST /api/admin/auth/login
│   ├── me/route.ts           # GET /api/admin/auth/me
│   └── logout/route.ts       # POST /api/admin/auth/logout
└── profiles/
    ├── route.ts              # GET, POST /api/admin/profiles
    └── [id]/route.ts         # GET, PUT, DELETE /api/admin/profiles/[id]
```

## 🎯 Sonraki Adımlar

1. ✅ **Backend API hazır**
2. ⏳ **Admin UI oluşturulacak** (login page, dashboard, profile manager)
3. ⏳ **Weekly Person API endpoints** eklenecek
4. ⏳ **File upload** (image upload) eklenecek
5. ⏳ **Bcrypt password hashing** production için eklenecek

## 🔧 Production İyileştirmeleri

1. **Password Hashing**: Bcrypt ile şifre hashleme ekleyin
2. **Rate Limiting**: API rate limiting ekleyin
3. **Logging**: Winston/Pino ile logging ekleyin
4. **Validation**: Zod ile input validation ekleyin
5. **Error Handling**: Global error handler ekleyin
6. **Testing**: Jest/Vitest ile unit testler ekleyin

## 📚 Kullanılan Teknolojiler

- **Next.js 16**: Full-stack framework
- **TypeScript**: Type safety
- **Supabase**: PostgreSQL database
- **JWT (jose)**: Authentication tokens
- **bcryptjs**: Password hashing (hazır, henüz kullanılmıyor)
- **SOLID**: Mimari prensipleri
