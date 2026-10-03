import { City, Bus, Offer, UserProfile, Booking, Seat } from '../types/bus';

export const CITIES: City[] = [
  { id: '1', name: 'Chennai', state: 'Tamil Nadu', code: 'MAA', popular: true },
  { id: '2', name: 'Bangalore', state: 'Karnataka', code: 'BLR', popular: true },
  { id: '3', name: 'Hyderabad', state: 'Telangana', code: 'HYD', popular: true },
  { id: '4', name: 'Coimbatore', state: 'Tamil Nadu', code: 'CJB', popular: true },
  { id: '5', name: 'Mumbai', state: 'Maharashtra', code: 'BOM', popular: true },
  { id: '6', name: 'Pune', state: 'Maharashtra', code: 'PNQ', popular: true },
  { id: '7', name: 'Delhi', state: 'Delhi', code: 'DEL', popular: true },
  { id: '8', name: 'Jaipur', state: 'Rajasthan', code: 'JAI', popular: true },
  { id: '9', name: 'Goa', state: 'Goa', code: 'GOI', popular: true },
  { id: '10', name: 'Kochi', state: 'Kerala', code: 'COK', popular: true },
  { id: '11', name: 'Madurai', state: 'Tamil Nadu', code: 'IXM', popular: false },
  { id: '12', name: 'Vijayawada', state: 'Andhra Pradesh', code: 'VGA', popular: false },
  { id: '13', name: 'Mysore', state: 'Karnataka', code: 'MYQ', popular: false },
  { id: '14', name: 'Tirupati', state: 'Andhra Pradesh', code: 'TIR', popular: false },
  { id: '15', name: 'Kolkata', state: 'West Bengal', code: 'CCU', popular: false },
];

export const POPULAR_ROUTES = [
  { from: 'Chennai', to: 'Bangalore', duration: '6h 30m', startingPrice: 599 },
  { from: 'Bangalore', to: 'Hyderabad', duration: '8h 45m', startingPrice: 799 },
  { from: 'Chennai', to: 'Coimbatore', duration: '7h 15m', startingPrice: 649 },
  { from: 'Mumbai', to: 'Pune', duration: '3h 30m', startingPrice: 349 },
  { from: 'Delhi', to: 'Jaipur', duration: '5h 15m', startingPrice: 449 },
  { from: 'Hyderabad', to: 'Bangalore', duration: '8h 30m', startingPrice: 749 },
];

// Helper to generate a realistic seat grid
export function generateBusSeats(busType: 'Sleeper' | 'Semi-Sleeper' | 'Seater', basePrice: number): Seat[] {
  const seats: Seat[] = [];
  const isSleeper = busType === 'Sleeper';

  // Lower Deck (Rows 1 to 6)
  for (let row = 1; row <= 6; row++) {
    // Left single column (window)
    const l1Number = `L${(row - 1) * 3 + 1}`;
    seats.push({
      id: `lower-${l1Number}`,
      number: l1Number,
      deck: 'lower',
      type: isSleeper ? 'sleeper' : 'seater',
      status: row === 2 ? 'occupied' : row === 4 ? 'female_reserved' : 'available',
      price: basePrice,
      row,
      col: 0,
    });

    // Right double column
    const l2Number = `L${(row - 1) * 3 + 2}`;
    seats.push({
      id: `lower-${l2Number}`,
      number: l2Number,
      deck: 'lower',
      type: isSleeper ? 'sleeper' : 'seater',
      status: row === 3 || row === 5 ? 'occupied' : 'available',
      price: basePrice,
      row,
      col: 2,
    });

    const l3Number = `L${(row - 1) * 3 + 3}`;
    seats.push({
      id: `lower-${l3Number}`,
      number: l3Number,
      deck: 'lower',
      type: isSleeper ? 'sleeper' : 'seater',
      status: row === 1 || row === 6 ? 'occupied' : 'available',
      price: basePrice,
      row,
      col: 3,
    });
  }

  // Upper Deck (Rows 1 to 6) - only for sleeper
  if (isSleeper) {
    for (let row = 1; row <= 6; row++) {
      const u1Number = `U${(row - 1) * 3 + 1}`;
      seats.push({
        id: `upper-${u1Number}`,
        number: u1Number,
        deck: 'upper',
        type: 'sleeper',
        status: row === 1 ? 'occupied' : row === 3 ? 'female_reserved' : 'available',
        price: basePrice + 100, // Upper sleeper premium
        row,
        col: 0,
      });

      const u2Number = `U${(row - 1) * 3 + 2}`;
      seats.push({
        id: `upper-${u2Number}`,
        number: u2Number,
        deck: 'upper',
        type: 'sleeper',
        status: row === 2 || row === 4 ? 'occupied' : 'available',
        price: basePrice + 100,
        row,
        col: 2,
      });

      const u3Number = `U${(row - 1) * 3 + 3}`;
      seats.push({
        id: `upper-${u3Number}`,
        number: u3Number,
        deck: 'upper',
        type: 'sleeper',
        status: row === 5 ? 'occupied' : 'available',
        price: basePrice + 100,
        row,
        col: 3,
      });
    }
  }

  return seats;
}

