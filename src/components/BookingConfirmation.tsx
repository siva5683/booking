import React from 'react';
import {
  CheckCircle2,
  Download,
  Printer,
  Mail,
  Bus,
  MapPin,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  Ticket,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Booking } from '../types/bus';

interface BookingConfirmationProps {
  booking: Booking;
  onViewMyBookings: () => void;
  onBookAnother: () => void;
  onShowToast: (msg: string) => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  booking,
  onViewMyBookings,
  onBookAnother,
  onShowToast,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate clean e-ticket HTML text
    const ticketText = `
========================================
             BUSGO E-TICKET
========================================
Booking ID : ${booking.id}
PNR Number : ${booking.pnr}
Status     : CONFIRMED
Date Booked: ${booking.bookingDate}
----------------------------------------
Bus Operator : ${booking.bus.operatorName}
Bus Type     : ${booking.bus.busType}
Bus Reg No   : ${booking.bus.busNumber}
----------------------------------------
From         : ${booking.fromCity} (${booking.boardingPoint.name})
Departure    : ${booking.boardingPoint.time}, ${booking.journeyDate}
To           : ${booking.toCity} (${booking.droppingPoint.name})
Arrival      : ${booking.droppingPoint.time}
----------------------------------------
PASSENGERS & SEATS:
${booking.passengers.map((p, i) => `${i + 1}. ${p.name} (${p.gender.toUpperCase()}, ${p.age} yrs) - Seat: ${p.seatNumber}`).join('\n')}
----------------------------------------
TOTAL FARE PAID: ₹${booking.totalAmount}
Payment Method : ${booking.paymentMethod}
========================================
Helpline: 1800-BUS-GO | help@busgo.com
Thank you for traveling with BusGo!
========================================
    `;

    const blob = new Blob([ticketText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BusGo_Ticket_${booking.pnr}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    onShowToast(`Ticket ${booking.pnr} downloaded!`);
  };

  const handleEmailTicket = () => {
    onShowToast(`E-Ticket sent to ${booking.contactEmail}!`);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Celebration Header */}
        <div className="text-center mb-8 no-print">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-500/10">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            🎉 Booking Confirmed!
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
            Your bus ticket has been successfully booked. We've sent the ticket details and live tracking link to{' '}
            <strong className="text-slate-800">{booking.contactEmail}</strong>.
          </p>
        </div>

        {/* Digital Boarding Pass Ticket Card */}
        <div className="printable-ticket bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden mb-8">
          {/* Ticket Header */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shadow-inner">
                <Bus className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight font-heading">BusGo Digital Ticket</span>
                <span className="text-xs text-blue-100 block">Verified Official Electronic Passenger Pass</span>
              </div>
            </div>

            <div className="sm:text-right font-mono text-xs">
              <div className="text-blue-100">PNR NUMBER</div>
              <div className="text-lg font-extrabold tracking-wider text-amber-300">{booking.pnr}</div>
              <div className="text-[10px] text-blue-200">ID: {booking.id}</div>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Route & Timings Bar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="md:col-span-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Departure</span>
                <span className="text-xl font-extrabold text-slate-900 font-heading block mt-0.5">{booking.fromCity}</span>
                <span className="text-xs font-bold text-blue-700 block mt-1">{booking.boardingPoint.name}</span>
                <span className="text-xs text-slate-500 font-mono">{booking.boardingPoint.time} · {new Date(booking.journeyDate).toLocaleDateString()}</span>
              </div>

              <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-semibold text-slate-500">{booking.bus.duration}</span>
                <div className="w-32 h-0.5 bg-blue-300 relative my-1">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-600" />
                </div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide">Confirmed Seat</span>
              </div>

              <div className="md:col-span-4 md:text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Arrival</span>
                <span className="text-xl font-extrabold text-slate-900 font-heading block mt-0.5">{booking.toCity}</span>
                <span className="text-xs font-bold text-emerald-700 block mt-1">{booking.droppingPoint.name}</span>
                <span className="text-xs text-slate-500 font-mono">{booking.droppingPoint.time}</span>
              </div>
            </div>

            {/* Bus & Operator Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Bus Operator</span>
                <span className="text-sm font-bold text-slate-900">{booking.bus.operatorName}</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">{booking.bus.busType}</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Vehicle Reg No</span>
                <span className="text-sm font-bold text-slate-900 font-mono">{booking.bus.busNumber}</span>
                <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">GPS Tracking Active</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Fare Paid</span>
                <span className="text-sm font-extrabold text-blue-700 font-mono">₹{booking.totalAmount}</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">{booking.paymentMethod}</span>
              </div>
            </div>

            {/* Passenger List & QR Code Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-slate-200 items-center">
              {/* Passengers List */}
              <div className="md:col-span-8 space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Passengers ({booking.passengers.length})
                </span>

                <div className="space-y-2">
                  {booking.passengers.map((p, idx) => (
                    <div
                      key={p.seatNumber}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="font-bold text-slate-900">{p.name}</span>
                          <span className="text-slate-500 text-[11px] ml-2">
                            ({p.gender.toUpperCase()}, {p.age} yrs)
                          </span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 font-extrabold font-mono">
                        Seat {p.seatNumber}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Please carry a valid government ID (Aadhaar / Voter / DL) while boarding.</span>
                </div>
              </div>

              {/* Scannable QR Code */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <div className="w-32 h-32 bg-white p-2 rounded-xl border border-slate-300 shadow-xs mb-2">
                  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                    <rect width="100" height="100" fill="white" />
                    <path d="M10 10h30v30H10zM15 15v20h20V15H15zm5 5h10v10H20V20z" fill="#0f172a" />
                    <path d="M60 10h30v30H60zM65 15v20h20V15H65zm5 5h10v10H70V20z" fill="#0f172a" />
                    <path d="M10 60h30v30H10zM15 65v20h20V65H15zm5 5h10v10H20V70z" fill="#0f172a" />
                    <rect x="45" y="10" width="10" height="20" fill="#0f172a" />
                    <rect x="10" y="45" width="20" height="10" fill="#0f172a" />
                    <rect x="45" y="45" width="20" height="20" fill="#1d4ed8" />
                    <rect x="70" y="45" width="20" height="10" fill="#0f172a" />
                    <rect x="45" y="70" width="15" height="20" fill="#0f172a" />
                    <rect x="70" y="70" width="20" height="20" fill="#0f172a" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500">SCAN TO BOARD BUS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="no-print flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleDownload}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Ticket</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print Ticket</span>
          </button>

          <button
            type="button"
            onClick={handleEmailTicket}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Mail className="w-4 h-4" />
            <span>Email Ticket</span>
          </button>

          <button
            type="button"
            onClick={onViewMyBookings}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Ticket className="w-4 h-4" />
            <span>View My Bookings</span>
          </button>

          <button
            type="button"
            onClick={onBookAnother}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer"
          >
            Book Another Ticket
          </button>
        </div>
      </div>
    </div>
  );
};
