#!/bin/bash

# ADIM 3: Database Setup Test Script
# Bu script, database kurulumunun başarılı olup olmadığını test eder

echo "🧪 ADIM 3: Database Setup Test Başlıyor..."
echo ""

# Test 1: Development server çalışıyor mu?
echo "📡 Test 1: Development server kontrolü..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Server çalışıyor"
else
    echo "❌ Server çalışmıyor. Önce 'npm run dev' komutunu çalıştırın!"
    exit 1
fi

echo ""

# Test 2: Admin auth API erişilebilir mi?
echo "🔐 Test 2: Auth API kontrolü..."
RESPONSE=$(curl -s -X GET http://localhost:3000/api/admin/auth/me)
echo "Response: $RESPONSE"

if [[ $RESPONSE == *"\"success\":false"* ]]; then
    echo "✅ Auth API çalışıyor (not authenticated - beklenen)"
else
    echo "⚠️  Beklenmeyen response"
fi

echo ""

# Test 3: Login denemesi
echo "🔑 Test 3: Login API testi..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hakikatbu.com","password":"admin123"}')

echo "Login Response:"
echo "$LOGIN_RESPONSE" | jq '.' 2>/dev/null || echo "$LOGIN_RESPONSE"

if [[ $LOGIN_RESPONSE == *"\"success\":true"* ]]; then
    echo ""
    echo "🎉 ✅ DATABASE KURULUMU BAŞARILI!"
    echo "✅ Login çalışıyor"
    echo "✅ Admin kullanıcısı var"
    echo ""
    echo "🚀 Şimdi tarayıcıda test edebilirsiniz:"
    echo "   http://localhost:3000/admin/login"
    echo ""
    echo "📝 Test bilgileri:"
    echo "   Email: admin@hakikatbu.com"
    echo "   Şifre: admin123"
elif [[ $LOGIN_RESPONSE == *"Invalid credentials"* ]]; then
    echo ""
    echo "⚠️  DATABASE HENÜZ KURULMADI!"
    echo ""
    echo "📋 Yapmanız gerekenler:"
    echo "1. Supabase Dashboard'a gidin: https://supabase.com/dashboard"
    echo "2. SQL Editor'ü açın"
    echo "3. src/features/admin/utils/setup-database.sql dosyasını kopyalayın"
    echo "4. SQL Editor'de 'Run' butonuna basın"
    echo ""
    echo "📚 Detaylı talimatlar için: ADIM-3-DATABASE-SETUP.md"
else
    echo ""
    echo "❌ Beklenmeyen hata!"
    echo "Database bağlantısı kontrol edin."
fi

echo ""
echo "✅ Test tamamlandı!"
