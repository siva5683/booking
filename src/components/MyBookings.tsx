import React, { useState } from 'react';
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  Clock3,
  Download,
  AlertTriangle,
  ArrowRight,
  Bus,
} from 'lucide-react';
import { Booking } from '../types/bus';

interface MyBookingsProps {
  bookings: Booking[];
  onViewTicket: (booking: Booking) => void;
  onCancelBooking: (bookingId: string, refundAmount: number) => void;
  onNewBookingClick: () => void;
  onShowToast: (msg: string) => void;
}

export const MyBookings: React.FC<MyBookingsProps> = ({
  bookings,
  onViewTicket,
  onCancelBooking,
  onNewBookingClick,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [cancellingBooking, setCancellingBooking] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState('Change of travel plans');

  const upcomingBookings = bookings.filter((b) => b.status === 'confirmed');
  const pastBookings = bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled');

  const displayed = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  const handleOpenCancelModal = (b: Booking) => {
    setCancellingBooking(b);
  };

  const handleConfirmCancel = () => {
    if (!cancellingBooking) return;
    // Calculate 80% refund policy
    const refund = Math.round(cancellingBooking.totalAmount * 0.85);
    onCancelBooking(cancellingBooking.id, refund);
    setCancellingBooking(null);
    onShowToast(`Booking ${cancellingBooking.pnr} cancelled. ₹${refund} refund initiated!`);
  };

  const handleDownloadTicket = (b: Booking) => {
    onShowToast(`Downloaded ticket for PNR ${b.pnr}`);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              My Bookings
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              View confirmed tickets, past trip history, and manage cancellations.
            </p>
          </div>

          <button
            type="button"
            onClick={onNewBookingClick}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer self-start"
          >
            + Book New Bus
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-2xl w-fit mb-6 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upcoming Trips ({upcomingBookings.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('past')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'past'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Past & Cancelled ({pastBookings.length})
          </button>
        </div>

        {/* Bookings List */}
        {displayed.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs">
            <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              No {activeTab} bookings found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
              {activeTab === 'upcoming'
                ? "You don't have any upcoming bus journeys planned right now."
                : 'No past or completed bus trips to show.'}
            </p>
            <button
              type="button"
              onClick={onNewBookingClick}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Search & Book Buses
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {displayed.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Left info */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-base font-extrabold text-slate-900 font-heading">
                      {b.fromCity} → {b.toCity}
                    </span>

                    {/* Status Badge */}
                    {b.status === 'confirmed' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                      </span>
                    )}
                    {b.status === 'completed' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200">
                        Completed
                      </span>
                    )}
                    {b.status === 'cancelled' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-xs border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" /> Cancelled
                      </span>
                    )}

                    <span className="text-xs text-slate-400 font-mono">
                      PNR: <strong className="text-slate-700">{b.pnr}</strong>
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
                    <Bus className="w-3.5 h-3.5 text-blue-600" />
                    <span>{b.bus.operatorName} · {b.bus.busType}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Departure</span>
                      <span className="font-bold text-slate-800">{b.boardingPoint.time}</span>
                      <span className="text-[11px] text-slate-500 block">{new Date(b.journeyDate).toLocaleDateString()}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Boarding Stop</span>
                      <span className="font-bold text-slate-800 truncate block">{b.boardingPoint.name}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Seats & Passengers</span>
                      <span className="font-bold text-blue-700">
                        {b.passengers.map((p) => p.seatNumber).join(', ')} ({b.passengers.length})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-left md:text-right">
                    <span className="text-lg font-extrabold text-slate-900 font-mono block">
                      ₹{b.totalAmount}
                    </span>
                    <span className="text-[10px] text-slate-400">Total Paid</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onViewTicket(b)}
                      className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      View Ticket
                    </button>

                    {b.status === 'confirmed' && (
                      <button
                        type="button"
                        onClick={() => handleOpenCancelModal(b)}
                        className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold border border-rose-200 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cancellation Modal */}
      {cancellingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="fixed inset-0" onClick={() => setCancellingBooking(null)} />

          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Cancel Ticket {cancellingBooking.pnr}
                </h3>
                <p className="text-xs text-slate-500">
                  {cancellingBooking.fromCity} to {cancellingBooking.toCity}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Original Ticket Fare:</span>
                <span className="font-mono">₹{cancellingBooking.totalAmount}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Cancellation Fee (15%):</span>
                <span className="font-mono">-₹{Math.round(cancellingBooking.totalAmount * 0.15)}</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-700 pt-1 border-t border-slate-200">
                <span>Estimated Refund Amount:</span>
                <span className="font-mono">₹{Math.round(cancellingBooking.totalAmount * 0.85)}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Reason for Cancellation
              </label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden"
              >
                <option value="Change of travel plans">Change of travel plans</option>
                <option value="Booked another travel mode">Booked another travel mode (Flight/Train)</option>
                <option value="Medical or personal emergency">Medical or personal emergency</option>
                <option value="Found alternative bus timings">Found alternative bus timings</option>
              </select>
            </div>

            <p className="text-[11px] text-slate-400">
              * The refund will be credited directly to your original payment method within 2 to 4 business hours.
            </p>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setCancellingBooking(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Keep Ticket
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
