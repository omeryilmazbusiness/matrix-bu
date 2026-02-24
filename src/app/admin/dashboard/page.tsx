import AdminLayout from '@/features/admin/components/admin-layout';
import { Users, Crown, Eye, TrendingUp } from 'lucide-react';

export default function AdminDashboardPage() {
  // Mock data - gerçek API'den gelecek
  const stats = [
    { label: 'Toplam Kanal', value: '42', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Haftanın Kişisi', value: '4', icon: Crown, color: 'from-purple-500 to-pink-500' },
    { label: 'Toplam Görüntülenme', value: '125K', icon: Eye, color: 'from-green-500 to-emerald-500' },
    { label: 'Aktif Kullanıcı', value: '8.5K', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-black mb-2">Hoş Geldiniz! 👋</h1>
          <p className="text-indigo-100">Admin panelinizde her şey yolunda görünüyor.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon size={24} className="text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Son Aktiviteler</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Yeni kanal eklendi</p>
                  <p className="text-sm text-gray-600">2 saat önce</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