export const SAMPLE_BUSES: Bus[] = [
  {
    id: 'bus-1',
    operatorName: 'GreenLine Travels',
    busType: 'AC Sleeper (2+1)',
    category: 'Sleeper',
    isAc: true,
    fromCity: 'Chennai',
    toCity: 'Bangalore',
    departureTime: '10:30 PM',
    departureTime24: 22.5,
    arrivalTime: '06:00 AM',
    arrivalTime24: 6.0,
    duration: '7h 30m',
    price: 899,
    originalPrice: 1150,
    rating: 4.8,
    reviewCount: 1420,
    availableSeatsCount: 16,
    totalSeats: 36,
    amenities: ['Wi-Fi', 'Charging Point', 'Water Bottle', 'Blanket', 'Live Tracking', 'Reading Light', 'Emergency Exit'],
    boardingPoints: [
      { id: 'b1', name: 'Koyambedu Bus Stand', time: '09:45 PM', address: 'Gate 4, Private Bus Terminus', landmark: 'Opposite Metro Station' },
      { id: 'b2', name: 'Guindy', time: '10:15 PM', address: 'Guindy Industrial Estate Bus Stop', landmark: 'Near Guindy Flyover' },
      { id: 'b3', name: 'Tambaram', time: '10:45 PM', address: 'Tambaram Sanatorium Bus Stand', landmark: 'Opposite Railway Hospital' },
      { id: 'b4', name: 'Sriperumbudur', time: '11:15 PM', address: 'Toll Plaza', landmark: 'NH4 Highway' },
    ],
    droppingPoints: [
      { id: 'd1', name: 'Electronic City', time: '05:00 AM', address: 'Toll Plaza Toll Gate 1', landmark: 'Near Infosys Gate 1' },
      { id: 'd2', name: 'Silk Board', time: '05:25 AM', address: 'Silk Board Junction Flyover Landing', landmark: 'Near Bus Stop' },
      { id: 'd3', name: 'Madiwala', time: '05:40 AM', address: 'Greenline Travel Lounge', landmark: 'Opposite Police Station' },
      { id: 'd4', name: 'Majestic', time: '06:00 AM', address: 'Kempegowda Bus Station Terminal 3', landmark: 'Platform 18' },
    ],
    busNumber: 'TN-09-CB-4892',
    cancellationPolicy: 'Free cancellation up to 6 hours before departure. 50% refund between 2 to 6 hours.',
    seats: generateBusSeats('Sleeper', 899),
  },
  {
    id: 'bus-2',
    operatorName: 'IntrCity SmartBus',
    busType: 'Volvo 9600 Multi-Axle AC Sleeper (Washroom)',
    category: 'Sleeper',
    isAc: true,
    fromCity: 'Chennai',
    toCity: 'Bangalore',
    departureTime: '11:00 PM',
    departureTime24: 23.0,
    arrivalTime: '05:45 AM',
    arrivalTime24: 5.75,
    duration: '6h 45m',
    price: 1199,
    originalPrice: 1499,
    rating: 4.9,
    reviewCount: 2840,
    availableSeatsCount: 12,
    totalSeats: 36,
    amenities: ['Wi-Fi', 'Charging Point', 'Water Bottle', 'Blanket', 'Live Tracking', 'Clean Restroom', 'Movie Screen'],
    boardingPoints: [
      { id: 'b1', name: 'Koyambedu Bus Stand', time: '10:15 PM', address: 'IntrCity SmartBus Lounge', landmark: 'Omni Bus Stand' },
      { id: 'b2', name: 'Ashok Nagar', time: '10:35 PM', address: 'Ashok Pillar Metro Stop', landmark: 'Opposite Pillar' },
      { id: 'b3', name: 'Tambaram', time: '11:05 PM', address: 'Tambaram Hindu College', landmark: 'GST Road' },
    ],
    droppingPoints: [
      { id: 'd1', name: 'Electronic City', time: '04:50 AM', address: 'Elevated Highway Toll', landmark: 'Phase 1' },
      { id: 'd2', name: 'Silk Board', time: '05:15 AM', address: 'Central Silk Board Flyover', landmark: 'Bus Shelter' },
      { id: 'd3', name: 'Indiranagar', time: '05:35 AM', address: 'CMH Road Junction', landmark: 'Metro Pillar 72' },
      { id: 'd4', name: 'Majestic', time: '05:45 AM', address: 'Subhash Nagar Metro Exit', landmark: 'Platform 1' },
    ],
    busNumber: 'KA-01-AJ-8201',
    cancellationPolicy: 'Full refund if cancelled before 12 hours. Reschedule allowed once free of charge.',
    seats: generateBusSeats('Sleeper', 1199),
  },
  {
    id: 'bus-3',
    operatorName: 'SRS Travels',
    busType: 'BharatBenz AC Semi-Sleeper (2+2)',
    category: 'Semi-Sleeper',
    isAc: true,
    fromCity: 'Chennai',
    toCity: 'Bangalore',
    departureTime: '06:00 AM',
    departureTime24: 6.0,
    arrivalTime: '01:00 PM',
    arrivalTime24: 13.0,
    duration: '7h 00m',
    price: 649,
    originalPrice: 850,
    rating: 4.4,
    reviewCount: 910,
    availableSeatsCount: 22,
    totalSeats: 40,
    amenities: ['Charging Point', 'Water Bottle', 'Live Tracking', 'Emergency Exit'],
    boardingPoints: [
      { id: 'b1', name: 'Koyambedu', time: '05:30 AM', address: 'SRS Office Platform 3', landmark: 'Near Bus Stand' },
      { id: 'b2', name: 'Poonamallee', time: '06:05 AM', address: 'Poonamallee Bypass', landmark: 'BPCL Petrol Bunk' },
    ],
    droppingPoints: [
      { id: 'd1', name: 'Hosur', time: '11:45 AM', address: 'Hosur Bus Stand', landmark: 'Highway Bypass' },
      { id: 'd2', name: 'Electronic City', time: '12:20 PM', address: 'Toll Gate', landmark: 'Phase 1' },
      { id: 'd3', name: 'Majestic', time: '01:00 PM', address: 'SRS Majestic Office', landmark: 'Near Anand Rao Circle' },
    ],
    busNumber: 'KA-05-D-3190',
    cancellationPolicy: 'Cancellation fee of 20% applicable up to 2 hours before trip.',
    seats: generateBusSeats('Semi-Sleeper', 649),
  },
  {
    id: 'bus-4',
    operatorName: 'Zingbus Electric Plus',
    busType: 'Pure Electric AC Luxury Seater (2+2)',
    category: 'Seater',
    isAc: true,
    fromCity: 'Chennai',
    toCity: 'Bangalore',
    departureTime: '02:30 PM',
    departureTime24: 14.5,
    arrivalTime: '09:00 PM',
    arrivalTime24: 21.0,
    duration: '6h 30m',
    price: 699,
    originalPrice: 999,
    rating: 4.7,
    reviewCount: 1650,
    availableSeatsCount: 18,
    totalSeats: 42,
    amenities: ['Wi-Fi', 'Charging Point', 'Water Bottle', 'Live Tracking', 'Quiet Cabin', 'USB Ports'],
    boardingPoints: [
      { id: 'b1', name: 'Koyambedu', time: '02:00 PM', address: 'Zingbus Premium Lounge', landmark: 'Private Terminal' },
      { id: 'b2', name: 'Guindy', time: '02:30 PM', address: 'Guindy Kathipara Junction', landmark: 'Under Flyover' },
    ],
    droppingPoints: [
      { id: 'd1', name: 'Electronic City', time: '08:15 PM', address: 'Toll Plaza', landmark: 'Main Gate' },
      { id: 'd2', name: 'Koramangala', time: '08:40 PM', address: 'Sony World Signal', landmark: '80 Feet Road' },
      { id: 'd3', name: 'Majestic', time: '09:00 PM', address: 'Kempegowda Station', landmark: 'Platform 4' },
    ],
    busNumber: 'DL-01-EV-9022',
    cancellationPolicy: '100% refund up to 4 hours before departure.',
    seats: generateBusSeats('Seater', 699),
  },
  {
    id: 'bus-5',
    operatorName: 'VRL Travels',
    busType: 'I-Shift Multi-Axle AC Sleeper',
    category: 'Sleeper',
    isAc: true,
    fromCity: 'Chennai',
    toCity: 'Bangalore',
    departureTime: '09:45 PM',
    departureTime24: 21.75,
    arrivalTime: '05:15 AM',
    arrivalTime24: 5.25,
    duration: '7h 30m',
    price: 949,
    originalPrice: 1250,
    rating: 4.6,
    reviewCount: 3100,
    availableSeatsCount: 14,
    totalSeats: 36,
    amenities: ['Wi-Fi', 'Charging Point', 'Water Bottle', 'Blanket', 'Live Tracking', 'Emergency Exit'],
    boardingPoints: [
      { id: 'b1', name: 'Koyambedu', time: '09:15 PM', address: 'VRL Booking Office', landmark: 'Omni Bus Stand' },
      { id: 'b2', name: 'Maduravoyal', time: '09:45 PM', address: 'Bypass Flyover', landmark: 'Near Toll' },
    ],
    droppingPoints: [
      { id: 'd1', name: 'Electronic City', time: '04:30 AM', address: 'Main Toll Gate', landmark: 'Infosys Exit' },
      { id: 'd2', name: 'Silk Board', time: '04:50 AM', address: 'Flyover Junction', landmark: 'Near Udupi Garden' },
      { id: 'd3', name: 'Anand Rao Circle', time: '05:15 AM', address: 'VRL Head Office', landmark: 'Near Majestic' },
    ],
    busNumber: 'KA-25-F-4901',
    cancellationPolicy: 'Standard VRL cancellation terms apply.',
    seats: generateBusSeats('Sleeper', 949),
  },
  {
    id: 'bus-6',
    operatorName: 'KPN Travels',
    busType: 'Non-AC Sleeper (2+1)',
    category: 'Sleeper',
    isAc: false,
    fromCity: 'Chennai',
    toCity: 'Bangalore',
    departureTime: '10:00 PM',
    departureTime24: 22.0,
    arrivalTime: '06:15 AM',
    arrivalTime24: 6.25,
    duration: '8h 15m',
    price: 549,
    originalPrice: 700,
    rating: 4.1,
    reviewCount: 820,
    availableSeatsCount: 20,
    totalSeats: 36,
    amenities: ['Charging Point', 'Water Bottle', 'Emergency Exit'],
    boardingPoints: [
      { id: 'b1', name: 'Koyambedu', time: '09:30 PM', address: 'KPN Office', landmark: 'Shop 12' },
      { id: 'b2', name: 'Tambaram', time: '10:15 PM', address: 'Railway Station Stand', landmark: 'East Gate' },
    ],
    droppingPoints: [
      { id: 'd1', name: 'Attibele', time: '05:15 AM', address: 'Attibele Toll', landmark: 'Border' },
      { id: 'd2', name: 'Electronic City', time: '05:40 AM', address: 'Toll Gate', landmark: 'Phase 1' },
      { id: 'd3', name: 'Majestic', time: '06:15 AM', address: 'KPN Majestic Office', landmark: 'Platform 6' },
    ],
    busNumber: 'TN-38-N-9912',
    cancellationPolicy: 'Standard cancellation policy.',
    seats: generateBusSeats('Sleeper', 549),
  },
];

