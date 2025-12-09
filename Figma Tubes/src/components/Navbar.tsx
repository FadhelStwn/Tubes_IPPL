import { Menu, X, Bell, User, LogOut, Wrench } from 'lucide-react';
import { useState } from 'react';

type Page = 'home' | 'sparepart' | 'modification' | 'chat' | 'auth' | 'profile' | 'orders' | 'notifications';

interface NavbarProps {
  currentPage: Page;
  isLoggedIn: boolean;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  unreadCount: number;
}

export function Navbar({ currentPage, isLoggedIn, onNavigate, onLogout, unreadCount }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-zinc-900 border-b border-red-600/20 sticky top-0 z-50 backdrop-blur-lg bg-zinc-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 group"
          >
            <div className="bg-gradient-to-br from-red-600 to-red-700 p-2 rounded-lg group-hover:from-red-500 group-hover:to-red-600 transition-all">
              <Wrench className="size-6" />
            </div>
            <span className="tracking-tight bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              MotoDif
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <NavButton 
              active={currentPage === 'sparepart'} 
              onClick={() => onNavigate('sparepart')}
            >
              Sparepart
            </NavButton>
            <NavButton 
              active={currentPage === 'modification'} 
              onClick={() => onNavigate('modification')}
            >
              Modifikasi
            </NavButton>
            <NavButton 
              active={currentPage === 'chat'} 
              onClick={() => onNavigate('chat')}
            >
              Konsultasi
            </NavButton>
            {isLoggedIn && (
              <NavButton 
                active={currentPage === 'orders'} 
                onClick={() => onNavigate('orders')}
              >
                Pesanan Saya
              </NavButton>
            )}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => onNavigate('notifications')}
                  className="relative p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <Bell className="size-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs size-5 rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => onNavigate('profile')}
                  className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <User className="size-5" />
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <LogOut className="size-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => onNavigate('auth')}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-500 hover:to-red-600 transition-all"
              >
                Masuk / Daftar
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-900">
          <div className="px-4 py-2 space-y-1">
            <MobileNavButton 
              active={currentPage === 'sparepart'} 
              onClick={() => {
                onNavigate('sparepart');
                setMobileMenuOpen(false);
              }}
            >
              Sparepart
            </MobileNavButton>
            <MobileNavButton 
              active={currentPage === 'modification'} 
              onClick={() => {
                onNavigate('modification');
                setMobileMenuOpen(false);
              }}
            >
              Modifikasi
            </MobileNavButton>
            <MobileNavButton 
              active={currentPage === 'chat'} 
              onClick={() => {
                onNavigate('chat');
                setMobileMenuOpen(false);
              }}
            >
              Konsultasi
            </MobileNavButton>
            {isLoggedIn && (
              <>
                <MobileNavButton 
                  active={currentPage === 'orders'} 
                  onClick={() => {
                    onNavigate('orders');
                    setMobileMenuOpen(false);
                  }}
                >
                  Pesanan Saya
                </MobileNavButton>
                <MobileNavButton 
                  active={currentPage === 'notifications'} 
                  onClick={() => {
                    onNavigate('notifications');
                    setMobileMenuOpen(false);
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    Notifikasi
                    {unreadCount > 0 && (
                      <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </MobileNavButton>
                <MobileNavButton 
                  active={currentPage === 'profile'} 
                  onClick={() => {
                    onNavigate('profile');
                    setMobileMenuOpen(false);
                  }}
                >
                  Profil
                </MobileNavButton>
                <MobileNavButton onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}>
                  Keluar
                </MobileNavButton>
              </>
            )}
            {!isLoggedIn && (
              <MobileNavButton 
                onClick={() => {
                  onNavigate('auth');
                  setMobileMenuOpen(false);
                }}
              >
                Masuk / Daftar
              </MobileNavButton>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavButton({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-colors ${
        active 
          ? 'bg-red-600/20 text-red-500' 
          : 'hover:bg-zinc-800 text-zinc-300'
      }`}
    >
      {children}
    </button>
  );
}

function MobileNavButton({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
        active 
          ? 'bg-red-600/20 text-red-500' 
          : 'hover:bg-zinc-800 text-zinc-300'
      }`}
    >
      {children}
    </button>
  );
}
