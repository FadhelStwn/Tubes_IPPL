import { useState } from 'react';
import { Check, Zap, Crown, Sparkles, ChevronRight } from 'lucide-react';

interface ModificationPageProps {
  isLoggedIn: boolean;
  onNavigate: (page: string) => void;
}

const MODIFICATION_PACKAGES = [
  {
    id: 1,
    name: 'Street Fighter',
    category: 'Style',
    price: 5000000,
    duration: '5-7 hari',
    level: 'Pemula',
    description: 'Ubah motor Anda menjadi street fighter dengan tampilan agresif dan sporty',
    features: [
      'Custom headlight & stang',
      'Body minimalis',
      'Knalpot aftermarket',
      'Velg & ban upgrade',
      'Cat custom 1 warna',
    ],
    image: 'street-fighter',
    popular: true,
  },
  {
    id: 2,
    name: 'Racing Performance',
    category: 'Performance',
    price: 12000000,
    duration: '10-14 hari',
    level: 'Menengah',
    description: 'Tingkatkan performa motor hingga level racing dengan upgrade mesin dan suspensi',
    features: [
      'Bore up kit premium',
      'Karburator racing + CDI',
      'Kopling racing',
      'Knalpot full system racing',
      'Suspensi adjustable',
      'Rem upgrade (disk depan-belakang)',
    ],
    image: 'racing',
    popular: false,
  },
  {
    id: 3,
    name: 'Cafe Racer Classic',
    category: 'Style',
    price: 8500000,
    duration: '7-10 hari',
    level: 'Menengah',
    description: 'Gaya klasik yang timeless dengan sentuhan modern',
    features: [
      'Tangki custom cafe racer',
      'Jok single seat custom',
      'Stang clip-on',
      'Lampu bulat retro',
      'Cat classic 2 tone',
      'Velg spoke',
    ],
    image: 'cafe-racer',
    popular: true,
  },
  {
    id: 4,
    name: 'Full Custom Build',
    category: 'Custom',
    price: 25000000,
    duration: '21-30 hari',
    level: 'Profesional',
    description: 'Build motor dari nol sesuai konsep Anda - unlimited customization',
    features: [
      'Konsultasi desain unlimited',
      'Frame modifikasi/custom',
      'Mesin custom spec',
      'Body full custom fabrication',
      'Cat airbrush artwork',
      'Electrical rewiring',
      'Custom exhaust handmade',
      'Garansi 1 tahun',
    ],
    image: 'full-custom',
    popular: false,
  },
  {
    id: 5,
    name: 'Scrambler Adventure',
    category: 'Style',
    price: 9500000,
    duration: '8-12 hari',
    level: 'Menengah',
    description: 'Siap petualangan dengan gaya scrambler yang tangguh',
    features: [
      'Ban dual purpose',
      'Suspense travel tinggi',
      'Crash bar & engine guard',
      'Lampu LED auxiliary',
      'Knalpot high mount',
      'Jok adventure custom',
    ],
    image: 'scrambler',
    popular: false,
  },
  {
    id: 6,
    name: 'Touring Comfort',
    category: 'Comfort',
    price: 6500000,
    duration: '5-7 hari',
    level: 'Pemula',
    description: 'Kenyamanan maksimal untuk perjalanan jarak jauh',
    features: [
      'Jok comfort extra padding',
      'Windshield aero',
      'Side bag bracket',
      'USB charger mount',
      'Handlebar riser',
      'Foot peg relocation',
    ],
    image: 'touring',
    popular: false,
  },
];