export const OFFERS: Offer[] = [
  {
    code: 'WELCOME20',
    title: 'First Trip Discount',
    description: 'Get 20% instant discount up to ₹250 on your first bus booking with BusGo.',
    discountType: 'percentage',
    discountValue: 20,
    maxDiscount: 250,
    minBookingAmount: 499,
    validTill: '31 Dec 2026',
    badge: 'NEW USER',
  },
  {
    code: 'BUSGO100',
    title: 'Flat ₹100 Off',
    description: 'Enjoy a flat ₹100 discount on any route across India on bookings above ₹600.',
    discountType: 'flat',
    discountValue: 100,
    minBookingAmount: 600,
    validTill: '31 Oct 2026',
    badge: 'POPULAR',
  },
  {
    code: 'FESTIVE25',
    title: 'Luxury Sleeper Special',
    description: 'Flat 25% discount up to ₹350 on all AC Sleeper and Multi-Axle Volvo buses.',
    discountType: 'percentage',
    discountValue: 25,
    maxDiscount: 350,
    minBookingAmount: 899,
    validTill: '15 Nov 2026',
    badge: 'PREMIUM',
  },
  {
    code: 'RETURN15',
    title: 'Round Trip Savings',
    description: 'Save 15% up to ₹200 when booking return tickets together.',
    discountType: 'percentage',
    discountValue: 15,
    maxDiscount: 200,
    minBookingAmount: 799,
    validTill: '31 Dec 2026',
    badge: 'ROUND TRIP',
  },
];

