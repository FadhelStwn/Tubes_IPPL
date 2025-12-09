import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { SparepartPage } from './components/SparepartPage';
import { ModificationPage } from './components/ModificationPage';
import { ChatPage } from './components/ChatPage';
import { AuthPage } from './components/AuthPage';
import { ProfilePage } from './components/ProfilePage';
import { OrderTrackingPage } from './components/OrderTrackingPage';
import { NotificationsPage } from './components/NotificationsPage';
import { Navbar } from './components/Navbar';

type Page = 'home' | 'sparepart' | 'modification' | 'chat' | 'auth' | 'profile' | 'orders' | 'notifications';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'order', message: 'Pesanan #ORD001 sedang dalam pengerjaan', read: false, timestamp: new Date() },
    { id: 2, type: 'chat', message: 'Mekanik: Ada rekomendasi untuk motor Anda', read: false, timestamp: new Date() },
  ]);

  const handleLogin = (userData: any) => {
    setIsLoggedIn(true);
    setUser(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentPage('home');
  };

  const navigateToPage = (page: Page) => {
    // Protect certain pages
    if (!isLoggedIn && ['chat', 'profile', 'orders'].includes(page)) {
      setCurrentPage('auth');
      return;
    }
    setCurrentPage(page);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar 
        currentPage={currentPage}
        isLoggedIn={isLoggedIn}
        onNavigate={navigateToPage}
        onLogout={handleLogout}
        unreadCount={unreadCount}
      />
      
      <main>
        {currentPage === 'home' && <HomePage onNavigate={navigateToPage} isLoggedIn={isLoggedIn} />}
        {currentPage === 'sparepart' && <SparepartPage isLoggedIn={isLoggedIn} onNavigate={navigateToPage} />}
        {currentPage === 'modification' && <ModificationPage isLoggedIn={isLoggedIn} onNavigate={navigateToPage} />}
        {currentPage === 'chat' && <ChatPage user={user} />}
        {currentPage === 'auth' && <AuthPage onLogin={handleLogin} />}
        {currentPage === 'profile' && <ProfilePage user={user} onNavigate={navigateToPage} />}
        {currentPage === 'orders' && <OrderTrackingPage user={user} />}
        {currentPage === 'notifications' && (
          <NotificationsPage 
            notifications={notifications} 
            onMarkAsRead={(id) => {
              setNotifications(notifications.map(n => 
                n.id === id ? { ...n, read: true } : n
              ));
            }}
          />
        )}
      </main>
    </div>
  );
}
