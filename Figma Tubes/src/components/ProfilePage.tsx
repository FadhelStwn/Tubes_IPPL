import { useState } from 'react';
import { User, Mail, Phone, MapPin, Bike, Plus, Edit2, Trash2, Save } from 'lucide-react';

interface ProfilePageProps {
  user: any;
  onNavigate: (page: string) => void;
}

const INITIAL_MOTORCYCLES = [
  { id: 1, brand: 'Yamaha', model: 'R15 V3', year: 2021, color: 'Biru', plateNumber: 'B 1234 XYZ' },
  { id: 2, brand: 'Honda', model: 'CBR250RR', year: 2020, color: 'Merah', plateNumber: 'B 5678 ABC' },
];

export function ProfilePage({ user, onNavigate }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [motorcycles, setMotorcycles] = useState(INITIAL_MOTORCYCLES);
  const [showAddMotor, setShowAddMotor] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleSaveProfile = () => {
    // In real app, would save to backend
    setIsEditing(false);
  };

  const handleDeleteMotor = (id: number) => {
    setMotorcycles(motorcycles.filter(m => m.id !== id));
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl mb-2">Profil Saya</h1>
          <p className="text-zinc-400">Kelola informasi pribadi dan motor Anda</p>
        </div>

        {/* Profile Info */}
        <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="size-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
                <User className="size-10" />
              </div>
              <div>
                <h2 className="text-2xl mb-1">{user?.name || 'User'}</h2>
                <p className="text-zinc-400">Member sejak {new Date().toLocaleDateString('id-ID')}</p>
              </div>
            </div>
            <button
              onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              {isEditing ? (
                <>
                  <Save className="size-4" />
                  Simpan
                </>
              ) : (
                <>
                  <Edit2 className="size-4" />
                  Edit Profil
                </>
              )}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Nama Lengkap</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-600/50"
                />
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-lg">
                  <User className="size-4 text-zinc-500" />
                  <span>{editData.name}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-600/50"
                />
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-lg">
                  <Mail className="size-4 text-zinc-500" />
                  <span>{editData.email}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Nomor Telepon</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-600/50"
                />
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-lg">
                  <Phone className="size-4 text-zinc-500" />
                  <span>{editData.phone || 'Belum diisi'}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Alamat</label>
              {isEditing ? (
                <textarea
                  value={editData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-600/50 resize-none"
                  rows={2}
                />
              ) : (
                <div className="flex items-start gap-2 px-4 py-2 bg-zinc-800/50 rounded-lg">
                  <MapPin className="size-4 text-zinc-500 mt-0.5" />
                  <span>{editData.address || 'Belum diisi'}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Motorcycles */}
        <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl">Motor Saya</h3>
            <button
              onClick={() => setShowAddMotor(true)}
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Plus className="size-4" />
              Tambah Motor
            </button>
          </div>

          {motorcycles.length === 0 ? (
            <div className="text-center py-8 text-zinc-400">
              <Bike className="size-12 mx-auto mb-3 opacity-50" />
              <p>Belum ada motor terdaftar</p>
              <p className="text-sm mt-1">Tambahkan motor untuk mendapat rekomendasi yang lebih akurat</p>
            </div>
          ) : (
            <div className="space-y-3">
              {motorcycles.map(motor => (
                <div
                  key={motor.id}
                  className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4 flex items-center justify-between hover:border-red-600/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-12 bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-lg flex items-center justify-center">
                      <Bike className="size-6 text-red-500" />
                    </div>
                    <div>
                      <h4>{motor.brand} {motor.model}</h4>
                      <div className="flex items-center gap-4 text-sm text-zinc-400 mt-1">
                        <span>Tahun {motor.year}</span>
                        <span>•</span>
                        <span>{motor.color}</span>
                        <span>•</span>
                        <span>{motor.plateNumber}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteMotor(motor.id)}
                    className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                  >
                    <Trash2 className="size-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preferences */}
        <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6">
          <h3 className="text-xl mb-4">Preferensi</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors">
              <span>Notifikasi Email</span>
              <input type="checkbox" defaultChecked className="size-4" />
            </label>
            <label className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors">
              <span>Notifikasi Update Pesanan</span>
              <input type="checkbox" defaultChecked className="size-4" />
            </label>
            <label className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors">
              <span>Promosi & Penawaran Khusus</span>
              <input type="checkbox" className="size-4" />
            </label>
          </div>
        </div>
      </div>

      {/* Add Motor Modal */}
      {showAddMotor && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowAddMotor(false)}>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl mb-4">Tambah Motor Baru</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const newMotor = {
                  id: motorcycles.length + 1,
                  brand: formData.get('brand') as string,
                  model: formData.get('model') as string,
                  year: parseInt(formData.get('year') as string),
                  color: formData.get('color') as string,
                  plateNumber: formData.get('plateNumber') as string,
                };
                setMotorcycles([...motorcycles, newMotor]);
                setShowAddMotor(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Merk</label>
                <input
                  type="text"
                  name="brand"
                  required
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-600/50"
                  placeholder="Honda, Yamaha, dll"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Model</label>
                <input
                  type="text"
                  name="model"
                  required
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-600/50"
                  placeholder="CBR250RR, R15, dll"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Tahun</label>
                <input
                  type="number"
                  name="year"
                  required
                  min="1990"
                  max={new Date().getFullYear()}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-600/50"
                  placeholder="2021"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Warna</label>
                <input
                  type="text"
                  name="color"
                  required
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-600/50"
                  placeholder="Merah, Hitam, dll"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Nomor Plat</label>
                <input
                  type="text"
                  name="plateNumber"
                  required
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-600/50"
                  placeholder="B 1234 XYZ"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddMotor(false)}
                  className="flex-1 px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Tambah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