export const DEMO_USER: UserProfile = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91 98765 43210',
  city: 'Bangalore',
  tier: 'Gold',
  memberSince: 'March 2024',
  savedPassengers: [
    { name: 'Rahul Sharma', age: 29, gender: 'male' },
    { name: 'Priya Sharma', age: 27, gender: 'female' },
    { name: 'Anil Kumar', age: 58, gender: 'male' },
  ],
  savedUpi: ['rahul@okhdfcbank', '9876543210@paytm'],
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BGO-849102',
    pnr: 'PNR-772910',
    bus: SAMPLE_BUSES[0],
    journeyDate: '2026-10-12',
    fromCity: 'Chennai',
    toCity: 'Bangalore',
    boardingPoint: SAMPLE_BUSES[0].boardingPoints[0],
    droppingPoint: SAMPLE_BUSES[0].droppingPoints[3],
    passengers: [
      { seatNumber: 'L3', name: 'Rahul Sharma', age: 29, gender: 'male' },
      { seatNumber: 'L4', name: 'Priya Sharma', age: 27, gender: 'female' },
    ],
    contactEmail: 'rahul.sharma@example.com',
    contactPhone: '+91 98765 43210',
    baseFare: 1798,
    taxes: 50,
    discount: 100,
    couponCode: 'BUSGO100',
    totalAmount: 1748,
    paymentMethod: 'UPI (rahul@okhdfcbank)',
    bookingDate: '01 Oct 2026, 04:30 PM',
    status: 'confirmed',
    qrCodePayload: 'BUSGO-PNR-772910-CHENN-BLR-20261012',
  },
  {
    id: 'BGO-712093',
    pnr: 'PNR-491204',
    bus: SAMPLE_BUSES[3],
    journeyDate: '2026-09-18',
    fromCity: 'Mumbai',
    toCity: 'Pune',
    boardingPoint: {
      id: 'mb1',
      name: 'Dadar Asiad Bus Stand',
      time: '08:00 AM',
      address: 'Swami Vivekananda Road',
      landmark: 'Near Railway Station',
    },
    droppingPoint: {
      id: 'pn1',
      name: 'Shivajinagar',
      time: '11:30 AM',
      address: 'Shivajinagar Bus Terminal',
      landmark: 'Gate 2',
    },
    passengers: [
      { seatNumber: 'L2', name: 'Rahul Sharma', age: 29, gender: 'male' },
    ],
    contactEmail: 'rahul.sharma@example.com',
    contactPhone: '+91 98765 43210',
    baseFare: 699,
    taxes: 35,
    discount: 0,
    totalAmount: 734,
    paymentMethod: 'Credit Card (ending 4242)',
    bookingDate: '15 Sep 2026, 11:15 AM',
    status: 'completed',
    qrCodePayload: 'BUSGO-PNR-491204-MUM-PUN-20260918',
  },
];