export function ModificationPage({ isLoggedIn, onNavigate }: ModificationPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const categories = ['Semua', 'Style', 'Performance', 'Comfort', 'Custom'];

  const filteredPackages = MODIFICATION_PACKAGES.filter(pkg => 
    selectedCategory === 'Semua' || pkg.category === selectedCategory
  );

  const handleOrder = (pkg: any) => {
    if (!isLoggedIn) {
      onNavigate('auth');
      return;
    }
    // In real app, this would add to cart or start order flow
    setSelectedPackage(pkg);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl lg:text-4xl mb-2">Paket Modifikasi Motor</h1>
          <p className="text-zinc-400">Pilih paket yang sesuai dengan gaya dan kebutuhan Anda</p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-thin justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-red-600 text-white'
                  : 'bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map(pkg => (
            <div
              key={pkg.id}
              className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl overflow-hidden hover:border-red-600/30 transition-all group relative"
            >
              {pkg.popular && (
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-600 to-yellow-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Crown className="size-4" />
                  Popular
                </div>
              )}

              <div className="aspect-video bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center p-8 border-b border-zinc-700/50">
                <div className="text-center">
                  <div className="size-24 mx-auto bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-xl flex items-center justify-center mb-3">
                    <Sparkles className="size-12 text-red-500" />
                  </div>
                  <span className="text-xs px-3 py-1 bg-zinc-800 rounded-full">{pkg.category}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl mb-1">{pkg.name}</h3>
                    <p className="text-sm text-zinc-400">{pkg.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-zinc-400">
                  <span className="flex items-center gap-1">
                    <div className="size-2 bg-green-500 rounded-full" />
                    {pkg.duration}
                  </span>
                  <span className={`px-2 py-0.5 rounded ${
                    pkg.level === 'Pemula' ? 'bg-green-600/20 text-green-400' :
                    pkg.level === 'Menengah' ? 'bg-yellow-600/20 text-yellow-400' :
                    'bg-red-600/20 text-red-400'
                  }`}>
                    {pkg.level}
                  </span>
                </div>

                <div className="text-2xl text-red-500 mb-4">
                  Rp {pkg.price.toLocaleString('id-ID')}
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-sm text-zinc-400 mb-2">Termasuk:</p>
                  {pkg.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-zinc-300">{feature}</span>
                    </div>
                  ))}
                  {pkg.features.length > 4 && (
                    <button
                      onClick={() => setSelectedPackage(pkg)}
                      className="text-sm text-red-500 hover:text-red-400 transition-colors flex items-center gap-1"
                    >
                      +{pkg.features.length - 4} fitur lainnya
                      <ChevronRight className="size-4" />
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedPackage(pkg)}
                    className="flex-1 px-4 py-3 bg-zinc-700/50 rounded-lg hover:bg-zinc-700 transition-colors"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => handleOrder(pkg)}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-500 hover:to-red-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="size-4" />
                    Pesan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Consultation CTA */}
        <div className="mt-12 bg-gradient-to-r from-red-600/10 to-red-700/10 border border-red-600/20 rounded-xl p-8 text-center">
          <h3 className="text-2xl mb-2">Punya Konsep Custom Sendiri?</h3>
          <p className="text-zinc-400 mb-6">
            Konsultasikan ide modifikasi Anda dengan mekanik profesional kami
          </p>
          <button
            onClick={() => onNavigate('chat')}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-500 hover:to-red-600 transition-all inline-flex items-center gap-2"
          >
            Mulai Konsultasi Gratis
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPackage(null)}>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-700 p-6 z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl mb-1">{selectedPackage.name}</h2>
                  <p className="text-zinc-400">{selectedPackage.description}</p>
                </div>
                {selectedPackage.popular && (
                  <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <Crown className="size-4" />
                    Popular
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center">
                <div className="size-32 bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="size-20 text-red-500" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-zinc-800/50 p-4 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-1">Harga Paket</p>
                  <p className="text-xl text-red-500">Rp {selectedPackage.price.toLocaleString('id-ID')}</p>
                </div>
                <div className="bg-zinc-800/50 p-4 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-1">Durasi</p>
                  <p className="text-xl">{selectedPackage.duration}</p>
                </div>
                <div className="bg-zinc-800/50 p-4 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-1">Level</p>
                  <p className="text-xl">{selectedPackage.level}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl mb-4">Fitur Lengkap Paket</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedPackage.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-zinc-800/30 rounded-lg">
                      <Check className="size-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                <h4 className="mb-2 flex items-center gap-2">
                  <Sparkles className="size-5 text-blue-400" />
                  Keuntungan Memesan Paket
                </h4>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <Check className="size-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    Harga lebih hemat dibanding custom satuan
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="size-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    Garansi pekerjaan dan part
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="size-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    Konsultasi gratis dengan mekanik
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="size-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    Progress tracking real-time
                  </li>
                </ul>
              </div>

              <div className="flex gap-3 pt-4 border-t border-zinc-700">
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="flex-1 px-6 py-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    handleOrder(selectedPackage);
                    setSelectedPackage(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-500 hover:to-red-600 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="size-5" />
                  Pesan Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
