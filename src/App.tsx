import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { SearchResults } from './components/SearchResults';
import { PassengerDetails } from './components/PassengerDetails';
import { PaymentPage } from './components/PaymentPage';
import { BookingConfirmation } from './components/BookingConfirmation';
import { MyBookings } from './components/MyBookings';
import { OffersPage } from './components/OffersPage';
import { UserProfilePage } from './components/UserProfilePage';
import { HelpSupportPage } from './components/HelpSupportPage';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

import {
  SAMPLE_BUSES,
  POPULAR_ROUTES,
  INITIAL_BOOKINGS,
  DEMO_USER,
  generateBusSeats,
} from './data/mockBusData';

import {
  Bus,
  Seat,
  BoardingPoint,
  DroppingPoint,
  Passenger,
  Booking,
  SearchState,
  UserProfile,
} from './types/bus';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<string>('home');

  // Search state
  const [searchState, setSearchState] = useState<SearchState>({
    from: 'Chennai',
    to: 'Bangalore',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now
    passengersCount: 1,
  });

  // Current User (Persisted)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('busgo_user');
      return saved ? JSON.parse(saved) : DEMO_USER;
    } catch {
      return DEMO_USER;
    }
  });

  // Bookings list (Persisted)
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('busgo_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // Booking Flow in-flight states
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState<BoardingPoint | null>(null);
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState<DroppingPoint | null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [contactEmail, setContactEmail] = useState<string>(currentUser?.email || 'rahul.sharma@example.com');
  const [contactPhone, setContactPhone] = useState<string>(currentUser?.phone || '+91 98765 43210');
  const [latestConfirmedBooking, setLatestConfirmedBooking] = useState<Booking | null>(null);

  // Modals & Notifications
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('busgo_user', JSON.stringify(currentUser));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('busgo_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [bookings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Generate dynamic bus fleet for selected route if needed
  const availableBuses = React.useMemo(() => {
    return SAMPLE_BUSES.map((b) => ({
      ...b,
      fromCity: searchState.from,
      toCity: searchState.to,
    }));
  }, [searchState.from, searchState.to]);

  // Handler: Execute Search
  const handleExecuteSearch = () => {
    setActiveTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Select Popular Route
  const handleSelectPopularRoute = (from: string, to: string) => {
    setSearchState((prev) => ({
      ...prev,
      from,
      to,
    }));
    setActiveTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Proceed from Seat Selection to Passenger Details
  const handleProceedToPassengerDetails = (
    bus: Bus,
    seats: Seat[],
    bp: BoardingPoint,
    dp: DroppingPoint
  ) => {
    if (seats.length === 0) {
      showToast('Please select at least 1 seat to continue.');
      return;
    }
    setSelectedBus(bus);
    setSelectedSeats(seats);
    setSelectedBoardingPoint(bp);
    setSelectedDroppingPoint(dp);
    setActiveTab('passenger_details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Proceed to Payment Page
  const handleProceedToPayment = (
    collectedPassengers: Passenger[],
    email: string,
    phone: string
  ) => {
    setPassengers(collectedPassengers);
    setContactEmail(email);
    setContactPhone(phone);
    setActiveTab('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Payment Complete & Create Booking
  const handlePaymentSuccess = (
    bookingId: string,
    paymentMethod: string,
    discount: number,
    couponCode?: string
  ) => {
    if (!selectedBus || !selectedBoardingPoint || !selectedDroppingPoint) return;

    const baseFare = selectedSeats.reduce((acc, s) => acc + s.price, 0);
    const taxes = 50;
    const totalAmount = Math.max(0, baseFare + taxes - discount);

    const newBooking: Booking = {
      id: bookingId,
      pnr: `PNR-${Math.floor(100000 + Math.random() * 900000)}`,
      bus: selectedBus,
      journeyDate: searchState.date,
      fromCity: searchState.from,
      toCity: searchState.to,
      boardingPoint: selectedBoardingPoint,
      droppingPoint: selectedDroppingPoint,
      passengers: passengers,
      contactEmail: contactEmail,
      contactPhone: contactPhone,
      baseFare: baseFare,
      taxes: taxes,
      discount: discount,
      couponCode: couponCode,
      totalAmount: totalAmount,
      paymentMethod: paymentMethod,
      bookingDate: new Date().toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'confirmed',
      qrCodePayload: `BUSGO-${bookingId}-${searchState.from}-${searchState.to}`,
    };

    setBookings((prev) => [newBooking, ...prev]);
    setLatestConfirmedBooking(newBooking);
    setActiveTab('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Cancel Booking
  const handleCancelBooking = (bookingId: string, refundAmount: number) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status: 'cancelled',
              cancellationRefund: refundAmount,
              cancelledAt: new Date().toISOString(),
            }
          : b
      )
    );
  };

  // Handler: Offer Apply from Offers Page
  const handleUseOffer = (offerCode: string) => {
    setActiveTab('home');
    showToast(`Coupon ${offerCode} applied! Choose your route.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={() => {
          setCurrentUser(null);
          showToast('Logged out successfully.');
        }}
        bookingsCount={bookings.filter((b) => b.status === 'confirmed').length}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {/* VIEW 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div>
            <HeroSearch
              searchState={searchState}
              onSearchChange={(partial) => setSearchState((prev) => ({ ...prev, ...partial }))}
              onExecuteSearch={handleExecuteSearch}
              onSelectRoute={handleSelectPopularRoute}
            />

            {/* Featured Buses Preview */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                    Featured Fleets
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    Popular Buses & Multi-Axle Coaches
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleExecuteSearch}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                >
                  View All Buses →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SAMPLE_BUSES.slice(0, 3).map((bus) => (
                  <div
                    key={bus.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700">
                          {bus.category}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          ★ {bus.rating}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 font-heading">
                        {bus.operatorName}
                      </h3>
                      <p className="text-xs text-slate-500">{bus.busType}</p>

                      <div className="pt-2 flex justify-between text-xs text-slate-700 border-t border-slate-100 font-mono">
                        <span>{bus.departureTime}</span>
                        <span className="text-slate-400 font-sans">{bus.duration}</span>
                        <span>{bus.arrivalTime}</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-xl font-extrabold text-slate-900 font-mono">
                          ₹{bus.price}
                        </span>
                        <span className="text-[10px] text-slate-400 block">starting price</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedBus(bus);
                          handleExecuteSearch();
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: SEARCH RESULTS & SEAT SELECTION */}
        {activeTab === 'search' && (
          <SearchResults
            buses={availableBuses}
            searchState={searchState}
            onModifySearch={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onProceedToPassengerDetails={handleProceedToPassengerDetails}
          />
        )}

        {/* VIEW 3: PASSENGER DETAILS */}
        {activeTab === 'passenger_details' && selectedBus && selectedBoardingPoint && selectedDroppingPoint && (
          <PassengerDetails
            bus={selectedBus}
            selectedSeats={selectedSeats}
            boardingPoint={selectedBoardingPoint}
            droppingPoint={selectedDroppingPoint}
            journeyDate={searchState.date}
            currentUser={currentUser}
            onProceedToPayment={handleProceedToPayment}
            onBack={() => {
              setActiveTab('search');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 4: PAYMENT PAGE */}
        {activeTab === 'payment' && selectedBus && selectedBoardingPoint && selectedDroppingPoint && (
          <PaymentPage
            bus={selectedBus}
            selectedSeats={selectedSeats}
            boardingPoint={selectedBoardingPoint}
            droppingPoint={selectedDroppingPoint}
            passengers={passengers}
            journeyDate={searchState.date}
            contactEmail={contactEmail}
            contactPhone={contactPhone}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={() => {
              setActiveTab('passenger_details');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 5: BOOKING CONFIRMATION & E-TICKET */}
        {activeTab === 'confirmation' && latestConfirmedBooking && (
          <BookingConfirmation
            booking={latestConfirmedBooking}
            onViewMyBookings={() => {
              setActiveTab('bookings');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBookAnother={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShowToast={showToast}
          />
        )}

        {/* VIEW 6: MY BOOKINGS DASHBOARD */}
        {activeTab === 'bookings' && (
          <MyBookings
            bookings={bookings}
            onViewTicket={(b) => {
              setLatestConfirmedBooking(b);
              setActiveTab('confirmation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCancelBooking={handleCancelBooking}
            onNewBookingClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShowToast={showToast}
          />
        )}

        {/* VIEW 7: OFFERS PAGE */}
        {activeTab === 'offers' && (
          <OffersPage onUseOffer={handleUseOffer} onShowToast={showToast} />
        )}

        {/* VIEW 8: USER PROFILE */}
        {activeTab === 'profile' && currentUser && (
          <UserProfilePage
            user={currentUser}
            bookings={bookings}
            onUpdateUser={setCurrentUser}
            onShowToast={showToast}
          />
        )}

        {/* VIEW 9: HELP & SUPPORT */}
        {activeTab === 'help' && <HelpSupportPage />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectRoute={handleSelectPopularRoute}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Welcome back, ${user.name}!`);
        }}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}
