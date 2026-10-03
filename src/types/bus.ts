export interface City {
  id: string;
  name: string;
  state: string;
  code: string;
  popular?: boolean;
}

export interface BoardingPoint {
  id: string;
  name: string;
  time: string;
  address: string;
  landmark?: string;
}

export interface DroppingPoint {
  id: string;
  name: string;
  time: string;
  address: string;
  landmark?: string;
}

export interface Seat {
  id: string;
  number: string;
  deck: 'lower' | 'upper';
  type: 'sleeper' | 'seater';
  status: 'available' | 'occupied' | 'female_reserved';
  price: number;
  row: number;
  col: number; // 0: left window, 1: left aisle, 2: aisle space, 3: right window/aisle, 4: right window
}

export interface Bus {
  id: string;
  operatorName: string;
  busType: string;
  category: 'Sleeper' | 'Semi-Sleeper' | 'Seater';
  isAc: boolean;
  fromCity: string;
  toCity: string;
  departureTime: string;
  departureTime24: number; // 0 to 24 for filtering
  arrivalTime: string;
  arrivalTime24: number;
  duration: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  availableSeatsCount: number;
  totalSeats: number;
  amenities: string[];
  boardingPoints: BoardingPoint[];
  droppingPoints: DroppingPoint[];
  busNumber: string;
  cancellationPolicy: string;
  seats: Seat[];
}

export interface Passenger {
  seatNumber: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
}

export interface Booking {
  id: string;
  pnr: string;
  bus: Bus;
  journeyDate: string;
  fromCity: string;
  toCity: string;
  boardingPoint: BoardingPoint;
  droppingPoint: DroppingPoint;
  passengers: Passenger[];
  contactEmail: string;
  contactPhone: string;
  baseFare: number;
  taxes: number;
  discount: number;
  couponCode?: string;
  totalAmount: number;
  paymentMethod: string;
  bookingDate: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  cancellationRefund?: number;
  cancelledAt?: string;
  qrCodePayload: string;
}

export interface SearchState {
  from: string;
  to: string;
  date: string;
  returnDate?: string;
  passengersCount: number;
}

export interface Offer {
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  maxDiscount?: number;
  minBookingAmount: number;
  validTill: string;
  badge: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
  tier: 'Silver' | 'Gold' | 'Platinum';
  memberSince: string;
  savedPassengers: Array<{ name: string; age: number; gender: 'male' | 'female' | 'other' }>;
  savedUpi: string[];
}
