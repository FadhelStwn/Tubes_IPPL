import { useState } from 'react';
import { Package, Wrench, CheckCircle, Clock, MapPin, Calendar, MessageSquare } from 'lucide-react';

interface OrderTrackingPageProps {
  user: any;
}

const MOCK_ORDERS = [
  {
    id: 'ORD001',
    type: 'modification',
    packageName: 'Street Fighter',
    motorcycle: 'Yamaha R15 V3',
    status: 'in_progress',
    progress: 60,
    startDate: new Date('2024-12-01'),
    estimatedCompletion: new Date('2024-12-15'),
    price: 5000000,
    timeline: [
      { status: 'ordered', label: 'Pesanan Diterima', date: new Date('2024-12-01'), completed: true },
      { status: 'preparing', label: 'Persiapan Part', date: new Date('2024-12-02'), completed: true },
      { status: 'in_progress', label: 'Pengerjaan', date: new Date('2024-12-05'), completed: false, current: true },
      { status: 'quality_check', label: 'Quality Check', date: null, completed: false },
      { status: 'completed', label: 'Selesai & Siap Diambil', date: null, completed: false },
    ],
    updates: [
      { date: new Date('2024-12-09'), message: 'Body minimalis sudah terpasang, lanjut ke cat custom' },
      { date: new Date('2024-12-07'), message: 'Knalpot aftermarket terpasang, suara lebih gahar!' },
      { date: new Date('2024-12-05'), message: 'Mulai pengerjaan custom headlight & stang' },
    ]
  },
  {
    id: 'ORD002',
    type: 'sparepart',
    items: [
      { name: 'Kampas Rem Depan Brembo', qty: 2, price: 250000 },
      { name: 'CDI Racing BRT', qty: 1, price: 650000 },
    ],
    motorcycle: 'Honda CBR250RR',
    status: 'completed',
    progress: 100,
    orderDate: new Date('2024-11-20'),
    completionDate: new Date('2024-11-22'),
    price: 1150000,
    timeline: [
      { status: 'ordered', label: 'Pesanan Diterima', date: new Date('2024-11-20'), completed: true },
      { status: 'preparing', label: 'Persiapan Part', date: new Date('2024-11-20'), completed: true },
      { status: 'ready', label: 'Siap Dipasang', date: new Date('2024-11-21'), completed: true },
      { status: 'installation', label: 'Pemasangan', date: new Date('2024-11-21'), completed: true },
      { status: 'completed', label: 'Selesai', date: new Date('2024-11-22'), completed: true },
    ],
  },
  {
    id: 'ORD003',
    type: 'modification',
    packageName: 'Racing Performance',
    motorcycle: 'Honda CBR250RR',
    status: 'pending',
    progress: 0,
    orderDate: new Date('2024-12-08'),
    estimatedStart: new Date('2024-12-16'),
    price: 12000000,
    timeline: [
      { status: 'ordered', label: 'Pesanan Diterima', date: new Date('2024-12-08'), completed: true },
      { status: 'waiting', label: 'Menunggu Slot', date: null, completed: false, current: true },
      { status: 'preparing', label: 'Persiapan Part', date: null, completed: false },
      { status: 'in_progress', label: 'Pengerjaan', date: null, completed: false },
      { status: 'completed', label: 'Selesai', date: null, completed: false },
    ],
  },
];

