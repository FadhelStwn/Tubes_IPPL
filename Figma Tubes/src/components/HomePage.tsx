import { Wrench, MessageSquare, Package, ArrowRight, Shield, Clock, Users } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
}

export function HomePage({ onNavigate, isLoggedIn }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full mb-6">
              <div className="size-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm text-red-400">Bengkel Modifikasi Motor Terpercaya</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl mb-6 bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Wujudkan Motor Impian Anda dengan MotoDif
            </h1>
            
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              Sparepart berkualitas, modifikasi custom, dan konsultasi mekanik profesional—semua dalam satu platform digital yang mudah digunakan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('sparepart')}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-500 hover:to-red-600 transition-all flex items-center justify-center gap-2 group"
              >
                Cari Sparepart
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('modification')}
                className="px-8 py-4 bg-zinc-800/50 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition-all"
              >
                Lihat Paket Modifikasi
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl mb-4">Layanan Unggulan Kami</h2>
            <p className="text-zinc-400">Solusi lengkap untuk kebutuhan otomotif Anda</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Package className="size-8" />}
              title="Sparepart Berkualitas"
              description="Ribuan sparepart original dan aftermarket untuk semua jenis motor. Kompatibilitas terjamin."
              onClick={() => onNavigate('sparepart')}
            />
            <FeatureCard
              icon={<Wrench className="size-8" />}
              title="Modifikasi Custom"
              description="Dari modif ringan hingga full custom. Wujudkan motor impian sesuai keinginan Anda."
              onClick={() => onNavigate('modification')}
            />
            <FeatureCard
              icon={<MessageSquare className="size-8" />}
              title="Konsultasi Real-Time"
              description="Chat langsung dengan mekanik berpengalaman. Kirim foto dan dapatkan rekomendasi terbaik."
              onClick={() => onNavigate('chat')}
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl mb-4">Kenapa Memilih MotoDif?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard
              icon={<Shield className="size-6" />}
              title="Garansi & Kualitas"
              description="Semua sparepart dan pekerjaan dilindungi garansi resmi"
            />
            <BenefitCard
              icon={<Clock className="size-6" />}
              title="Tracking Real-Time"
              description="Pantau progres pengerjaan motor Anda kapan saja"
            />
            <BenefitCard
              icon={<Users className="size-6" />}
              title="Mekanik Profesional"
              description="Tim mekanik bersertifikat dengan pengalaman 10+ tahun"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600/10 to-red-700/10 border-y border-red-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl mb-4">Siap Mulai Project Motor Anda?</h2>
          <p className="text-zinc-400 mb-8">
            {isLoggedIn 
              ? 'Mulai konsultasi dengan mekanik kami sekarang'
              : 'Daftar sekarang dan dapatkan konsultasi gratis dengan mekanik profesional'
            }
          </p>
          <button
            onClick={() => onNavigate(isLoggedIn ? 'chat' : 'auth')}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-500 hover:to-red-600 transition-all inline-flex items-center gap-2 group"
          >
            {isLoggedIn ? 'Mulai Konsultasi' : 'Daftar Sekarang'}
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="p-8 bg-zinc-800/30 border border-zinc-700/50 rounded-xl hover:bg-zinc-800/50 hover:border-red-600/30 transition-all text-left group"
    >
      <div className="bg-gradient-to-br from-red-600/20 to-red-700/20 p-3 rounded-lg w-fit mb-4 group-hover:from-red-600/30 group-hover:to-red-700/30 transition-all">
        {icon}
      </div>
      <h3 className="text-xl mb-2">{title}</h3>
      <p className="text-zinc-400">{description}</p>
      <div className="flex items-center gap-2 mt-4 text-red-500 group-hover:gap-3 transition-all">
        <span className="text-sm">Selengkapnya</span>
        <ArrowRight className="size-4" />
      </div>
    </button>
  );
}

function BenefitCard({ icon, title, description }: any) {
  return (
    <div className="flex gap-4">
      <div className="bg-red-600/20 p-3 rounded-lg h-fit">
        {icon}
      </div>
      <div>
        <h3 className="mb-2">{title}</h3>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>
    </div>
  );
}
