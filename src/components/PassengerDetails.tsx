import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Bus,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { Bus as BusType, Seat, BoardingPoint, DroppingPoint, Passenger, UserProfile } from '../types/bus';

interface PassengerDetailsProps {
  bus: BusType;
  selectedSeats: Seat[];
  boardingPoint: BoardingPoint;
  droppingPoint: DroppingPoint;
  journeyDate: string;
  currentUser: UserProfile | null;
  onProceedToPayment: (passengers: Passenger[], email: string, phone: string) => void;
  onBack: () => void;
}

export const PassengerDetails: React.FC<PassengerDetailsProps> = ({
  bus,
  selectedSeats,
  boardingPoint,
  droppingPoint,
  journeyDate,
  currentUser,
  onProceedToPayment,
  onBack,
}) => {
  // Initialize passenger state based on selected seats count
  const [passengers, setPassengers] = useState<Passenger[]>(() => {
    return selectedSeats.map((seat, index) => {
      // Pre-fill first passenger from logged in user if available
      if (index === 0 && currentUser) {
        return {
          seatNumber: seat.number,
          name: currentUser.name,
          age: 28,
          gender: 'male',
        };
      }
      return {
        seatNumber: seat.number,
        name: '',
        age: 25,
        gender: 'male',
      };
    });
  });

  const [email, setEmail] = useState(currentUser?.email || 'rahul.sharma@example.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handlePassengerChange = (index: number, field: keyof Passenger, value: any) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleApplySavedPassenger = (pIndex: number, savedP: { name: string; age: number; gender: 'male' | 'female' | 'other' }) => {
    const updated = [...passengers];
    updated[pIndex] = {
      ...updated[pIndex],
      name: savedP.name,
      age: savedP.age,
      gender: savedP.gender,
    };
    setPassengers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Please agree to the terms and conditions to proceed.');
      return;
    }
    // Validation
    for (const p of passengers) {
      if (!p.name.trim()) {
        alert(`Please enter the name for passenger on Seat ${p.seatNumber}`);
        return;
      }
    }
    onProceedToPayment(passengers, email, phone);
  };

  const baseFare = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const taxes = 50;
  const total = baseFare + taxes;

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Step Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Seat Selection</span>
          </button>
          <div className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
            Step 2 of 3: Passenger Information
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Passenger Forms */}
          <div className="lg:col-span-8 space-y-6">
            {/* Passenger Forms Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-heading">
                    Passenger Details
                  </h2>
                  <p className="text-xs text-slate-500">
                    Names must match government-issued photo ID cards for boarding.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs">
                  {selectedSeats.length} {selectedSeats.length === 1 ? 'Passenger' : 'Passengers'}
                </span>
              </div>

              {passengers.map((p, idx) => (
                <div
                  key={p.seatNumber}
                  className="p-5 bg-slate-50/70 border border-slate-200/80 rounded-2xl space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-blue-900 uppercase tracking-wide flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-600" />
                      Passenger {idx + 1} · Seat {p.seatNumber}
                    </span>

                    {/* Quick Autofill from Saved Passenger */}
                    {currentUser && currentUser.savedPassengers.length > 0 && (
                      <div className="flex items-center gap-1 text-[11px]">
                        <span className="text-slate-400">Autofill:</span>
                        {currentUser.savedPassengers.map((saved) => (
                          <button
                            key={saved.name}
                            type="button"
                            onClick={() => handleApplySavedPassenger(idx, saved)}
                            className="px-2 py-0.5 rounded-md bg-white hover:bg-blue-50 border border-slate-200 text-slate-700 font-medium hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            {saved.name.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                    {/* Passenger Name */}
                    <div className="sm:col-span-6">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={p.name}
                        onChange={(e) => handlePassengerChange(idx, 'name', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 focus:border-blue-600 rounded-xl text-xs sm:text-sm font-semibold focus:outline-hidden transition-all"
                      />
                    </div>

                    {/* Age */}
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Age <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        required
                        value={p.age}
                        onChange={(e) => handlePassengerChange(idx, 'age', Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 focus:border-blue-600 rounded-xl text-xs sm:text-sm font-semibold focus:outline-hidden transition-all font-mono"
                      />
                    </div>

                    {/* Gender */}
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Gender <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {(['male', 'female', 'other'] as const).map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => handlePassengerChange(idx, 'gender', g)}
                            className={`py-2 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                              p.gender === g
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {g === 'male' ? 'M' : g === 'female' ? 'F' : 'O'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Information Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Contact Information
                </h3>
                <p className="text-xs text-slate-500">
                  Your ticket confirmation, live tracking link & driver details will be sent here.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 rounded-xl text-xs sm:text-sm font-semibold focus:outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 rounded-xl text-xs sm:text-sm font-semibold focus:outline-hidden transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span>
                    I understand and agree to the <strong>BusGo Terms of Service</strong>, passenger safety norms, and operator's cancellation policy.
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Trip Review & Summary */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Bus className="w-4 h-4 text-blue-600" />
              <span>Trip Summary</span>
            </h3>

            {/* Operator and route info */}
            <div>
              <span className="text-sm font-extrabold text-slate-900 block font-heading">
                {bus.operatorName}
              </span>
              <span className="text-xs text-slate-500">{bus.busType}</span>
            </div>

            <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Departure</span>
                  <span className="font-bold text-slate-900">{boardingPoint.name}</span>
                  <span className="text-slate-600 block text-[11px]">{boardingPoint.time} · {new Date(journeyDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Arrival</span>
                  <span className="font-bold text-slate-900">{droppingPoint.name}</span>
                  <span className="text-slate-600 block text-[11px]">{droppingPoint.time}</span>
                </div>
              </div>
            </div>

            {/* Seats */}
            <div className="text-xs flex justify-between py-1">
              <span className="text-slate-500">Reserved Seats:</span>
              <span className="font-bold text-blue-700">
                {selectedSeats.map((s) => s.number).join(', ')}
              </span>
            </div>

            {/* Fare Breakdown */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Fare ({selectedSeats.length} seats)</span>
                <span className="font-mono font-bold">₹{baseFare}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Taxes & Service Fees</span>
                <span className="font-mono">₹{taxes}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-blue-600 font-mono">₹{total}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-sm rounded-xl shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Continue to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe & Secure 256-bit SSL Checkout</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