export function OrderTrackingPage({ user }: OrderTrackingPageProps) {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-500';
      case 'in_progress': return 'text-blue-500';
      case 'completed': return 'text-green-500';
      default: return 'text-zinc-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'in_progress': return 'Sedang Dikerjakan';
      case 'completed': return 'Selesai';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl mb-2">Pesanan Saya</h1>
          <p className="text-zinc-400">Pantau progres pesanan dan pengerjaan motor Anda</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400">Total Pesanan</span>
              <Package className="size-5 text-zinc-500" />
            </div>
            <p className="text-3xl">{MOCK_ORDERS.length}</p>
          </div>
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400">Sedang Dikerjakan</span>
              <Wrench className="size-5 text-blue-500" />
            </div>
            <p className="text-3xl">{MOCK_ORDERS.filter(o => o.status === 'in_progress').length}</p>
          </div>
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400">Selesai</span>
              <CheckCircle className="size-5 text-green-500" />
            </div>
            <p className="text-3xl">{MOCK_ORDERS.filter(o => o.status === 'completed').length}</p>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {MOCK_ORDERS.map(order => (
            <div
              key={order.id}
              className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-6 hover:border-red-600/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`size-12 rounded-lg flex items-center justify-center ${
                    order.type === 'modification' 
                      ? 'bg-gradient-to-br from-red-600/20 to-red-700/20' 
                      : 'bg-gradient-to-br from-blue-600/20 to-blue-700/20'
                  }`}>
                    {order.type === 'modification' ? (
                      <Wrench className="size-6 text-red-500" />
                    ) : (
                      <Package className="size-6 text-blue-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl">{order.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        order.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400' :
                        order.status === 'in_progress' ? 'bg-blue-600/20 text-blue-400' :
                        'bg-green-600/20 text-green-400'
                      }`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="text-zinc-400">
                      {order.type === 'modification' ? order.packageName : `${order.items?.length} item sparepart`} • {order.motorcycle}
                    </p>
                    <p className="text-sm text-zinc-500 mt-1">
                      {order.startDate && `Mulai: ${order.startDate.toLocaleDateString('id-ID')}`}
                      {order.orderDate && `Dipesan: ${order.orderDate.toLocaleDateString('id-ID')}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl text-red-500 mb-1">
                    Rp {order.price.toLocaleString('id-ID')}
                  </p>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    Lihat Detail →
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              {order.status !== 'completed' && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-zinc-400">Progress</span>
                    <span className="text-zinc-300">{order.progress}%</span>
                  </div>
                  <div className="h-2 bg-zinc-700/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-600 to-red-700 rounded-full transition-all"
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Timeline Preview */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {order.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2 flex-shrink-0">
                    <div className={`size-8 rounded-full flex items-center justify-center border-2 ${
                      step.completed ? 'bg-green-600/20 border-green-600' :
                      step.current ? 'bg-blue-600/20 border-blue-600 animate-pulse' :
                      'bg-zinc-800 border-zinc-700'
                    }`}>
                      {step.completed && <CheckCircle className="size-4 text-green-500" />}
                      {step.current && <Clock className="size-4 text-blue-500" />}
                    </div>
                    <span className={`text-xs whitespace-nowrap ${
                      step.completed ? 'text-green-500' :
                      step.current ? 'text-blue-500' :
                      'text-zinc-500'
                    }`}>
                      {step.label}
                    </span>
                    {idx < order.timeline.length - 1 && (
                      <div className={`w-8 h-0.5 ${step.completed ? 'bg-green-600' : 'bg-zinc-700'}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Latest Update */}
              {order.updates && order.updates.length > 0 && (
                <div className="mt-4 bg-zinc-900/50 border border-zinc-700/30 rounded-lg p-3 flex items-start gap-3">
                  <MessageSquare className="size-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-zinc-300">{order.updates[0].message}</p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {order.updates[0].date.toLocaleDateString('id-ID')} • Update terbaru
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-700 p-6 z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl mb-1">Detail Pesanan {selectedOrder.id}</h2>
                  <p className="text-zinc-400">{selectedOrder.motorcycle}</p>
                </div>
                <span className={`px-4 py-2 rounded-full ${
                  selectedOrder.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400' :
                  selectedOrder.status === 'in_progress' ? 'bg-blue-600/20 text-blue-400' :
                  'bg-green-600/20 text-green-400'
                }`}>
                  {getStatusLabel(selectedOrder.status)}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-zinc-800/50 p-4 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-1">
                    {selectedOrder.type === 'modification' ? 'Paket Modifikasi' : 'Sparepart'}
                  </p>
                  <p className="text-xl">
                    {selectedOrder.type === 'modification' 
                      ? selectedOrder.packageName 
                      : `${selectedOrder.items?.length} item`
                    }
                  </p>
                </div>
                <div className="bg-zinc-800/50 p-4 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-1">Total Biaya</p>
                  <p className="text-xl text-red-500">Rp {selectedOrder.price.toLocaleString('id-ID')}</p>
                </div>
                {selectedOrder.estimatedCompletion && (
                  <div className="bg-zinc-800/50 p-4 rounded-lg">
                    <p className="text-sm text-zinc-400 mb-1">Estimasi Selesai</p>
                    <p className="text-xl">{selectedOrder.estimatedCompletion.toLocaleDateString('id-ID')}</p>
                  </div>
                )}
                <div className="bg-zinc-800/50 p-4 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-1">Progress</p>
                  <p className="text-xl">{selectedOrder.progress}%</p>
                </div>
              </div>

              {/* Items (for sparepart orders) */}
              {selectedOrder.type === 'sparepart' && selectedOrder.items && (
                <div>
                  <h3 className="text-xl mb-3">Item Pesanan</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between bg-zinc-800/30 p-3 rounded-lg">
                        <div>
                          <p>{item.name}</p>
                          <p className="text-sm text-zinc-400">Qty: {item.qty}</p>
                        </div>
                        <p className="text-red-500">Rp {(item.price * item.qty).toLocaleString('id-ID')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div>
                <h3 className="text-xl mb-4">Timeline Pengerjaan</h3>
                <div className="space-y-4">
                  {selectedOrder.timeline.map((step: any, idx: number) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`size-10 rounded-full flex items-center justify-center border-2 ${
                          step.completed ? 'bg-green-600/20 border-green-600' :
                          step.current ? 'bg-blue-600/20 border-blue-600' :
                          'bg-zinc-800 border-zinc-700'
                        }`}>
                          {step.completed && <CheckCircle className="size-5 text-green-500" />}
                          {step.current && <Clock className="size-5 text-blue-500 animate-pulse" />}
                        </div>
                        {idx < selectedOrder.timeline.length - 1 && (
                          <div className={`w-0.5 flex-1 min-h-[40px] ${step.completed ? 'bg-green-600' : 'bg-zinc-700'}`} />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className={`mb-1 ${
                          step.completed ? 'text-green-500' :
                          step.current ? 'text-blue-500' :
                          'text-zinc-500'
                        }`}>
                          {step.label}
                        </h4>
                        {step.date && (
                          <p className="text-sm text-zinc-400 flex items-center gap-2">
                            <Calendar className="size-3" />
                            {step.date.toLocaleDateString('id-ID')}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Updates */}
              {selectedOrder.updates && (
                <div>
                  <h3 className="text-xl mb-4">Update Pengerjaan</h3>
                  <div className="space-y-3">
                    {selectedOrder.updates.map((update: any, idx: number) => (
                      <div key={idx} className="bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <MessageSquare className="size-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-zinc-300">{update.message}</p>
                            <p className="text-sm text-zinc-500 mt-2">
                              {update.date.toLocaleDateString('id-ID')} • {update.date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full px-6 py-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
