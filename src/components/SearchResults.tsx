import React, { useState, useMemo } from 'react';
import {
  Bus as BusIcon,
  SlidersHorizontal,
  ArrowUpDown,
  Star,
  Wifi,
  Zap,
  Coffee,
  Shield,
  Navigation,
  Tv,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  Filter,
} from 'lucide-react';
import { Bus, Seat, BoardingPoint, DroppingPoint, SearchState } from '../types/bus';
import { SeatSelection } from './SeatSelection';

interface SearchResultsProps {
  buses: Bus[];
  searchState: SearchState;
  onModifySearch: () => void;
  onProceedToPassengerDetails: (bus: Bus, seats: Seat[], bp: BoardingPoint, dp: DroppingPoint) => void;
}

export type SortType = 'recommended' | 'cheapest' | 'fastest' | 'earliest' | 'highest_rated';

export const SearchResults: React.FC<SearchResultsProps> = ({
  buses,
  searchState,
  onModifySearch,
  onProceedToPassengerDetails,
}) => {
  // Expanded bus card for seat selection
  const [activeBusId, setActiveBusId] = useState<string | null>(buses[0]?.id || null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState<BoardingPoint>(
    buses[0]?.boardingPoints[0] || ({} as BoardingPoint)
  );
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState<DroppingPoint>(
    buses[0]?.droppingPoints[0] || ({} as DroppingPoint)
  );

  // Filter States
  const [filterBusTypes, setFilterBusTypes] = useState<string[]>([]);
  const [filterDepartureTime, setFilterDepartureTime] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [filterOperators, setFilterOperators] = useState<string[]>([]);
  const [filterAmenities, setFilterAmenities] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortType>('recommended');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Available operators from data
  const operators = useMemo(() => Array.from(new Set(buses.map((b) => b.operatorName))), [buses]);

  // Handle Seat Toggle
  const handleToggleSeat = (seat: Seat) => {
    if (selectedSeats.some((s) => s.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else {
      if (selectedSeats.length >= 6) {
        alert('You can select a maximum of 6 seats at a time.');
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleOpenSeats = (bus: Bus) => {
    if (activeBusId === bus.id) {
      setActiveBusId(null);
    } else {
      setActiveBusId(bus.id);
      setSelectedSeats([]);
      setSelectedBoardingPoint(bus.boardingPoints[0]);
      setSelectedDroppingPoint(bus.droppingPoints[0]);
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setFilterBusTypes([]);
    setFilterDepartureTime([]);
    setMaxPrice(1500);
    setFilterOperators([]);
    setFilterAmenities([]);
  };

  // Filter and Sort Pipeline
  const filteredBuses = useMemo(() => {
    let result = [...buses];

    // Filter bus category / AC
    if (filterBusTypes.length > 0) {
      result = result.filter((b) => {
        return filterBusTypes.some((type) => {
          if (type === 'AC') return b.isAc;
          if (type === 'Non-AC') return !b.isAc;
          if (type === 'Sleeper') return b.category === 'Sleeper';
          if (type === 'Semi-Sleeper') return b.category === 'Semi-Sleeper';
          if (type === 'Seater') return b.category === 'Seater';
          return false;
        });
      });
    }

    // Departure time filters
    if (filterDepartureTime.length > 0) {
      result = result.filter((b) => {
        return filterDepartureTime.some((slot) => {
          if (slot === 'before_6am') return b.departureTime24 < 6;
          if (slot === '6am_12pm') return b.departureTime24 >= 6 && b.departureTime24 < 12;
          if (slot === '12pm_6pm') return b.departureTime24 >= 12 && b.departureTime24 < 18;
          if (slot === 'after_6pm') return b.departureTime24 >= 18;
          return false;
        });
      });
    }

    // Price filter
    result = result.filter((b) => b.price <= maxPrice);

    // Operator filter
    if (filterOperators.length > 0) {
      result = result.filter((b) => filterOperators.includes(b.operatorName));
    }

    // Amenities filter
    if (filterAmenities.length > 0) {
      result = result.filter((b) => filterAmenities.every((amen) => b.amenities.includes(amen)));
    }

    // Sort
    result.sort((a, b) => {
      if (sortOption === 'cheapest') return a.price - b.price;
      if (sortOption === 'fastest') {
        const getMins = (dur: string) => {
          const parts = dur.match(/(\d+)h\s*(\d+)m/);
          return parts ? parseInt(parts[1]) * 60 + parseInt(parts[2]) : 999;
        };
        return getMins(a.duration) - getMins(b.duration);
      }
      if (sortOption === 'earliest') return a.departureTime24 - b.departureTime24;
      if (sortOption === 'highest_rated') return b.rating - a.rating;
      return (b.rating * 100 - b.price / 10) - (a.rating * 100 - a.price / 10); // recommended balance
    });

    return result;
  }, [buses, filterBusTypes, filterDepartureTime, maxPrice, filterOperators, filterAmenities, sortOption]);

  const activeBus = buses.find((b) => b.id === activeBusId);

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Route header strip */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <BusIcon className="w-3.5 h-3.5" />
              <span>Available Bus Routes</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
              {searchState.from} <span className="text-slate-400">→</span> {searchState.to}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span>Date: <strong>{new Date(searchState.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</strong></span>
              <span>·</span>
              <span>Found <strong>{filteredBuses.length}</strong> buses</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              <span>Filter ({filterBusTypes.length + filterDepartureTime.length + filterOperators.length + filterAmenities.length})</span>
            </button>

            <button
              onClick={onModifySearch}
              className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-colors cursor-pointer"
            >
              Modify Search
            </button>
          </div>
        </div>

        {/* Layout: Sidebar Filter + Buses List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                Filters
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-2">
                <span>Max Ticket Price</span>
                <span className="text-blue-600 font-mono">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="400"
                max="1500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹400</span>
                <span>₹1,500</span>
              </div>
            </div>

            {/* Bus Types */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                Bus Type
              </h4>
              <div className="space-y-2">
                {['AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper', 'Seater'].map((type) => (
                  <label key={type} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterBusTypes.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) setFilterBusTypes([...filterBusTypes, type]);
                        else setFilterBusTypes(filterBusTypes.filter((t) => t !== type));
                      }}
                      className="rounded-sm text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Departure Time Slots */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                Departure Time
              </h4>
              <div className="space-y-2">
                {[
                  { id: 'before_6am', label: 'Early Morning (Before 6 AM)' },
                  { id: '6am_12pm', label: 'Morning (6 AM - 12 PM)' },
                  { id: '12pm_6pm', label: 'Afternoon (12 PM - 6 PM)' },
                  { id: 'after_6pm', label: 'Night (After 6 PM)' },
                ].map((slot) => (
                  <label key={slot.id} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterDepartureTime.includes(slot.id)}
                      onChange={(e) => {
                        if (e.target.checked) setFilterDepartureTime([...filterDepartureTime, slot.id]);
                        else setFilterDepartureTime(filterDepartureTime.filter((s) => s !== slot.id));
                      }}
                      className="rounded-sm text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span>{slot.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Operators */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                Bus Operators
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {operators.map((op) => (
                  <label key={op} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterOperators.includes(op)}
                      onChange={(e) => {
                        if (e.target.checked) setFilterOperators([...filterOperators, op]);
                        else setFilterOperators(filterOperators.filter((o) => o !== op));
                      }}
                      className="rounded-sm text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span className="truncate">{op}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                Amenities
              </h4>
              <div className="space-y-2">
                {['Wi-Fi', 'Charging Point', 'Water Bottle', 'Blanket', 'Live Tracking', 'Clean Restroom'].map((amen) => (
                  <label key={amen} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterAmenities.includes(amen)}
                      onChange={(e) => {
                        if (e.target.checked) setFilterAmenities([...filterAmenities, amen]);
                        else setFilterAmenities(filterAmenities.filter((a) => a !== amen));
                      }}
                      className="rounded-sm text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span>{amen}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Main Content: Sorting Tabs + Buses List */}
          <main className="lg:col-span-9 space-y-4">
            {/* Sorting Toolbar */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 shrink-0 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" />
                  Sort By:
                </span>
                {[
                  { id: 'recommended', label: 'Recommended' },
                  { id: 'cheapest', label: 'Cheapest' },
                  { id: 'fastest', label: 'Fastest' },
                  { id: 'earliest', label: 'Earliest' },
                  { id: 'highest_rated', label: 'Highest Rated' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSortOption(s.id as SortType)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      sortOption === s.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Empty state */}
            {filteredBuses.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <BusIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No buses match your filters</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                  Try adjusting your price range, departure time, or bus type filters to see more results.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Bus Cards List */
              filteredBuses.map((bus) => {
                const isOpen = activeBusId === bus.id;

                return (
                  <div
                    key={bus.id}
                    className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                      isOpen
                        ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                        : 'border-slate-200/90 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    {/* Bus Card Summary Header */}
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Left: Operator & Timings */}
                        <div className="space-y-3 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">
                              {bus.operatorName}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                              <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                              <span>{bus.rating}</span>
                              <span className="text-[10px] text-emerald-600/70 font-normal">({bus.reviewCount})</span>
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                              {bus.isAc ? 'AC' : 'Non-AC'}
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 font-medium">
                            {bus.busType}
                          </p>

                          {/* Time & Duration Grid */}
                          <div className="flex items-center gap-4 sm:gap-6 pt-1">
                            <div>
                              <span className="text-lg sm:text-xl font-extrabold text-slate-900 block font-mono">
                                {bus.departureTime}
                              </span>
                              <span className="text-xs text-slate-500 font-medium">{bus.fromCity}</span>
                            </div>

                            <div className="flex flex-col items-center px-2">
                              <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {bus.duration}
                              </span>
                              <div className="w-20 sm:w-28 h-0.5 bg-slate-300 relative my-1">
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-600" />
                              </div>
                              <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-tight">Direct Route</span>
                            </div>

                            <div>
                              <span className="text-lg sm:text-xl font-extrabold text-slate-900 block font-mono">
                                {bus.arrivalTime}
                              </span>
                              <span className="text-xs text-slate-500 font-medium">{bus.toCity}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Price & View Seats CTA */}
                        <div className="md:text-right flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                          <div>
                            <div className="flex items-baseline md:justify-end gap-1.5">
                              <span className="text-2xl font-extrabold text-slate-900 font-mono">
                                ₹{bus.price}
                              </span>
                              {bus.originalPrice && (
                                <span className="text-xs text-slate-400 line-through">
                                  ₹{bus.originalPrice}
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400 block">per seat</span>
                            <span className="text-[11px] text-amber-600 font-bold mt-1 block">
                              {bus.availableSeatsCount} seats left
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleOpenSeats(bus)}
                            className={`mt-2 md:mt-3 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                              isOpen
                                ? 'bg-slate-900 hover:bg-slate-800 text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs shadow-blue-600/30'
                            }`}
                          >
                            <span>{isOpen ? 'Hide Seats' : 'View Seats'}</span>
                            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Amenities Row */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                        <div className="flex flex-wrap items-center gap-3">
                          {bus.amenities.slice(0, 5).map((amen) => (
                            <span key={amen} className="flex items-center gap-1 text-[11px] text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60">
                              {amen === 'Wi-Fi' && <Wifi className="w-3 h-3 text-blue-500" />}
                              {amen === 'Charging Point' && <Zap className="w-3 h-3 text-amber-500" />}
                              {amen === 'Water Bottle' && <Coffee className="w-3 h-3 text-sky-500" />}
                              {amen === 'Live Tracking' && <Navigation className="w-3 h-3 text-emerald-500" />}
                              {amen === 'Movie Screen' && <Tv className="w-3 h-3 text-indigo-500" />}
                              <span>{amen}</span>
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <Shield className="w-3.5 h-3.5 text-blue-600" />
                          <span>BusGo Safe Certified</span>
                        </div>
                      </div>
                    </div>

                    {/* Integrated Seat Selection Deck when open */}
                    {isOpen && (
                      <SeatSelection
                        bus={bus}
                        selectedSeats={selectedSeats}
                        onToggleSeat={handleToggleSeat}
                        selectedBoardingPoint={selectedBoardingPoint}
                        onSelectBoardingPoint={setSelectedBoardingPoint}
                        selectedDroppingPoint={selectedDroppingPoint}
                        onSelectDroppingPoint={setSelectedDroppingPoint}
                        onContinue={() => onProceedToPassengerDetails(bus, selectedSeats, selectedBoardingPoint, selectedDroppingPoint)}
                        onClose={() => setActiveBusId(null)}
                      />
                    )}
                  </div>
                );
              })
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowMobileFilters(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white p-5 flex flex-col justify-between shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">Filter Buses</h3>
                <button onClick={() => setShowMobileFilters(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 py-4 space-y-6">
                {/* Max Price */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                    <span>Max Price</span>
                    <span className="text-blue-600 font-mono">₹{maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="400"
                    max="1500"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                {/* Bus Type */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Bus Type</h4>
                  <div className="space-y-2">
                    {['AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper', 'Seater'].map((type) => (
                      <label key={type} className="flex items-center gap-2 text-xs text-slate-700">
                        <input
                          type="checkbox"
                          checked={filterBusTypes.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) setFilterBusTypes([...filterBusTypes, type]);
                            else setFilterBusTypes(filterBusTypes.filter((t) => t !== type));
                          }}
                          className="rounded text-blue-600 w-4 h-4"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
