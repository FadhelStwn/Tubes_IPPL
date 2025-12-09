import { useState } from 'react';
import { Search, Filter, ShoppingCart, Check } from 'lucide-react';

interface SparepartPageProps {
  isLoggedIn: boolean;
  onNavigate: (page: string) => void;
}

const CATEGORIES = ['Semua', 'Mesin', 'Body', 'Elektrik', 'Rem', 'Suspensi', 'Knalpot'];

const SPAREPARTS = [
  { id: 1, name: 'Kampas Rem Depan', category: 'Rem', brand: 'Brembo', price: 250000, stock: 15, compatible: ['Honda CBR', 'Yamaha R15', 'Kawasaki Ninja'], image: 'brake-pad', condition: 'Original' },
  { id: 2, name: 'Knalpot Racing Titanium', category: 'Knalpot', brand: 'Akrapovic', price: 3500000, stock: 5, compatible: ['Yamaha R25', 'Kawasaki Ninja 250'], image: 'exhaust', condition: 'Aftermarket' },
  { id: 3, name: 'Karburator PE28', category: 'Mesin', brand: 'Keihin', price: 850000, stock: 8, compatible: ['Honda Sonic', 'Yamaha Jupiter'], image: 'carburetor', condition: 'Original' },
  { id: 4, name: 'Shock Belakang Adjustable', category: 'Suspensi', brand: 'Ohlins', price: 4200000, stock: 3, compatible: ['Honda CBR250RR', 'Yamaha R25'], image: 'shock', condition: 'Aftermarket' },
  { id: 5, name: 'CDI Racing Unlimited', category: 'Elektrik', brand: 'BRT', price: 650000, stock: 12, compatible: ['Honda Vario', 'Yamaha Aerox', 'Honda Beat'], image: 'cdi', condition: 'Aftermarket' },
  { id: 6, name: 'Body Fairing Full Set', category: 'Body', brand: 'OEM', price: 2800000, stock: 4, compatible: ['Yamaha R15 V3'], image: 'fairing', condition: 'Original' },
  { id: 7, name: 'Piston Kit 58mm', category: 'Mesin', brand: 'Takegawa', price: 1200000, stock: 7, compatible: ['Honda Supra GTR', 'Honda Sonic'], image: 'piston', condition: 'Aftermarket' },
  { id: 8, name: 'Master Rem Radial', category: 'Rem', brand: 'Nissin', price: 1800000, stock: 6, compatible: ['Honda CBR', 'Kawasaki Ninja', 'Yamaha R25'], image: 'brake-master', condition: 'Original' },
];

export function SparepartPage({ isLoggedIn, onNavigate }: SparepartPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<number[]>([]);
  const [selectedPart, setSelectedPart] = useState<any>(null);

  const filteredParts = SPAREPARTS.filter(part => {
    const matchesCategory = selectedCategory === 'Semua' || part.category === selectedCategory;
    const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         part.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         part.compatible.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const addToCart = (id: number) => {
    if (!isLoggedIn) {
      onNavigate('auth');
      return;
    }
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item !== id));
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl mb-2">Katalog Sparepart</h1>
          <p className="text-zinc-400">Temukan sparepart yang kompatibel dengan motor Anda</p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Cari sparepart atau motor Anda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-600/50 transition-colors"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-zinc-400">
            Menampilkan {filteredParts.length} sparepart
          </p>
          {cart.length > 0 && (
            <button
              onClick={() => onNavigate('orders')}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              <ShoppingCart className="size-5" />
              <span>{cart.length} item</span>
            </button>
          )}
        </div>

        {/* Parts Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredParts.map(part => (
            <div
              key={part.id}
              className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl overflow-hidden hover:border-red-600/30 transition-all group"
            >
              <div className="aspect-square bg-zinc-900/50 flex items-center justify-center p-6 border-b border-zinc-700/50">
                <div className="text-center">
                  <div className="size-20 mx-auto bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-lg flex items-center justify-center mb-3">
                    <Filter className="size-10 text-red-500" />
                  </div>
                  <span className="text-xs text-zinc-500">{part.category}</span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="mb-1">{part.name}</h3>
                    <p className="text-sm text-zinc-400">{part.brand}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    part.condition === 'Original' 
                      ? 'bg-blue-600/20 text-blue-400' 
                      : 'bg-purple-600/20 text-purple-400'
                  }`}>
                    {part.condition}
                  </span>
                </div>

                <div className="text-xl text-red-500 mb-3">
                  Rp {part.price.toLocaleString('id-ID')}
                </div>

                <button
                  onClick={() => setSelectedPart(part)}
                  className="text-sm text-zinc-400 hover:text-white transition-colors mb-3"
                >
                  Kompatibel: {part.compatible.slice(0, 2).join(', ')}
                  {part.compatible.length > 2 && ' +' + (part.compatible.length - 2)}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedPart(part)}
                    className="flex-1 px-4 py-2 bg-zinc-700/50 rounded-lg hover:bg-zinc-700 transition-colors text-sm"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => cart.includes(part.id) ? removeFromCart(part.id) : addToCart(part.id)}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 ${
                      cart.includes(part.id)
                        ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {cart.includes(part.id) ? (
                      <>
                        <Check className="size-4" />
                        Ditambahkan
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="size-4" />
                        Pesan
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-3 text-xs text-zinc-500">
                  Stok: {part.stock} unit
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPart && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPart(null)}>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl mb-4">{selectedPart.name}</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="aspect-square bg-zinc-800/50 rounded-lg flex items-center justify-center mb-4">
                  <div className="size-32 bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-lg flex items-center justify-center">
                    <Filter className="size-20 text-red-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Brand</p>
                  <p>{selectedPart.brand}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Kategori</p>
                  <p>{selectedPart.category}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Kondisi</p>
                  <p>{selectedPart.condition}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Harga</p>
                  <p className="text-2xl text-red-500">Rp {selectedPart.price.toLocaleString('id-ID')}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Stok</p>
                  <p>{selectedPart.stock} unit tersedia</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-zinc-400 mb-2">Kompatibel dengan:</p>
              <div className="flex flex-wrap gap-2">
                {selectedPart.compatible.map((motor: string) => (
                  <span key={motor} className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-lg text-sm">
                    {motor}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedPart(null)}
                className="flex-1 px-6 py-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  if (cart.includes(selectedPart.id)) {
                    removeFromCart(selectedPart.id);
                  } else {
                    addToCart(selectedPart.id);
                  }
                  setSelectedPart(null);
                }}
                className={`flex-1 px-6 py-3 rounded-lg transition-colors ${
                  cart.includes(selectedPart.id)
                    ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {cart.includes(selectedPart.id) ? 'Hapus dari Keranjang' : 'Tambah ke Keranjang'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
