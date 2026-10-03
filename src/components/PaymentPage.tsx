import React, { useState } from 'react';
import {
  CreditCard,
  QrCode,
  Building2,
  Wallet,
  ShieldCheck,
  Lock,
  ArrowLeft,
  CheckCircle,
  Tag,
  Loader2,
  Sparkles,
  Smartphone,
  Bus,
} from 'lucide-react';
import { Bus as BusType, Seat, BoardingPoint, DroppingPoint, Passenger } from '../types/bus';
import { OFFERS } from '../data/mockBusData';

interface PaymentPageProps {
  bus: BusType;
  selectedSeats: Seat[];
  boardingPoint: BoardingPoint;
  droppingPoint: DroppingPoint;
  passengers: Passenger[];
  journeyDate: string;
  contactEmail: string;
  contactPhone: string;
  onPaymentSuccess: (bookingId: string, paymentMethod: string, discount: number, couponCode?: string) => void;
  onBack: () => void;
}

type PaymentMethodType = 'upi' | 'card' | 'netbanking' | 'wallet';

export const PaymentPage: React.FC<PaymentPageProps> = ({
  bus,
  selectedSeats,
  boardingPoint,
  droppingPoint,
  passengers,
  journeyDate,
  contactEmail,
  contactPhone,
  onPaymentSuccess,
  onBack,
}) => {
  const [method, setMethod] = useState<PaymentMethodType>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  // UPI state
  const [upiId, setUpiId] = useState('rahul@okhdfcbank');
  const [upiMode, setUpiMode] = useState<'id' | 'qr'>('qr');

  // Card state
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('789');
  const [cardHolder, setCardHolder] = useState(passengers[0]?.name || 'Rahul Sharma');

  // Net Banking state
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Wallet state
  const [selectedWallet, setSelectedWallet] = useState('Paytm');

  // Coupon state
  const [couponCode, setCouponCode] = useState('BUSGO100');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('BUSGO100');
  const [discountAmount, setDiscountAmount] = useState<number>(100);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Fares
  const baseFare = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const taxes = 50;
  const finalTotal = Math.max(0, baseFare + taxes - discountAmount);

  const handleApplyCoupon = () => {
    setCouponError(null);
    const found = OFFERS.find((o) => o.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (!found) {
      setCouponError('Invalid coupon code. Try WELCOME20 or BUSGO100.');
      return;
    }
    if (baseFare < found.minBookingAmount) {
      setCouponError(`Minimum booking amount of ₹${found.minBookingAmount} required for this coupon.`);
      return;
    }

    let calculatedDiscount = 0;
    if (found.discountType === 'percentage') {
      calculatedDiscount = Math.round((baseFare * found.discountValue) / 100);
      if (found.maxDiscount && calculatedDiscount > found.maxDiscount) {
        calculatedDiscount = found.maxDiscount;
      }
    } else {
      calculatedDiscount = found.discountValue;
    }

    setDiscountAmount(calculatedDiscount);
    setAppliedCoupon(found.code);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setCouponCode('');
  };

  const handlePay = () => {
    setIsProcessing(true);

    let methodLabel = 'UPI';
    if (method === 'upi') methodLabel = `UPI (${upiMode === 'qr' ? 'Dynamic QR' : upiId})`;
    else if (method === 'card') methodLabel = `Credit Card (ending 8821)`;
    else if (method === 'netbanking') methodLabel = `Net Banking (${selectedBank})`;
    else if (method === 'wallet') methodLabel = `Wallet (${selectedWallet})`;

    // Simulate payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      const generatedBookingId = `BGO-${Math.floor(100000 + Math.random() * 900000)}`;
      onPaymentSuccess(generatedBookingId, methodLabel, discountAmount, appliedCoupon || undefined);
    }, 2000);
  };

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
            <span>Back to Passenger Details</span>
          </button>
          <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>Step 3 of 3: Secure Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Payment Method Selection */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">
                Choose Payment Method
              </h2>
              <p className="text-xs text-slate-500">
                All transactions are encrypted with 256-bit SSL certificate security.
              </p>
            </div>

            {/* Payment Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'upi', label: 'UPI / QR', icon: QrCode },
                { id: 'card', label: 'Debit / Card', icon: CreditCard },
                { id: 'netbanking', label: 'Net Banking', icon: Building2 },
                { id: 'wallet', label: 'Wallets', icon: Wallet },
              ].map((m) => {
                const Icon = m.icon;
                const isActive = method === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id as PaymentMethodType)}
                    className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 border-blue-600 text-blue-700 ring-1 ring-blue-600 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/70'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-bold">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Method Details Pane */}
            <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              {/* UPI Tab */}
              {method === 'upi' && (
                <div className="space-y-4">
                  <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setUpiMode('qr')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        upiMode === 'qr' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Instant Scan & Pay QR
                    </button>
                    <button
                      type="button"
                      onClick={() => setUpiMode('id')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        upiMode === 'id' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Enter UPI ID / VPA
                    </button>
                  </div>

                  {upiMode === 'qr' ? (
                    <div className="text-center py-2 space-y-3">
                      <div className="w-48 h-48 bg-white p-3 rounded-2xl border-2 border-slate-200 mx-auto shadow-sm flex flex-col items-center justify-center relative">
                        {/* Simulated QR Code Graphic */}
                        <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none">
                          <rect width="100" height="100" fill="white" />
                          <path d="M10 10h30v30H10zM15 15v20h20V15H15zm5 5h10v10H20V20z" fill="#0f172a" />
                          <path d="M60 10h30v30H60zM65 15v20h20V15H65zm5 5h10v10H70V20z" fill="#0f172a" />
                          <path d="M10 60h30v30H10zM15 65v20h20V65H15zm5 5h10v10H20V70z" fill="#0f172a" />
                          <rect x="45" y="10" width="10" height="20" fill="#0f172a" />
                          <rect x="10" y="45" width="20" height="10" fill="#0f172a" />
                          <rect x="45" y="45" width="20" height="20" fill="#2563eb" />
                          <rect x="70" y="45" width="20" height="10" fill="#0f172a" />
                          <rect x="45" y="70" width="15" height="20" fill="#0f172a" />
                          <rect x="70" y="70" width="20" height="20" fill="#0f172a" />
                        </svg>
                        <span className="absolute bottom-1 text-[9px] font-mono text-slate-400">BUSGO UPI GATEWAY</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">
                        Scan using Google Pay, PhonePe, Paytm, or BHIM UPI
                      </p>
                      <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400">
                        <span>GPay</span>·<span>PhonePe</span>·<span>Paytm</span>·<span>CRED</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Virtual Payment Address (UPI ID)
                        </label>
                        <div className="relative">
                          <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="username@okhdfcbank"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:border-blue-600 focus:outline-hidden"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[11px]">
                        <span className="text-slate-400">Quick handles:</span>
                        {['@okaxis', '@okhdfcbank', '@paytm', '@ybl'].map((h) => (
                          <button
                            key={h}
                            type="button"
                            onClick={() => setUpiId(`rahul${h}`)}
                            className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-blue-600 cursor-pointer"
                          >
                            {h}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Credit / Debit Card Tab */}
              {method === 'card' && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="•••• •••• •••• ••••"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono font-bold focus:border-blue-600 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono font-bold focus:border-blue-600 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono font-bold focus:border-blue-600 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="Name as on card"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:border-blue-600 focus:outline-hidden"
                    />
                  </div>
                </div>
              )}

              {/* Net Banking */}
              {method === 'netbanking' && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 block">Select Popular Bank</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National'].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                          selectedBank === bank
                            ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Wallets */}
              {method === 'wallet' && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 block">Select Mobile Wallet</span>
                  <div className="grid grid-cols-3 gap-2">
                    {['Paytm Wallet', 'Amazon Pay', 'PhonePe Wallet'].map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setSelectedWallet(w)}
                        className={`p-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                          selectedWallet === w
                            ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pay Button with security note */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePay}
                className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 disabled:opacity-60 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Payment Securely...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Pay ₹{finalTotal}</span>
                  </>
                )}
              </button>

              <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Your payment information is securely processed. 100% RBI & PCI-DSS Compliant.</span>
              </div>
            </div>
          </div>

          {/* Right: Booking Summary & Coupon Panel */}
          <div className="lg:col-span-5 space-y-5">
            {/* Promo Code Box */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wide">
                <Tag className="w-4 h-4 text-amber-500" />
                <span>Offers & Coupons</span>
              </div>

              {appliedCoupon ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-xs font-extrabold text-emerald-800 font-mono">
                        {appliedCoupon} APPLIED
                      </span>
                      <p className="text-[11px] text-emerald-700">You saved ₹{discountAmount} on this trip!</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 rounded-xl text-xs font-bold font-mono focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}

              {couponError && <p className="text-xs text-rose-500 font-medium">{couponError}</p>}
            </div>

            {/* Trip Details Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Bus className="w-4 h-4 text-blue-600" />
                <span>Booking Summary</span>
              </h3>

              <div>
                <span className="text-base font-extrabold text-slate-900 font-heading block">
                  {bus.operatorName}
                </span>
                <span className="text-xs text-slate-500">{bus.busType}</span>
              </div>

              <div className="text-xs space-y-2 py-2 border-y border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Route:</span>
                  <span className="font-bold text-slate-800">{bus.fromCity} → {bus.toCity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Journey Date:</span>
                  <span className="font-bold text-slate-800">{new Date(journeyDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Boarding:</span>
                  <span className="font-bold text-slate-800 text-right">{boardingPoint.name} ({boardingPoint.time})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dropping:</span>
                  <span className="font-bold text-slate-800 text-right">{droppingPoint.name} ({droppingPoint.time})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Seats ({selectedSeats.length}):</span>
                  <span className="font-extrabold text-blue-700">{selectedSeats.map((s) => s.number).join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Primary Contact:</span>
                  <span className="font-medium text-slate-700">{contactPhone}</span>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Base Ticket Fare</span>
                  <span className="font-mono">₹{baseFare}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Taxes & GST</span>
                  <span className="font-mono">₹{taxes}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Coupon Discount</span>
                    <span className="font-mono">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-emerald-700 font-mono">₹{finalTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
