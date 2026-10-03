import React, { useState } from 'react';
import { Bus, User, LogOut, Ticket, Tag, Menu, X, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types/bus';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  bookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  currentUser,
  onOpenAuth,
  onLogout,
  bookingsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'search', label: 'Search Buses' },
    { id: 'bookings', label: 'My Bookings', badge: bookingsCount > 0 ? bookingsCount : undefined },
    { id: 'offers', label: 'Offers' },
    { id: 'help', label: 'Help' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-hidden cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-tight text-blue-900 font-heading">
              Bus<span className="text-blue-600">Go</span>
            </span>
            <span className="hidden sm:block text-[10px] text-slate-500 font-medium tracking-wide uppercase">
              Fast & Safe Travel
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative py-1.5 transition-colors flex items-center gap-1.5 focus:outline-hidden cursor-pointer ${
                  isActive
                    ? 'text-blue-600 font-bold'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                <span>{link.label}</span>
                {link.badge !== undefined && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-100 text-blue-700">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right side Auth / User Profile */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50/80 hover:bg-blue-50/50 transition-all text-left focus:outline-hidden cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs font-bold text-slate-800 leading-tight">
                    {currentUser.name.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-blue-600 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>{currentUser.tier} Member</span>
                  </div>
                </div>
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-800 truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                  </div>

                  <button
                    onClick={() => handleLinkClick('profile')}
                    className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-blue-500" />
                    <span>My Profile</span>
                  </button>

                  <button
                    onClick={() => handleLinkClick('bookings')}
                    className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Ticket className="w-3.5 h-3.5 text-blue-500" />
                    <span>My Tickets</span>
                  </button>

                  <button
                    onClick={() => handleLinkClick('offers')}
                    className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Tag className="w-3.5 h-3.5 text-amber-500" />
                    <span>My Offers</span>
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    onClick={() => {
                      onLogout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-xl transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-left transition-colors cursor-pointer ${
                activeTab === link.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{link.label}</span>
              {link.badge !== undefined && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-blue-100 text-blue-700">
                  {link.badge}
                </span>
              )}
            </button>
          ))}

          {currentUser && (
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => handleLinkClick('profile')}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl cursor-pointer"
              >
                <User className="w-4 h-4 text-blue-500" />
                <span>My Profile</span>
              </button>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
