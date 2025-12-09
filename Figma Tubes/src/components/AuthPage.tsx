import { useState } from 'react';
import { User, Mail, Lock, Phone, MapPin } from 'lucide-react';

interface AuthPageProps {
  onLogin: (userData: any) => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication
    const userData = {
      id: 1,
      name: formData.name || 'User',
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      motorcycles: [],
      joinDate: new Date(),
    };

    onLogin(userData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-16 bg-gradient-to-br from-red-600 to-red-700 rounded-xl mb-4">
            <User className="size-8" />
          </div>
          <h2 className="text-3xl mb-2">
            {isLogin ? 'Masuk ke MotoDif' : 'Daftar Akun Baru'}
          </h2>
          <p className="text-zinc-400">
            {isLogin 
              ? 'Lanjutkan perjalanan modifikasi motor Anda' 
              : 'Mulai transformasi motor impian Anda'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm mb-2 text-zinc-400">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-zinc-500" />
                <input
                  type="text"
                  required={!isLogin}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-600/50 transition-colors"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm mb-2 text-zinc-400">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-zinc-500" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-600/50 transition-colors"
                placeholder="email@example.com"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm mb-2 text-zinc-400">Nomor Telepon</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-zinc-500" />
                <input
                  type="tel"
                  required={!isLogin}
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-600/50 transition-colors"
                  placeholder="08xxxxxxxxxx"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm mb-2 text-zinc-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-zinc-500" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-600/50 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm mb-2 text-zinc-400">Alamat</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 size-5 text-zinc-500" />
                <textarea
                  required={!isLogin}
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-600/50 transition-colors resize-none"
                  placeholder="Alamat lengkap"
                  rows={3}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-500 hover:to-red-600 transition-all"
          >
            {isLogin ? 'Masuk' : 'Daftar Sekarang'}
          </button>

          {isLogin && (
            <button
              type="button"
              className="w-full text-sm text-zinc-400 hover:text-red-500 transition-colors"
            >
              Lupa password?
            </button>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-zinc-400">
            {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              {isLogin ? 'Daftar di sini' : 'Masuk di sini'}
            </button>
          </p>
        </div>

        {!isLogin && (
          <div className="mt-6 bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-4">
            <h3 className="text-sm mb-2">Keuntungan Membuat Akun:</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <div className="size-1.5 bg-red-500 rounded-full mt-2" />
                <span>Tracking pesanan dan pengerjaan real-time</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="size-1.5 bg-red-500 rounded-full mt-2" />
                <span>Riwayat pembelian dan modifikasi tersimpan</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="size-1.5 bg-red-500 rounded-full mt-2" />
                <span>Konsultasi gratis dengan mekanik profesional</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="size-1.5 bg-red-500 rounded-full mt-2" />
                <span>Notifikasi update status dan promo eksklusif</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
