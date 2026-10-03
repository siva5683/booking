import React from 'react';
import { Tag, Copy, Check, Clock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { OFFERS } from '../data/mockBusData';
import { Offer } from '../types/bus';

interface OffersPageProps {
  onUseOffer: (offerCode: string) => void;
  onShowToast: (msg: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({ onUseOffer, onShowToast }) => {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onShowToast(`Coupon code ${code} copied!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-10 text-white mb-10 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />
          <div className="max-w-xl relative z-10 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-bold text-amber-300 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5" /> Best Travel Deals
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight">
              Exclusive Discounts & Bus Coupons
            </h1>
            <p className="text-sm text-blue-100 leading-relaxed">
              Save more on every journey across India with BusGo verified promo codes. Instant discounts at checkout.
            </p>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {OFFERS.map((offer) => (
            <div
              key={offer.code}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-extrabold text-[11px] tracking-wide border border-blue-200">
                    {offer.badge}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Valid till {offer.validTill}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                  {offer.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {offer.description}
                </p>

                <div className="text-[11px] text-slate-500 font-medium pt-1">
                  * Minimum booking amount: <strong>₹{offer.minBookingAmount}</strong>
                  {offer.maxDiscount && ` · Max discount: ₹${offer.maxDiscount}`}
                </div>
              </div>

              {/* Coupon Code Pill & CTA */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 p-1.5 pl-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
                  <span className="font-mono font-extrabold text-xs text-slate-800 tracking-wider">
                    {offer.code}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(offer.code)}
                    className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 transition-colors cursor-pointer"
                    title="Copy coupon code"
                  >
                    {copiedCode === offer.code ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onUseOffer(offer.code)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                >
                  <span>Book With Offer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits bar */}
        <div className="mt-12 bg-white rounded-3xl p-6 border border-slate-200 text-center grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3">
            <span className="text-sm font-bold text-slate-900 block">Instant Discount</span>
            <span className="text-xs text-slate-500">No waiting for cashbacks. Price drops right at payment.</span>
          </div>
          <div className="p-3 border-y sm:border-y-0 sm:border-x border-slate-100">
            <span className="text-sm font-bold text-slate-900 block">Zero Hidden Charges</span>
            <span className="text-xs text-slate-500">Transparent pricing with state road taxes included.</span>
          </div>
          <div className="p-3">
            <span className="text-sm font-bold text-slate-900 block">Reward Points</span>
            <span className="text-xs text-slate-500">Earn BusGo Coins on every trip and redeem for free rides.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
