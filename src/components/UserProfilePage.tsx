import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CreditCard,
  Users,
  Compass,
  Award,
  Plus,
  Trash2,
  Check,
} from 'lucide-react';
import { UserProfile, Booking } from '../types/bus';

interface UserProfilePageProps {
  user: UserProfile;
  bookings: Booking[];
  onUpdateUser: (updated: UserProfile) => void;
  onShowToast: (msg: string) => void;
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({
  user,
  bookings,
  onUpdateUser,
  onShowToast,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [city, setCity] = useState(user.city);

  // New passenger modal/input state
  const [showAddPassenger, setShowAddPassenger] = useState(false);
  const [newPName, setNewPName] = useState('');
  const [newPAge, setNewPAge] = useState(25);
  const [newPGender, setNewPGender] = useState<'male' | 'female' | 'other'>('male');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      email,
      phone,
      city,
    });
    onShowToast('Profile information updated successfully!');
  };

  const handleAddPassenger = () => {
    if (!newPName.trim()) return;
    const updated = [
      ...user.savedPassengers,
      { name: newPName, age: newPAge, gender: newPGender },
    ];
    onUpdateUser({ ...user, savedPassengers: updated });
    setNewPName('');
    setShowAddPassenger(false);
    onShowToast('Added passenger to saved list');
  };

  const handleDeletePassenger = (index: number) => {
    const updated = user.savedPassengers.filter((_, i) => i !== index);
    onUpdateUser({ ...user, savedPassengers: updated });
    onShowToast('Removed passenger from saved list');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-sky-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                  {user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  {user.tier} Member
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Member since {user.memberSince} · {user.city}, India
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
            <div className="text-center px-4 py-2 bg-slate-50 rounded-2xl border border-slate-200/70">
              <span className="text-xl font-extrabold text-blue-700 font-mono block">
                {bookings.length}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total Trips</span>
            </div>
            <div className="text-center px-4 py-2 bg-slate-50 rounded-2xl border border-slate-200/70">
              <span className="text-xl font-extrabold text-emerald-600 font-mono block">
                2,450
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">KMs Travelled</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Edit Profile Details */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Personal Information
              </h3>
              <p className="text-xs text-slate-500">
                Update your contact details for tickets and trip alerts.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:border-blue-600 focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:border-blue-600 focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:border-blue-600 focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Home City</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:border-blue-600 focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Right: Saved Passengers & Payment */}
          <div className="lg:col-span-5 space-y-6">
            {/* Saved Passengers */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900 font-heading">
                    Saved Passengers ({user.savedPassengers.length})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddPassenger(!showAddPassenger)}
                  className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {/* Add Passenger Form toggle */}
              {showAddPassenger && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 animate-in fade-in">
                  <span className="text-xs font-bold text-slate-800 block">Add New Passenger</span>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={newPName}
                    onChange={(e) => setNewPName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Age"
                      value={newPAge}
                      onChange={(e) => setNewPAge(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                    />
                    <select
                      value={newPGender}
                      onChange={(e) => setNewPGender(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddPassenger}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700"
                  >
                    Save Passenger
                  </button>
                </div>
              )}

              {/* Passenger list */}
              <div className="space-y-2">
                {user.savedPassengers.map((p, idx) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-800 block">{p.name}</span>
                      <span className="text-[11px] text-slate-400 capitalize">
                        {p.gender} · {p.age} years
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeletePassenger(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Delete passenger"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Payment Methods */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900 font-heading">
                  Saved UPI Handles
                </h3>
              </div>

              <div className="space-y-2">
                {user.savedUpi.map((upi) => (
                  <div
                    key={upi}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800 flex items-center justify-between"
                  >
                    <span>{upi}</span>
                    <span className="text-[10px] text-emerald-600 font-sans font-semibold">Primary</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
