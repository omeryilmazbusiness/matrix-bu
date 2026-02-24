'use client';

import { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/features/admin/hooks/use-admin-auth';

export default function AdminLoginPage() {
  const { login, loading } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      // Success - hook will redirect to dashboard
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Giriş başarısız');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10 text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock size={36} className="text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">Admin Girişi</h1>
            <p className="text-indigo-100 text-sm">Yönetim paneline hoş geldiniz</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3 animate-in slide-in-from-top duration-300">
                <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                E-posta Adresi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={20} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={cn(
                    'w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200',
                    'focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100',
                    'transition-all duration-200 outline-none',
                    'text-gray-900 placeholder:text-gray-400'
                  )}
                  placeholder="admin@hakikatbu.com"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                Şifre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={cn(
                    'w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200',
                    'focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100',
                    'transition-all duration-200 outline-none',
                    'text-gray-900 placeholder:text-gray-400'
                  )}
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye size={20} className="text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={cn(
                'w-full py-3.5 rounded-xl font-bold text-white',
                'bg-gradient-to-r from-indigo-600 to-purple-600',
                'hover:from-indigo-700 hover:to-purple-700',
                'focus:ring-4 focus:ring-indigo-200',
                'transition-all duration-200',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'shadow-lg hover:shadow-xl'
              )}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Giriş yapılıyor...</span>
                </div>
              ) : (
                'Giriş Yap'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 pb-8">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                🔒 Güvenli bağlantı kullanılıyor
              </p>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-700 mb-2">📝 Test için:</p>
          <div className="space-y-1 text-xs text-gray-600">
            <p><strong>Email:</strong> admin@hakikatbu.com</p>
            <p><strong>Şifre:</strong> admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
