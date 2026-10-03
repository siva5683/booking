import React from 'react';
import { Bus, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onSelectRoute: (from: string, to: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectRoute }) => {
  return (
    <footer className="no-print bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Bus className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold font-heading text-white tracking-tight">
                Bus<span className="text-blue-500">Go</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              "Making bus travel simple, affordable, and convenient." Book intercity sleeper, AC, and luxury buses across India in seconds with verified digital tickets.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Official Government Authorized Bus Booking Partner</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('search')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Search Buses
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('bookings')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  My Bookings
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('offers')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Discount Offers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('help')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Help & FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Top Routes */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Top Routes
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                ['Chennai', 'Bangalore'],
                ['Bangalore', 'Hyderabad'],
                ['Chennai', 'Coimbatore'],
                ['Mumbai', 'Pune'],
                ['Delhi', 'Jaipur'],
              ].map(([from, to]) => (
                <li key={`${from}-${to}`}>
                  <button
                    type="button"
                    onClick={() => onSelectRoute(from, to)}
                    className="hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    {from} to {to}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('help')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('help')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('help')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Cancellation Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('help')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Refund Guidelines
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('help')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Passenger Safety Standards
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BusGo Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Crafted for safe journeys across India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
