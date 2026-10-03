import React, { useState } from 'react';
import {
  HelpCircle,
  PhoneCall,
  Mail,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Send,
  Bot,
  User,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

const FAQS = [
  {
    category: 'Booking & Tickets',
    q: 'How do I download or print my bus ticket?',
    a: 'Once your booking is confirmed, you can instantly download or print your digital ticket from the confirmation screen or by going to "My Bookings" in the top navigation bar. A copy is also sent to your email with a scannable QR code.',
  },
  {
    category: 'Booking & Tickets',
    q: 'Can I book multiple seats for my family?',
    a: 'Yes, you can select up to 6 seats in a single booking session. You can customize the passenger details (Name, Age, Gender) for each reserved seat before proceeding to payment.',
  },
  {
    category: 'Cancellation & Refunds',
    q: 'How does BusGo ticket cancellation work?',
    a: 'You can cancel confirmed tickets from "My Bookings". Cancellations made at least 6 hours before departure are eligible for up to 85% instant refund. Refunds are credited to your original payment method within 2 to 4 hours.',
  },
  {
    category: 'Boarding & Luggage',
    q: 'What are the baggage allowances on interstate buses?',
    a: 'Most bus operators permit up to 2 pieces of medium luggage (up to 20kg total) free of charge to be stored in the luggage compartment, plus 1 small personal cabin bag.',
  },
  {
    category: 'Payments',
    q: 'Which payment methods are accepted on BusGo?',
    a: 'We accept all major UPI apps (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit cards (Visa, MasterCard, RuPay), Net Banking across 50+ Indian banks, and leading digital wallets.',
  },
];

export const HelpSupportPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Chatbot Assistant State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! I am your BusGo Travel Assistant. How can I help you today? You can ask about ticket status, cancellations, or luggage rules.',
      time: '10:00 AM',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    // Generate intelligent instant bot reply
    setTimeout(() => {
      let botResponse = 'Thank you for reaching out! Our dedicated customer support desk is available 24/7 at 1800-BUS-GO.';
      const lower = text.toLowerCase();

      if (lower.includes('cancel') || lower.includes('refund')) {
        botResponse = 'You can cancel any active booking from the "My Bookings" tab. You will receive an instant 85% refund credited within 2-4 hours.';
      } else if (lower.includes('where') || lower.includes('track') || lower.includes('live')) {
        botResponse = 'Live GPS tracking links are sent via SMS 1 hour before departure. You can also view your bus driver contact in "My Bookings".';
      } else if (lower.includes('luggage') || lower.includes('bag') || lower.includes('weight')) {
        botResponse = 'Standard allowance is 20 kg per passenger in the under-deck luggage hold plus a personal cabin bag.';
      } else if (lower.includes('boarding') || lower.includes('stop')) {
        botResponse = 'Please arrive at your selected boarding point 15 minutes before departure. Keep your BusGo digital QR ticket ready on your phone.';
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 700);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
            24/7 Travel Assistance
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            How can we help you today?
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Search answers to common queries or chat with our live automated support bot.
          </p>
        </div>

        {/* Contact Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">Phone Helpline</h3>
            <p className="text-xs text-slate-500">Toll-free customer support</p>
            <span className="text-sm font-extrabold text-blue-700 font-mono block">1800-287-466</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">Email Support</h3>
            <p className="text-xs text-slate-500">Response within 2 hours</p>
            <span className="text-sm font-extrabold text-emerald-700 block">support@busgo.com</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">Road Safety Guarantee</h3>
            <p className="text-xs text-slate-500">Verified operators & drivers</p>
            <span className="text-sm font-extrabold text-indigo-700 block">24/7 SOS Assistance</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Frequently Asked Questions */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 font-heading pb-3 border-b border-slate-100 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span>Frequently Asked Questions</span>
            </h2>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.q}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-bold text-slate-800">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Chatbot Assistant */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[520px]">
            {/* Chatbot Header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-heading">BusGo Assistant</h3>
                  <span className="text-[10px] text-blue-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online & Ready
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex flex-wrap gap-1.5 text-[11px]">
              {['How do I cancel?', 'Baggage limits', 'Where is my bus?'].map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-blue-50 border border-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-xs shadow-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`text-[9px] mt-1 block text-right ${
                        msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about tickets, baggage, etc..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 rounded-xl text-xs focus:outline-hidden"
              />
              <button
                type="submit"
                className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
