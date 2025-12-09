import { Bell, Package, MessageSquare, CheckCircle, Trash2 } from 'lucide-react';

interface NotificationsPageProps {
  notifications: any[];
  onMarkAsRead: (id: number) => void;
}

export function NotificationsPage({ notifications, onMarkAsRead }: NotificationsPageProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="size-5 text-blue-500" />;
      case 'chat':
        return <MessageSquare className="size-5 text-green-500" />;
      case 'promo':
        return <Bell className="size-5 text-yellow-500" />;
      default:
        return <Bell className="size-5 text-zinc-500" />;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl mb-2">Notifikasi</h1>
          <p className="text-zinc-400">Update pesanan dan pesan terbaru</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-4">
            <p className="text-sm text-zinc-400 mb-1">Total</p>
            <p className="text-2xl">{notifications.length}</p>
          </div>
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-4">
            <p className="text-sm text-zinc-400 mb-1">Belum Dibaca</p>
            <p className="text-2xl text-red-500">{notifications.filter(n => !n.read).length}</p>
          </div>
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-4">
            <p className="text-sm text-zinc-400 mb-1">Sudah Dibaca</p>
            <p className="text-2xl text-green-500">{notifications.filter(n => n.read).length}</p>
          </div>
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="size-20 mx-auto bg-zinc-800/50 rounded-full flex items-center justify-center mb-4">
              <Bell className="size-10 text-zinc-600" />
            </div>
            <h3 className="text-xl mb-2">Tidak Ada Notifikasi</h3>
            <p className="text-zinc-400">Notifikasi Anda akan muncul di sini</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`bg-zinc-800/30 border rounded-xl p-4 transition-all ${
                  notification.read 
                    ? 'border-zinc-700/50' 
                    : 'border-red-600/30 bg-red-600/5'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`size-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    notification.type === 'order' ? 'bg-blue-600/20' :
                    notification.type === 'chat' ? 'bg-green-600/20' :
                    'bg-yellow-600/20'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <p className={notification.read ? 'text-zinc-300' : 'text-white'}>
                          {notification.message}
                        </p>
                        <p className="text-sm text-zinc-500 mt-1">
                          {notification.timestamp.toLocaleDateString('id-ID')} • {notification.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="size-2 bg-red-500 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>

                    <div className="flex gap-2 mt-3">
                      {!notification.read && (
                        <button
                          onClick={() => onMarkAsRead(notification.id)}
                          className="px-3 py-1.5 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors text-sm flex items-center gap-2"
                        >
                          <CheckCircle className="size-4" />
                          Tandai Dibaca
                        </button>
                      )}
                      <button className="px-3 py-1.5 bg-zinc-700/50 rounded-lg hover:bg-zinc-700 transition-colors text-sm flex items-center gap-2 text-zinc-400 hover:text-red-400">
                        <Trash2 className="size-4" />
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mark all as read */}
        {notifications.filter(n => !n.read).length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => notifications.forEach(n => !n.read && onMarkAsRead(n.id))}
              className="px-6 py-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-sm"
            >
              Tandai Semua Sebagai Dibaca
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
