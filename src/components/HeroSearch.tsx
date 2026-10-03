import React, { useState } from 'react';
import {
  MapPin,
  ArrowRightLeft,
  Calendar,
  Users,
  Search,
  CheckCircle2,
  ShieldCheck,
  Headphones,
  Award,
  Bus,
} from 'lucide-react';
import { CITIES, POPULAR_ROUTES } from '../data/mockBusData';
import { SearchState } from '../types/bus';

interface HeroSearchProps {
  searchState: SearchState;
  onSearchChange: (newState: Partial<SearchState>) => void;
  onExecuteSearch: () => void;
  onSelectRoute: (from: string, to: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchState,
  onSearchChange,
  onExecuteSearch,
  onSelectRoute,
}) => {
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);

  const handleSwap = () => {
    onSearchChange({
      from: searchState.to,
      to: searchState.from,
    });
  };

  const filteredFromCities = CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchState.from.toLowerCase()) &&
      c.name.toLowerCase() !== searchState.to.toLowerCase()
  );

  const filteredToCities = CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchState.to.toLowerCase()) &&
      c.name.toLowerCase() !== searchState.from.toLowerCase()
  );

  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white">
      {/* Background travel backdrop elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Title & Subheading */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-blue-200 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Over 3,500+ Verified Bus Operators Across India
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-[1.15] mb-4">
            Travel Anywhere.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-amber-300">
              Book Your Bus in Seconds.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Find comfortable and affordable buses for your next journey. Zero booking fees, instant digital tickets, and 24/7 verified travel assistance.
          </p>
        </div>

        {/* Prominent Bus Search Box */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-100 text-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* From City */}
            <div className="relative md:col-span-3">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                From
              </label>
              <div className="relative flex items-center">
                <MapPin className="absolute left-3 w-4 h-4 text-blue-600 shrink-0" />
                <input
                  type="text"
                  placeholder="Departure city"
                  value={searchState.from}
                  onChange={(e) => {
                    onSearchChange({ from: e.target.value });
                    setShowFromDropdown(true);
                  }}
                  onFocus={() => setShowFromDropdown(true)}
                  className="w-full pl-9 pr-3 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-blue-600 rounded-xl text-sm font-bold text-slate-900 focus:outline-hidden transition-all placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>

              {/* From Autocomplete Dropdown */}
              {showFromDropdown && (
                <div className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 max-h-56 overflow-y-auto">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase">
                    Popular Cities
                  </div>
                  {filteredFromCities.map((city) => (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => {
                        onSearchChange({ from: city.name });
                        setShowFromDropdown(false);
                      }}
                      className="w-full px-3 py-2 text-left text-xs font-semibold hover:bg-blue-50 text-slate-700 flex items-center justify-between cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-500" />
                        {city.name}
                      </span>
                      <span className="text-[10px] text-slate-400">{city.state}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Swap Button */}
            <div className="flex justify-center md:col-span-1">
              <button
                type="button"
                onClick={handleSwap}
                title="Swap From and To"
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-400 flex items-center justify-center text-blue-600 transition-all hover:rotate-180 duration-300 shadow-xs cursor-pointer"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* To City */}
            <div className="relative md:col-span-3">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                To
              </label>
              <div className="relative flex items-center">
                <MapPin className="absolute left-3 w-4 h-4 text-emerald-600 shrink-0" />
                <input
                  type="text"
                  placeholder="Destination city"
                  value={searchState.to}
                  onChange={(e) => {
                    onSearchChange({ to: e.target.value });
                    setShowToDropdown(true);
                  }}
                  onFocus={() => setShowToDropdown(true)}
                  className="w-full pl-9 pr-3 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-blue-600 rounded-xl text-sm font-bold text-slate-900 focus:outline-hidden transition-all placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>

              {/* To Autocomplete Dropdown */}
              {showToDropdown && (
                <div className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 max-h-56 overflow-y-auto">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase">
                    Popular Destinations
                  </div>
                  {filteredToCities.map((city) => (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => {
                        onSearchChange({ to: city.name });
                        setShowToDropdown(false);
                      }}
                      className="w-full px-3 py-2 text-left text-xs font-semibold hover:bg-blue-50 text-slate-700 flex items-center justify-between cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                        {city.name}
                      </span>
                      <span className="text-[10px] text-slate-400">{city.state}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Journey Date */}
            <div className="relative md:col-span-2">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Journey Date
              </label>
              <div className="relative flex items-center">
                <Calendar className="absolute left-3 w-4 h-4 text-blue-600 shrink-0 pointer-events-none" />
                <input
                  type="date"
                  value={searchState.date}
                  onChange={(e) => onSearchChange({ date: e.target.value })}
                  className="w-full pl-9 pr-2.5 py-3 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-blue-600 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-hidden transition-all cursor-pointer"
                />
              </div>
            </div>

            {/* Passengers Selector */}
            <div className="relative md:col-span-1">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Seats
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                  className="w-full py-3 px-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 focus:border-blue-600 rounded-xl text-xs sm:text-sm font-bold text-slate-900 flex items-center justify-between transition-all cursor-pointer"
                >
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    {searchState.passengersCount}
                  </span>
                </button>

                {showPassengerDropdown && (
                  <div className="absolute right-0 top-full mt-1.5 w-36 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 px-1">
                      Passengers
                    </p>
                    <div className="grid grid-cols-3 gap-1">
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => {
                            onSearchChange({ passengersCount: num });
                            setShowPassengerDropdown(false);
                          }}
                          className={`py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            searchState.passengersCount === num
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-50 text-slate-700 hover:bg-blue-50'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Buses Button */}
            <div className="md:col-span-2 pt-2 md:pt-4">
              <button
                type="button"
                onClick={onExecuteSearch}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search Buses</span>
              </button>
            </div>
          </div>
        </div>

        {/* Popular Routes Section */}
        <div className="max-w-5xl mx-auto mt-8">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs text-blue-100">
            <span className="font-semibold text-sky-200 mr-1 flex items-center gap-1">
              <Bus className="w-3.5 h-3.5" /> Popular Routes:
            </span>
            {POPULAR_ROUTES.map((rt) => (
              <button
                key={`${rt.from}-${rt.to}`}
                type="button"
                onClick={() => onSelectRoute(rt.from, rt.to)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white hover:text-amber-300 font-medium transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>
                  {rt.from} → {rt.to}
                </span>
                <span className="text-[10px] text-sky-300 font-semibold">from ₹{rt.startingPrice}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-14 pt-8 border-t border-white/10 text-center">
          <div className="flex flex-col items-center gap-1 p-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sky-300 mb-1">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-white">20 Million+</span>
            <span className="text-xs text-blue-200">Happy Bus Travelers</span>
          </div>

          <div className="flex flex-col items-center gap-1 p-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sky-300 mb-1">
              <Bus className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-white">3,500+ Operators</span>
            <span className="text-xs text-blue-200">Across 100,000+ Routes</span>
          </div>

          <div className="flex flex-col items-center gap-1 p-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sky-300 mb-1">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-white">Instant Refund</span>
            <span className="text-xs text-blue-200">Hassle-Free Cancellations</span>
          </div>

          <div className="flex flex-col items-center gap-1 p-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sky-300 mb-1">
              <Headphones className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-white">24/7 Road Support</span>
            <span className="text-xs text-blue-200">Live GPS Bus Tracking</span>
          </div>
        </div>
      </div>
    </section>
  );
};
