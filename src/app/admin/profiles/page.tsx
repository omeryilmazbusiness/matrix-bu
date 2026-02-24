'use client';

import { useState } from 'react';
import AdminLayout from '@/features/admin/components/admin-layout';
import { ProfileFormDialog } from '@/features/admin/components/profile-form-dialog';
import { useProfiles } from '@/features/admin/hooks/use-profiles';
import { Plus, Search, Edit, Trash2, Eye, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProfileFormData } from '@/features/admin/utils/validation';

export default function AdminProfilesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  const { profiles, loading, error, createProfile, updateProfile, deleteProfile } = useProfiles();

  // Handle create
  const handleCreate = async (data: ProfileFormData) => {
    await createProfile(data);
  };

  // Handle edit
  const handleEdit = async (data: ProfileFormData) => {
    if (editingProfile) {
      await updateProfile(editingProfile.id, data);
      setEditingProfile(null);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    await deleteProfile(id);
    setDeleteConfirm(null);
  };

  // Open create dialog
  const openCreateDialog = () => {
    setEditingProfile(null);
    setDialogOpen(true);
  };

  // Open edit dialog
  const openEditDialog = (profile: any) => {
    setEditingProfile(profile);
    setDialogOpen(true);
  };

  // Filter profiles
  const filteredProfiles = profiles.filter(profile =>
    (profile.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (profile.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (profile.channel_title?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Kanal ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
            />
          </div>
          <button 
            onClick={openCreateDialog}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
          >
            <Plus size={20} strokeWidth={2.5} />
            <span>Yeni Kanal Ekle</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-900">Hata</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 flex flex-col items-center justify-center">
            <Loader2 size={48} className="text-indigo-600 animate-spin mb-4" />
            <p className="text-gray-600 font-semibold">Profiller yükleniyor...</p>
          </div>
        ) : (
          <>
            {/* Profiles Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Kanal Adı</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Kategori</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Durum</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Slug</th>
                      <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProfiles.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center">
                          <p className="text-gray-500 font-semibold">Henüz profil eklenmemiş</p>
                          <button 
                            onClick={openCreateDialog}
                            className="mt-4 text-indigo-600 hover:text-indigo-700 font-semibold"
                          >
                            İlk profili ekle →
                          </button>
                        </td>
                      </tr>
                    ) : (
                      filteredProfiles.map((profile) => (
                        <tr key={profile.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img 
                                src={profile.image_url || profile.thumbnail_high || '/placeholder-channel.svg'} 
                                alt={profile.name || profile.channel_title || 'Channel'}
                                className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  // Sonsuz döngüyü önle: sadece placeholder değilse değiştir
                                  if (!target.src.includes('placeholder-channel.svg')) {
                                    target.onerror = null; // Error handler'ı kaldır
                                    target.src = '/placeholder-channel.svg';
                                  }
                                }}
                              />
                              <div>
                                <p className="font-semibold text-gray-900">{profile.name || profile.channel_title}</p>
                                <p className="text-sm text-gray-500">{profile.title || profile.channel_title}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-semibold rounded-lg">
                              {profile.topic}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              'px-3 py-1 text-sm font-semibold rounded-lg',
                              profile.status === 'verified' && 'bg-green-50 text-green-700',
                              profile.status === 'active' && 'bg-blue-50 text-blue-700',
                              profile.status === 'draft' && 'bg-gray-50 text-gray-700',
                              profile.status === 'archived' && 'bg-red-50 text-red-700'
                            )}>
                              {profile.status === 'verified' && '✓ Onaylı'}
                              {profile.status === 'active' && '● Aktif'}
                              {profile.status === 'draft' && '○ Taslak'}
                              {profile.status === 'archived' && '✕ Arşiv'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 font-mono">
                              {profile.slug}
                            </code>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => openEditDialog(profile)}
                                className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors"
                                title="Düzenle"
                              >
                                <Edit size={18} />
                              </button>
                              <button 
                                onClick={() => setDeleteConfirm(profile.id)}
                                className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                title="Sil"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stats */}
            {filteredProfiles.length > 0 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Toplam <span className="font-bold text-gray-900">{filteredProfiles.length}</span> kanal
                  {searchQuery && ` (${profiles.length} kanal arasından)`}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <ProfileFormDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingProfile(null);
        }}
        onSubmit={editingProfile ? handleEdit : handleCreate}
        initialData={editingProfile}
        mode={editingProfile ? 'edit' : 'create'}
      />

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Profili Sil</h3>
                <p className="text-sm text-gray-600">Bu işlem geri alınamaz</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Bu profili silmek istediğinizden emin misiniz? Tüm veriler kalıcı olarak silinecektir.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
