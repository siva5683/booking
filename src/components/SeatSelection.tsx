import React, { useState } from 'react';
import {
  Bus,
  Check,
  Disc,
  MapPin,
  Clock,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { Bus as BusType, Seat, BoardingPoint, DroppingPoint } from '../types/bus';

interface SeatSelectionProps {
  bus: BusType;
  selectedSeats: Seat[];
  onToggleSeat: (seat: Seat) => void;
  selectedBoardingPoint: BoardingPoint;
  onSelectBoardingPoint: (point: BoardingPoint) => void;
  selectedDroppingPoint: DroppingPoint;
  onSelectDroppingPoint: (point: DroppingPoint) => void;
  onContinue: () => void;
  onClose: () => void;
}

export const SeatSelection: React.FC<SeatSelectionProps> = ({
  bus,
  selectedSeats,
  onToggleSeat,
  selectedBoardingPoint,
  onSelectBoardingPoint,
  selectedDroppingPoint,
  onSelectDroppingPoint,
  onContinue,
  onClose,
}) => {
  const [activeDeck, setActiveDeck] = useState<'lower' | 'upper'>('lower');
  const [activeTab, setActiveTab] = useState<'seats' | 'points'>('seats');

  const isSleeper = bus.category === 'Sleeper';
  const currentDeckSeats = bus.seats.filter((s) => s.deck === activeDeck);

  // Group seats by row (rows 1 to 6)
  const rows = [1, 2, 3, 4, 5, 6];

  // Calculate pricing
  const baseFare = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const taxes = selectedSeats.length > 0 ? 50 : 0;
  const total = baseFare + taxes;

  return (
    <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-6 rounded-b-2xl animate-in slide-in-from-top-2">
      {/* Sub-header navigation: Seats vs Boarding/Dropping Points */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('seats')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'seats'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            1. Select Seats ({selectedSeats.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('points')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'points'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            2. Boarding & Dropping Points
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-sm bg-white border border-slate-300" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-sm bg-blue-600 text-white flex items-center justify-center">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-sm bg-slate-300" />
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-sm bg-pink-100 border border-pink-400" />
            <span>Ladies</span>
          </div>
        </div>
      </div>

      {activeTab === 'seats' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Bus Deck */}
          <div className="lg:col-span-8 flex flex-col items-center">
            {/* Deck Switcher for Sleeper */}
            {isSleeper && (
              <div className="inline-flex p-1 bg-white border border-slate-200 rounded-xl mb-4 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setActiveDeck('lower')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeDeck === 'lower'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Lower Deck (18 Berths)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDeck('upper')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeDeck === 'upper'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Upper Deck (18 Berths)
                </button>
              </div>
            )}

            {/* Bus Shell Container */}
            <div className="w-full max-w-lg bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-md relative">
              {/* Driver Section */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-dashed border-slate-200">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Bus className="w-4 h-4 text-blue-600" />
                  <span>Front / Driver Cabin</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500" title="Driver Wheel">
                  <Disc className="w-5 h-5 animate-spin-slow" />
                </div>
              </div>

              {/* Seats Grid */}
              <div className="space-y-3">
                {rows.map((r) => {
                  const rowSeats = currentDeckSeats.filter((s) => s.row === r);
                  const leftSeat = rowSeats.find((s) => s.col === 0);
                  const rightSeat1 = rowSeats.find((s) => s.col === 2);
                  const rightSeat2 = rowSeats.find((s) => s.col === 3);

                  return (
                    <div key={r} className="flex items-center justify-between gap-4">
                      {/* Left Window Seat */}
                      <div className="w-1/3">
                        {leftSeat && (
                          <SeatButton
                            seat={leftSeat}
                            isSelected={selectedSeats.some((s) => s.id === leftSeat.id)}
                            onToggle={() => onToggleSeat(leftSeat)}
                            isSleeper={isSleeper}
                          />
                        )}
                      </div>

                      {/* Aisle Walking Space */}
                      <div className="w-12 text-center text-[10px] font-mono text-slate-300 select-none">
                        Aisle
                      </div>

                      {/* Right Double Seats */}
                      <div className="w-1/2 flex items-center gap-2">
                        {rightSeat1 && (
                          <SeatButton
                            seat={rightSeat1}
                            isSelected={selectedSeats.some((s) => s.id === rightSeat1.id)}
                            onToggle={() => onToggleSeat(rightSeat1)}
                            isSleeper={isSleeper}
                          />
                        )}
                        {rightSeat2 && (
                          <SeatButton
                            seat={rightSeat2}
                            isSelected={selectedSeats.some((s) => s.id === rightSeat2.id)}
                            onToggle={() => onToggleSeat(rightSeat2)}
                            isSleeper={isSleeper}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Rear Section */}
              <div className="mt-5 pt-3 border-t border-slate-100 text-center text-[10px] text-slate-400 font-medium">
                Emergency Exit & Rear Suspension
              </div>
            </div>
          </div>

          {/* Right: Selection Summary & Next Step */}
          <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Seat & Fare Summary</span>
            </h4>

            {/* Selected Seats chips */}
            <div>
              <span className="text-xs font-semibold text-slate-500 block mb-1.5">
                Selected Seats ({selectedSeats.length}):
              </span>
              {selectedSeats.length === 0 ? (
                <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>Please tap seats from the layout to continue.</span>
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {selectedSeats.map((seat) => (
                    <span
                      key={seat.id}
                      className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded-lg border border-blue-200"
                    >
                      {seat.number} ({seat.deck.toUpperCase()}) - ₹{seat.price}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Boarding and dropping summary */}
            <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Boarding Point</span>
                  <span className="font-semibold text-slate-800">{selectedBoardingPoint.name} ({selectedBoardingPoint.time})</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Dropping Point</span>
                  <span className="font-semibold text-slate-800">{selectedDroppingPoint.name} ({selectedDroppingPoint.time})</span>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Ticket Price</span>
                <span className="font-bold">₹{baseFare}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Taxes & GST (State Bus Cess)</span>
                <span>₹{taxes}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-blue-900 pt-2 border-t border-slate-200">
                <span>Total Payable</span>
                <span className="text-base text-blue-600">₹{total}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                disabled={selectedSeats.length === 0}
                onClick={onContinue}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Continue to Passenger Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 px-3 text-xs font-semibold text-slate-500 hover:text-slate-800 text-center transition-colors cursor-pointer"
              >
                Cancel & Close Seats
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Boarding & Dropping Points Tab */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
          {/* Boarding Points */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Select Boarding Point ({bus.fromCity})</span>
            </h4>
            <div className="space-y-2.5">
              {bus.boardingPoints.map((bp) => (
                <label
                  key={bp.id}
                  onClick={() => onSelectBoardingPoint(bp)}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedBoardingPoint.id === bp.id
                      ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="boarding"
                    checked={selectedBoardingPoint.id === bp.id}
                    onChange={() => onSelectBoardingPoint(bp)}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{bp.name}</span>
                      <span className="flex items-center gap-1 text-blue-700">
                        <Clock className="w-3 h-3" />
                        {bp.time}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5">{bp.address}</p>
                    {bp.landmark && (
                      <span className="text-[10px] text-slate-400 font-medium">Landmark: {bp.landmark}</span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Dropping Points */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Select Dropping Point ({bus.toCity})</span>
            </h4>
            <div className="space-y-2.5">
              {bus.droppingPoints.map((dp) => (
                <label
                  key={dp.id}
                  onClick={() => onSelectDroppingPoint(dp)}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedDroppingPoint.id === dp.id
                      ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="dropping"
                    checked={selectedDroppingPoint.id === dp.id}
                    onChange={() => onSelectDroppingPoint(dp)}
                    className="mt-1 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{dp.name}</span>
                      <span className="flex items-center gap-1 text-emerald-700">
                        <Clock className="w-3 h-3" />
                        {dp.time}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5">{dp.address}</p>
                    {dp.landmark && (
                      <span className="text-[10px] text-slate-400 font-medium">Landmark: {dp.landmark}</span>
                    )}
                  </div>
                </label>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('seats')}
              className="mt-6 w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Done, Return to Seats
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface SeatButtonProps {
  seat: Seat;
  isSelected: boolean;
  onToggle: () => void;
  isSleeper: boolean;
}

const SeatButton: React.FC<SeatButtonProps> = ({ seat, isSelected, onToggle, isSleeper }) => {
  const isOccupied = seat.status === 'occupied';
  const isFemaleReserved = seat.status === 'female_reserved';

  let bgClass = 'bg-white border-slate-300 text-slate-700 hover:border-blue-500 hover:shadow-xs';
  if (isOccupied) {
    bgClass = 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed';
  } else if (isSelected) {
    bgClass = 'bg-blue-600 border-blue-600 text-white shadow-sm ring-2 ring-blue-300';
  } else if (isFemaleReserved) {
    bgClass = 'bg-pink-50 border-pink-300 text-pink-700 hover:border-pink-500';
  }

  return (
    <button
      type="button"
      disabled={isOccupied}
      onClick={onToggle}
      title={`${seat.number} (${isSleeper ? 'Sleeper' : 'Seater'}) - ₹${seat.price} ${
        isFemaleReserved ? '· Reserved for Ladies' : ''
      }`}
      className={`w-full ${
        isSleeper ? 'h-14 sm:h-16' : 'h-10 sm:h-11'
      } rounded-xl border flex flex-col items-center justify-center p-1 font-bold text-xs transition-all cursor-pointer ${bgClass}`}
    >
      <span className="text-[11px] font-mono leading-none">{seat.number}</span>
      <span className="text-[9px] font-medium opacity-80 mt-1">₹{seat.price}</span>
      {isSelected && <Check className="w-3 h-3 stroke-[3] mt-0.5" />}
    </button>
  );
};
