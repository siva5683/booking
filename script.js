/**
 * BusGo - Pure Vanilla JavaScript Engine
 * Complete static bus booking system with zero server dependencies.
 */

// ==========================================
// 1. Data Store
// ==========================================

const CITIES = [
  { name: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Bangalore', state: 'Karnataka' },
  { name: 'Hyderabad', state: 'Telangana' },
  { name: 'Coimbatore', state: 'Tamil Nadu' },
  { name: 'Mumbai', state: 'Maharashtra' },
  { name: 'Pune', state: 'Maharashtra' },
  { name: 'Delhi', state: 'Delhi' },
  { name: 'Jaipur', state: 'Rajasthan' },
  { name: 'Goa', state: 'Goa' },
  { name: 'Kochi', state: 'Kerala' },
  { name: 'Madurai', state: 'Tamil Nadu' },
  { name: 'Vijayawada', state: 'Andhra Pradesh' },
  { name: 'Mysore', state: 'Karnataka' }
];

const BUSES_DATA = [
  {
    id: 'bus-1',
    operatorName: 'GreenLine Travels',
    busType: 'AC Sleeper (2+1)',
    category: 'Sleeper',
    isAc: true,
    departureTime: '10:30 PM',
    departureTime24: 22.5,
    arrivalTime: '06:00 AM',
    duration: '7h 30m',
    price: 899,
    originalPrice: 1150,
    rating: 4.8,
    reviews: 1420,
    availableSeats: 16,
    busNumber: 'TN-09-CB-4892',
    amenities: ['Wi-Fi', 'Charging Point', 'Water Bottle', 'Blanket', 'Live Tracking'],
    boardingPoints: [
      { name: 'Koyambedu Bus Stand', time: '09:45 PM', landmark: 'Opposite Metro Station' },
      { name: 'Guindy Kathipara', time: '10:15 PM', landmark: 'Near Flyover' },
      { name: 'Tambaram Sanatorium', time: '10:45 PM', landmark: 'Opposite Hospital' }
    ],
    droppingPoints: [
      { name: 'Electronic City Toll', time: '05:00 AM', landmark: 'Infosys Gate 1' },
      { name: 'Silk Board Junction', time: '05:25 AM', landmark: 'Near Bus Shelter' },
      { name: 'Majestic Bus Stand', time: '06:00 AM', landmark: 'Platform 18' }
    ]
  },
  {
    id: 'bus-2',
    operatorName: 'IntrCity SmartBus',
    busType: 'Volvo 9600 Multi-Axle AC Sleeper',
    category: 'Sleeper',
    isAc: true,
    departureTime: '11:00 PM',
    departureTime24: 23.0,
    arrivalTime: '05:45 AM',
    duration: '6h 45m',
    price: 1199,
    originalPrice: 1499,
    rating: 4.9,
    reviews: 2840,
    availableSeats: 12,
    busNumber: 'KA-01-AJ-8201',
    amenities: ['Wi-Fi', 'Charging Point', 'Water Bottle', 'Blanket', 'Live Tracking', 'Clean Restroom'],
    boardingPoints: [
      { name: 'Koyambedu SmartBus Lounge', time: '10:15 PM', landmark: 'Private Terminal' },
      { name: 'Ashok Pillar', time: '10:35 PM', landmark: 'Metro Station' },
      { name: 'Tambaram Hindu College', time: '11:05 PM', landmark: 'GST Road' }
    ],
    droppingPoints: [
      { name: 'Electronic City Toll', time: '04:50 AM', landmark: 'Phase 1' },
      { name: 'Silk Board Flyover', time: '05:15 AM', landmark: 'Bus Stop' },
      { name: 'Majestic Station', time: '05:45 AM', landmark: 'Platform 1' }
    ]
  },
  {
    id: 'bus-3',
    operatorName: 'SRS Travels',
    busType: 'BharatBenz AC Semi-Sleeper (2+2)',
    category: 'Semi-Sleeper',
    isAc: true,
    departureTime: '06:00 AM',
    departureTime24: 6.0,
    arrivalTime: '01:00 PM',
    duration: '7h 00m',
    price: 649,
    originalPrice: 850,
    rating: 4.4,
    reviews: 910,
    availableSeats: 22,
    busNumber: 'KA-05-D-3190',
    amenities: ['Charging Point', 'Water Bottle', 'Live Tracking'],
    boardingPoints: [
      { name: 'Koyambedu Platform 3', time: '05:30 AM', landmark: 'SRS Office' },
      { name: 'Poonamallee Bypass', time: '06:05 AM', landmark: 'BPCL Petrol Bunk' }
    ],
    droppingPoints: [
      { name: 'Hosur Bus Stand', time: '11:45 AM', landmark: 'Highway Bypass' },
      { name: 'Electronic City', time: '12:20 PM', landmark: 'Toll Gate' },
      { name: 'Majestic SRS Office', time: '01:00 PM', landmark: 'Anand Rao Circle' }
    ]
  },
  {
    id: 'bus-4',
    operatorName: 'Zingbus Electric Plus',
    busType: 'Pure Electric AC Luxury Seater (2+2)',
    category: 'Seater',
    isAc: true,
    departureTime: '02:30 PM',
    departureTime24: 14.5,
    arrivalTime: '09:00 PM',
    duration: '6h 30m',
    price: 699,
    originalPrice: 999,
    rating: 4.7,
    reviews: 1650,
    availableSeats: 18,
    busNumber: 'DL-01-EV-9022',
    amenities: ['Wi-Fi', 'Charging Point', 'Water Bottle', 'Live Tracking'],
    boardingPoints: [
      { name: 'Koyambedu Zingbus Lounge', time: '02:00 PM', landmark: 'Omni Terminal' },
      { name: 'Guindy Kathipara', time: '02:30 PM', landmark: 'Under Flyover' }
    ],
    droppingPoints: [
      { name: 'Electronic City Toll', time: '08:15 PM', landmark: 'Main Gate' },
      { name: 'Koramangala Sony World', time: '08:40 PM', landmark: '80 Feet Road' },
      { name: 'Majestic Bus Stand', time: '09:00 PM', landmark: 'Platform 4' }
    ]
  },
  {
    id: 'bus-5',
    operatorName: 'VRL Travels',
    busType: 'I-Shift Multi-Axle AC Sleeper',
    category: 'Sleeper',
    isAc: true,
    departureTime: '09:45 PM',
    departureTime24: 21.75,
    arrivalTime: '05:15 AM',
    duration: '7h 30m',
    price: 949,
    originalPrice: 1250,
    rating: 4.6,
    reviews: 3100,
    availableSeats: 14,
    busNumber: 'KA-25-F-4901',
    amenities: ['Wi-Fi', 'Charging Point', 'Water Bottle', 'Blanket', 'Live Tracking'],
    boardingPoints: [
      { name: 'Koyambedu VRL Office', time: '09:15 PM', landmark: 'Omni Bus Stand' },
      { name: 'Maduravoyal Bypass', time: '09:45 PM', landmark: 'Near Toll' }
    ],
    droppingPoints: [
      { name: 'Electronic City Toll', time: '04:30 AM', landmark: 'Infosys Exit' },
      { name: 'Silk Board Junction', time: '04:50 AM', landmark: 'Udupi Garden' },
      { name: 'Anand Rao Circle', time: '05:15 AM', landmark: 'VRL Head Office' }
    ]
  },
  {
    id: 'bus-6',
    operatorName: 'KPN Travels',
    busType: 'Non-AC Sleeper (2+1)',
    category: 'Sleeper',
    isAc: false,
    departureTime: '10:00 PM',
    departureTime24: 22.0,
    arrivalTime: '06:15 AM',
    duration: '8h 15m',
    price: 549,
    originalPrice: 700,
    rating: 4.1,
    reviews: 820,
    availableSeats: 20,
    busNumber: 'TN-38-N-9912',
    amenities: ['Charging Point', 'Water Bottle'],
    boardingPoints: [
      { name: 'Koyambedu KPN Office', time: '09:30 PM', landmark: 'Shop 12' },
      { name: 'Tambaram Railway Stand', time: '10:15 PM', landmark: 'East Gate' }
    ],
    droppingPoints: [
      { name: 'Attibele Toll', time: '05:15 AM', landmark: 'Border' },
      { name: 'Electronic City', time: '05:40 AM', landmark: 'Phase 1' },
      { name: 'Majestic KPN Office', time: '06:15 AM', landmark: 'Platform 6' }
    ]
  }
];

const OFFERS_DATA = [
  { code: 'WELCOME20', title: 'First Trip Discount', desc: 'Get 20% instant discount up to ₹250 on your first booking.', type: 'percent', val: 20, max: 250, min: 499 },
  { code: 'BUSGO100', title: 'Flat ₹100 Off', desc: 'Enjoy flat ₹100 discount on bookings above ₹600.', type: 'flat', val: 100, min: 600 },
  { code: 'FESTIVE25', title: 'Luxury Sleeper Special', desc: 'Flat 25% discount up to ₹350 on all AC Sleepers.', type: 'percent', val: 25, max: 350, min: 899 }
];

// ==========================================
// 2. Application State
// ==========================================

let state = {
  currentView: 'home',
  from: 'Chennai',
  to: 'Bangalore',
  date: '2026-10-15',
  passengersCount: 1,
  activeBusId: null,
  activeDeck: 'lower',
  selectedSeats: [],
  selectedBoarding: null,
  selectedDropping: null,
  appliedCoupon: 'BUSGO100',
  discountAmount: 100,
  maxPrice: 1500,
  filterTypes: [],
  filterTimes: [],
  sortOption: 'recommended',
  bookings: JSON.parse(localStorage.getItem('busgo_static_bookings') || '[]'),
  latestBooking: null
};

// Seed initial demo booking if empty
if (state.bookings.length === 0) {
  state.bookings.push({
    id: 'BGO-849102',
    pnr: 'PNR-772910',
    busName: 'GreenLine Travels',
    busType: 'AC Sleeper (2+1)',
    busNumber: 'TN-09-CB-4892',
    from: 'Chennai',
    to: 'Bangalore',
    boarding: 'Koyambedu Bus Stand (09:45 PM)',
    dropping: 'Majestic (06:00 AM)',
    date: '2026-10-20',
    seats: ['L3', 'L4'],
    passengers: [
      { name: 'Rahul Sharma', age: 29, gender: 'male', seatNumber: 'L3' },
      { name: 'Priya Sharma', age: 27, gender: 'female', seatNumber: 'L4' }
    ],
    fare: 1748,
    status: 'confirmed',
    bookingDate: '01 Oct 2026'
  });
  localStorage.setItem('busgo_static_bookings', JSON.stringify(state.bookings));
}

// ==========================================
// 3. UI Helpers & Navigation
// ==========================================

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  if (toast && toastText) {
    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
  }
}

function navigateTo(viewId) {
  state.currentView = viewId;
  const sections = ['home-view', 'results-view', 'bookings-view', 'offers-view', 'help-view'];
  sections.forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = (s === `${viewId}-view`) ? 'block' : 'none';
  });

  // Update nav links active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-view') === viewId);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (viewId === 'results') renderBuses();
  if (viewId === 'bookings') renderBookings();
}

function updateNavBadge() {
  const badge = document.getElementById('bookings-badge');
  if (badge) {
    const count = state.bookings.filter(b => b.status === 'confirmed').length;
    badge.textContent = count > 0 ? count : '0';
  }
}

// ==========================================
// 4. Search & Autocomplete
// ==========================================

function setupSearchInputs() {
  const fromInput = document.getElementById('from-input');
  const toInput = document.getElementById('to-input');
  const fromDropdown = document.getElementById('from-dropdown');
  const toDropdown = document.getElementById('to-dropdown');

  function populateDropdown(dropdown, input, otherInput) {
    const query = input.value.toLowerCase().trim();
    const otherVal = otherInput.value.toLowerCase().trim();
    const matches = CITIES.filter(c => c.name.toLowerCase().includes(query) && c.name.toLowerCase() !== otherVal);

    dropdown.innerHTML = matches.map(c => `
      <div class="dropdown-item" onclick="selectCity('${input.id}', '${c.name}')">
        <span>📍 ${c.name}</span>
        <span class="state">${c.state}</span>
      </div>
    `).join('');
    dropdown.classList.add('show');
  }

  if (fromInput) {
    fromInput.addEventListener('focus', () => populateDropdown(fromDropdown, fromInput, toInput));
    fromInput.addEventListener('input', () => populateDropdown(fromDropdown, fromInput, toInput));
  }
  if (toInput) {
    toInput.addEventListener('focus', () => populateDropdown(toDropdown, toInput, fromInput));
    toInput.addEventListener('input', () => populateDropdown(toDropdown, toInput, fromInput));
  }

  // Click outside to close dropdowns
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#from-input') && !e.target.closest('#from-dropdown')) fromDropdown?.classList.remove('show');
    if (!e.target.closest('#to-input') && !e.target.closest('#to-dropdown')) toDropdown?.classList.remove('show');
  });
}

window.selectCity = function(inputId, cityName) {
  const input = document.getElementById(inputId);
  if (input) {
    input.value = cityName;
    if (inputId === 'from-input') state.from = cityName;
    if (inputId === 'to-input') state.to = cityName;
  }
  document.getElementById('from-dropdown')?.classList.remove('show');
  document.getElementById('to-dropdown')?.classList.remove('show');
};

window.swapCities = function() {
  const temp = state.from;
  state.from = state.to;
  state.to = temp;
  document.getElementById('from-input').value = state.from;
  document.getElementById('to-input').value = state.to;
};

window.selectPopularRoute = function(from, to) {
  state.from = from;
  state.to = to;
  document.getElementById('from-input').value = from;
  document.getElementById('to-input').value = to;
  executeSearch();
};

window.executeSearch = function() {
  state.from = document.getElementById('from-input').value || 'Chennai';
  state.to = document.getElementById('to-input').value || 'Bangalore';
  state.date = document.getElementById('journey-date').value || '2026-10-15';
  state.passengersCount = parseInt(document.getElementById('passengers-select').value) || 1;

  document.getElementById('results-route-title').textContent = `${state.from} → ${state.to}`;
  document.getElementById('results-route-meta').textContent = `Journey Date: ${state.date} · ${state.passengersCount} Passenger(s)`;

  navigateTo('results');
};

// ==========================================
// 5. Bus List & Filtering
// ==========================================

function renderBuses() {
  const listEl = document.getElementById('buses-list');
  if (!listEl) return;

  let filtered = [...BUSES_DATA];

  // Bus Type Filters
  if (state.filterTypes.length > 0) {
    filtered = filtered.filter(b => {
      return state.filterTypes.some(type => {
        if (type === 'AC') return b.isAc;
        if (type === 'Non-AC') return !b.isAc;
        if (type === 'Sleeper') return b.category === 'Sleeper';
        if (type === 'Seater') return b.category === 'Seater';
        return false;
      });
    });
  }

  // Price Filter
  filtered = filtered.filter(b => b.price <= state.maxPrice);

  // Sorting
  if (state.sortOption === 'cheapest') filtered.sort((a,b) => a.price - b.price);
  else if (state.sortOption === 'fastest') filtered.sort((a,b) => a.duration.localeCompare(b.duration));
  else if (state.sortOption === 'earliest') filtered.sort((a,b) => a.departureTime24 - b.departureTime24);
  else if (state.sortOption === 'highest_rated') filtered.sort((a,b) => b.rating - a.rating);

  document.getElementById('buses-count-badge').textContent = `${filtered.length} Buses Available`;

  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div style="background: white; padding: 3rem; text-align: center; border-radius: 1rem; border: 1px solid var(--slate-200);">
        <p style="font-weight: 700; color: var(--slate-800); margin-bottom: 0.5rem;">No buses match your selected filters</p>
        <button class="btn btn-primary btn-sm" onclick="resetFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  listEl.innerHTML = filtered.map(bus => {
    const isExpanded = state.activeBusId === bus.id;
    return `
      <div class="bus-card ${isExpanded ? 'active' : ''}">
        <div class="bus-card-main">
          <div>
            <h3 class="operator-title">${bus.operatorName}</h3>
            <div class="bus-type-meta">${bus.busType} · <span style="font-weight: 700; color: var(--primary);">${bus.isAc ? 'AC' : 'Non-AC'}</span></div>
            <div class="rating-badge">★ ${bus.rating} <span style="font-size: 0.65rem; color: var(--slate-500); font-weight: normal;">(${bus.reviews})</span></div>
          </div>

          <div class="trip-timing-row">
            <div class="time-box">
              <h4>${bus.departureTime}</h4>
              <span>${state.from}</span>
            </div>
            <div class="duration-line">
              <span>${bus.duration}</span>
              <div class="line-bar"></div>
              <span style="color: var(--emerald); font-weight: 700;">Direct</span>
            </div>
            <div class="time-box">
              <h4>${bus.arrivalTime}</h4>
              <span>${state.to}</span>
            </div>
          </div>

          <div class="bus-price-box">
            <div class="fare-number">₹${bus.price}</div>
            <div class="seats-warning">${bus.availableSeats} seats left</div>
            <button class="btn ${isExpanded ? 'btn-outline' : 'btn-primary'} btn-sm" onclick="toggleSeatsView('${bus.id}')">
              ${isExpanded ? 'Hide Seats ▲' : 'View Seats ▼'}
            </button>
          </div>
        </div>

        <div class="bus-card-footer">
          <div class="amenities-list">
            ${bus.amenities.map(a => `<span style="background: var(--slate-100); padding: 2px 8px; border-radius: 4px;">${a}</span>`).join('')}
          </div>
          <div>Bus No: <strong>${bus.busNumber}</strong></div>
        </div>

        ${isExpanded ? renderSeatsDeckHtml(bus) : ''}
      </div>
    `;
  }).join('');
}

window.toggleSeatsView = function(busId) {
  if (state.activeBusId === busId) {
    state.activeBusId = null;
    state.selectedSeats = [];
  } else {
    state.activeBusId = busId;
    state.selectedSeats = [];
    const bus = BUSES_DATA.find(b => b.id === busId);
    if (bus) {
      state.selectedBoarding = bus.boardingPoints[0].name;
      state.selectedDropping = bus.droppingPoints[0].name;
    }
  }
  renderBuses();
};

window.setSort = function(sortType) {
  state.sortOption = sortType;
  document.querySelectorAll('.sort-chip').forEach(c => {
    c.classList.toggle('active', c.getAttribute('data-sort') === sortType);
  });
  renderBuses();
};

window.handleFilterChange = function() {
  const checkboxes = document.querySelectorAll('.type-filter-cb:checked');
  state.filterTypes = Array.from(checkboxes).map(c => c.value);
  const slider = document.getElementById('price-slider');
  if (slider) {
    state.maxPrice = parseInt(slider.value);
    document.getElementById('price-val').textContent = `₹${state.maxPrice}`;
  }
  renderBuses();
};

window.resetFilters = function() {
  document.querySelectorAll('.type-filter-cb').forEach(c => c.checked = false);
  state.filterTypes = [];
  state.maxPrice = 1500;
  const slider = document.getElementById('price-slider');
  if (slider) {
    slider.value = 1500;
    document.getElementById('price-val').textContent = '₹1500';
  }
  renderBuses();
};

// ==========================================
// 6. Interactive Bus Deck & Seat Selection
// ==========================================

function renderSeatsDeckHtml(bus) {
  const isUpper = state.activeDeck === 'upper';
  const prefix = isUpper ? 'U' : 'L';
  const rows = [1, 2, 3, 4, 5, 6];

  const baseFare = state.selectedSeats.length * bus.price;
  const taxes = state.selectedSeats.length > 0 ? 50 : 0;
  const total = baseFare + taxes;

  return `
    <div class="seat-selection-pane">
      <div style="display: flex; justify-content: center; gap: 0.5rem; margin-bottom: 1.25rem;">
        <button class="deck-btn ${!isUpper ? 'active' : ''}" onclick="switchDeck('lower')">Lower Deck (18 Seats)</button>
        <button class="deck-btn ${isUpper ? 'active' : ''}" onclick="switchDeck('upper')">Upper Deck (18 Berths)</button>
      </div>

      <div class="bus-shell">
        <div class="driver-cabin">
          <span>🚍 Front Entrance</span>
          <span>Driver Wheel ⚙️</span>
        </div>

        <div class="seats-grid">
          ${rows.map(r => {
            const s1 = `${prefix}${(r - 1) * 3 + 1}`;
            const s2 = `${prefix}${(r - 1) * 3 + 2}`;
            const s3 = `${prefix}${(r - 1) * 3 + 3}`;

            const isS1Occupied = r === 2;
            const isS1Ladies = r === 4;
            const isS2Occupied = r === 3;
            const isS3Occupied = r === 5;

            const isS1Selected = state.selectedSeats.includes(s1);
            const isS2Selected = state.selectedSeats.includes(s2);
            const isS3Selected = state.selectedSeats.includes(s3);

            return `
              <div class="seat-row">
                <div class="seat-col-left">
                  <div class="seat-item ${isS1Occupied ? 'occupied' : ''} ${isS1Ladies ? 'ladies' : ''} ${isS1Selected ? 'selected' : ''}" onclick="toggleSeat('${s1}', ${isS1Occupied})">
                    ${s1} ${isS1Selected ? '✓' : ''}
                  </div>
                </div>
                <div class="seat-col-aisle">Aisle</div>
                <div class="seat-col-right">
                  <div class="seat-item ${isS2Occupied ? 'occupied' : ''} ${isS2Selected ? 'selected' : ''}" onclick="toggleSeat('${s2}', ${isS2Occupied})">
                    ${s2} ${isS2Selected ? '✓' : ''}
                  </div>
                  <div class="seat-item ${isS3Occupied ? 'occupied' : ''} ${isS3Selected ? 'selected' : ''}" onclick="toggleSeat('${s3}', ${isS3Occupied})">
                    ${s3} ${isS3Selected ? '✓' : ''}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="seat-legend">
          <div class="legend-item"><span class="legend-color" style="background: white;"></span> Available</div>
          <div class="legend-item"><span class="legend-color" style="background: var(--primary);"></span> Selected</div>
          <div class="legend-item"><span class="legend-color" style="background: var(--slate-300);"></span> Booked</div>
          <div class="legend-item"><span class="legend-color" style="background: #fdf2f8; border-color: #f472b6;"></span> Ladies</div>
        </div>
      </div>

      <!-- Boarding / Dropping & Fare Bar -->
      <div style="max-width: 600px; margin: 1.5rem auto 0; background: white; padding: 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--slate-200); box-shadow: var(--shadow-sm);">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; font-size: 0.8rem;">
          <div>
            <label style="font-weight: 700; color: var(--slate-700); display: block; margin-bottom: 0.25rem;">Boarding Point (${state.from})</label>
            <select class="search-input" style="padding: 0.5rem;" onchange="state.selectedBoarding = this.value">
              ${bus.boardingPoints.map(bp => `<option value="${bp.name}">${bp.name} (${bp.time})</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="font-weight: 700; color: var(--slate-700); display: block; margin-bottom: 0.25rem;">Dropping Point (${state.to})</label>
            <select class="search-input" style="padding: 0.5rem;" onchange="state.selectedDropping = this.value">
              ${bus.droppingPoints.map(dp => `<option value="${dp.name}">${dp.name} (${dp.time})</option>`).join('')}
            </select>
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--slate-100); padding-top: 1rem;">
          <div>
            <div style="font-size: 0.8rem; color: var(--slate-500);">
              Selected: <strong style="color: var(--primary);">${state.selectedSeats.length > 0 ? state.selectedSeats.join(', ') : 'None'}</strong>
            </div>
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--slate-900);">Total: ₹${total}</div>
          </div>
          <button class="btn btn-primary" onclick="proceedToPassengerModal('${bus.id}')" ${state.selectedSeats.length === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
            Continue to Passenger Details →
          </button>
        </div>
      </div>
    </div>
  `;
}

window.switchDeck = function(deck) {
  state.activeDeck = deck;
  renderBuses();
};

window.toggleSeat = function(seatNum, isOccupied) {
  if (isOccupied) {
    showToast('This seat is already booked.');
    return;
  }
  const idx = state.selectedSeats.indexOf(seatNum);
  if (idx > -1) {
    state.selectedSeats.splice(idx, 1);
  } else {
    if (state.selectedSeats.length >= 6) {
      showToast('You can select a maximum of 6 seats.');
      return;
    }
    state.selectedSeats.push(seatNum);
  }
  renderBuses();
};

// ==========================================
// 7. Passenger Details & Modal Flow
// ==========================================

window.proceedToPassengerModal = function(busId) {
  if (state.selectedSeats.length === 0) {
    showToast('Please select at least one seat.');
    return;
  }

  const bus = BUSES_DATA.find(b => b.id === busId);
  const container = document.getElementById('passengers-form-container');

  container.innerHTML = state.selectedSeats.map((s, i) => `
    <div style="background: var(--slate-50); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--slate-200); margin-bottom: 0.75rem;">
      <div style="font-size: 0.75rem; font-weight: 800; color: var(--primary); text-transform: uppercase; margin-bottom: 0.5rem;">
        Passenger ${i + 1} · Seat: ${s}
      </div>
      <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 0.5rem;">
        <input type="text" placeholder="Full Name" required class="search-input passenger-name" style="padding: 0.5rem 0.75rem;" value="${i === 0 ? 'Rahul Sharma' : ''}">
        <input type="number" placeholder="Age" min="1" max="100" required class="search-input passenger-age" style="padding: 0.5rem 0.75rem;" value="${i === 0 ? '28' : '25'}">
        <select class="search-input passenger-gender" style="padding: 0.5rem 0.75rem;">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  `).join('');

  document.getElementById('passenger-modal').classList.add('open');
};

window.closePassengerModal = function() {
  document.getElementById('passenger-modal').classList.remove('open');
};

window.proceedToPayment = function(e) {
  e.preventDefault();
  const nameInputs = document.querySelectorAll('.passenger-name');
  const ageInputs = document.querySelectorAll('.passenger-age');
  const genderInputs = document.querySelectorAll('.passenger-gender');

  state.passengers = [];
  for (let i = 0; i < state.selectedSeats.length; i++) {
    const name = nameInputs[i]?.value.trim();
    if (!name) {
      showToast(`Please enter name for Seat ${state.selectedSeats[i]}`);
      return;
    }
    state.passengers.push({
      seatNumber: state.selectedSeats[i],
      name: name,
      age: parseInt(ageInputs[i]?.value) || 25,
      gender: genderInputs[i]?.value || 'male'
    });
  }

  closePassengerModal();
  openPaymentModal();
};

// ==========================================
// 8. Payment & Checkout Simulation
// ==========================================

function openPaymentModal() {
  const bus = BUSES_DATA.find(b => b.id === state.activeBusId);
  if (!bus) return;

  const baseFare = state.selectedSeats.length * bus.price;
  const taxes = 50;
  const total = Math.max(0, baseFare + taxes - state.discountAmount);

  document.getElementById('pay-bus-title').textContent = `${bus.operatorName} (${bus.busType})`;
  document.getElementById('pay-route-info').textContent = `${state.from} → ${state.to} · ${state.date}`;
  document.getElementById('pay-seats-info').textContent = `Seats: ${state.selectedSeats.join(', ')} (${state.selectedSeats.length} Pax)`;
  document.getElementById('pay-base-fare').textContent = `₹${baseFare}`;
  document.getElementById('pay-taxes').textContent = `₹${taxes}`;
  document.getElementById('pay-discount').textContent = `-₹${state.discountAmount}`;
  document.getElementById('pay-total-amount').textContent = `₹${total}`;
  document.getElementById('pay-btn-label').textContent = `Pay ₹${total}`;

  document.getElementById('payment-modal').classList.add('open');
}

window.closePaymentModal = function() {
  document.getElementById('payment-modal').classList.remove('open');
};

window.applyCoupon = function() {
  const code = document.getElementById('coupon-input').value.toUpperCase().trim();
  const found = OFFERS_DATA.find(o => o.code === code);
  if (found) {
    state.appliedCoupon = found.code;
    state.discountAmount = found.val;
    showToast(`Coupon ${found.code} applied! Saved ₹${found.val}`);
    openPaymentModal();
  } else {
    showToast('Invalid coupon code. Try WELCOME20 or BUSGO100.');
  }
};

window.executePayment = function() {
  const btn = document.getElementById('pay-submit-btn');
  btn.innerHTML = 'Processing Secure Payment... ⏳';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = 'Pay Now';
    btn.disabled = false;
    closePaymentModal();

    const bus = BUSES_DATA.find(b => b.id === state.activeBusId);
    const pnr = `PNR-${Math.floor(100000 + Math.random() * 900000)}`;
    const bookingId = `BGO-${Math.floor(100000 + Math.random() * 900000)}`;

    const newBooking = {
      id: bookingId,
      pnr: pnr,
      busName: bus.operatorName,
      busType: bus.busType,
      busNumber: bus.busNumber,
      from: state.from,
      to: state.to,
      boarding: state.selectedBoarding || bus.boardingPoints[0].name,
      dropping: state.selectedDropping || bus.droppingPoints[0].name,
      date: state.date,
      seats: [...state.selectedSeats],
      passengers: [...state.passengers],
      fare: Math.max(0, state.selectedSeats.length * bus.price + 50 - state.discountAmount),
      status: 'confirmed',
      bookingDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    state.bookings.unshift(newBooking);
    localStorage.setItem('busgo_static_bookings', JSON.stringify(state.bookings));
    updateNavBadge();
    state.latestBooking = newBooking;

    openTicketModal(newBooking);
    showToast('🎉 Booking Confirmed Successfully!');
  }, 1500);
};

// ==========================================
// 9. Digital E-Ticket & Confirmation
// ==========================================

window.openTicketModal = function(booking) {
  document.getElementById('ticket-pnr').textContent = booking.pnr;
  document.getElementById('ticket-booking-id').textContent = `ID: ${booking.id}`;
  document.getElementById('ticket-from-city').textContent = booking.from;
  document.getElementById('ticket-boarding-stop').textContent = booking.boarding;
  document.getElementById('ticket-to-city').textContent = booking.to;
  document.getElementById('ticket-dropping-stop').textContent = booking.dropping;
  document.getElementById('ticket-operator').textContent = booking.busName;
  document.getElementById('ticket-vehicle').textContent = booking.busNumber;
  document.getElementById('ticket-fare-paid').textContent = `₹${booking.fare}`;
  document.getElementById('ticket-date').textContent = booking.date;

  const paxContainer = document.getElementById('ticket-passengers-list');
  paxContainer.innerHTML = booking.passengers.map((p, idx) => `
    <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--slate-50); border-radius: 6px; margin-bottom: 0.35rem; font-size: 0.75rem;">
      <span><strong>${idx + 1}. ${p.name}</strong> (${p.gender.toUpperCase()}, ${p.age}y)</span>
      <span style="font-weight: 800; color: var(--primary);">Seat ${p.seatNumber}</span>
    </div>
  `).join('');

  document.getElementById('ticket-modal').classList.add('open');
};

window.closeTicketModal = function() {
  document.getElementById('ticket-modal').classList.remove('open');
};

window.printTicket = function() {
  window.print();
};

window.downloadTicketFile = function() {
  if (!state.latestBooking) return;
  const b = state.latestBooking;
  const content = `
=========================================
            BUSGO E-TICKET
=========================================
PNR: ${b.pnr} | Booking ID: ${b.id}
Operator: ${b.busName} (${b.busType})
Bus Number: ${b.busNumber}
Route: ${b.from} -> ${b.to}
Date: ${b.date}
Boarding: ${b.boarding}
Dropping: ${b.dropping}
Seats: ${b.seats.join(', ')}
Total Fare: ₹${b.fare}
Status: CONFIRMED
Helpline: 1800-BUS-GO | help@busgo.com
=========================================
`;
  const blob = new Blob([content], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `BusGo_Ticket_${b.pnr}.txt`;
  a.click();
  showToast('Downloaded e-ticket file!');
};

// ==========================================
// 10. My Bookings & Cancellation
// ==========================================

function renderBookings() {
  const container = document.getElementById('my-bookings-list');
  if (!container) return;

  if (state.bookings.length === 0) {
    container.innerHTML = `
      <div style="background: white; padding: 3rem; text-align: center; border-radius: 1rem; border: 1px solid var(--slate-200);">
        <p style="color: var(--slate-600); margin-bottom: 1rem;">No bus bookings found.</p>
        <button class="btn btn-primary btn-sm" onclick="navigateTo('home')">Book a Bus</button>
      </div>
    `;
    return;
  }

  container.innerHTML = state.bookings.map(b => {
    const isCancelled = b.status === 'cancelled';
    return `
      <div style="background: white; padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--slate-200); box-shadow: var(--shadow-sm); margin-bottom: 1rem; display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--slate-100); padding-bottom: 0.75rem;">
          <div>
            <h3 style="font-size: 1.1rem; color: var(--slate-900);">${b.from} → ${b.to}</h3>
            <span style="font-size: 0.75rem; color: var(--slate-500);">${b.busName} · ${b.date}</span>
          </div>
          <span style="padding: 4px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; background: ${isCancelled ? 'var(--rose-light); color: var(--rose);' : 'var(--emerald-light); color: var(--emerald);'}">
            ${isCancelled ? 'Cancelled' : 'Confirmed'}
          </span>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem;">
          <div>Seats: <strong>${b.seats.join(', ')}</strong> | PNR: <strong>${b.pnr}</strong></div>
          <div style="font-size: 1.25rem; font-weight: 800; color: var(--slate-900);">₹${b.fare}</div>
        </div>

        <div style="display: flex; gap: 0.5rem; justify-content: flex-end; border-top: 1px solid var(--slate-100); padding-top: 0.75rem;">
          <button class="btn btn-secondary btn-sm" onclick='openTicketModal(${JSON.stringify(b)})'>View Digital Ticket</button>
          ${!isCancelled ? `<button class="btn btn-outline btn-sm" style="color: var(--rose);" onclick="cancelBooking('${b.id}')">Cancel Booking</button>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

window.cancelBooking = function(bookingId) {
  const b = state.bookings.find(item => item.id === bookingId);
  if (!b) return;
  const refund = Math.round(b.fare * 0.85);

  if (confirm(`Are you sure you want to cancel ticket ${b.pnr}? You will receive an instant 85% refund of ₹${refund}.`)) {
    b.status = 'cancelled';
    localStorage.setItem('busgo_static_bookings', JSON.stringify(state.bookings));
    updateNavBadge();
    renderBookings();
    showToast(`Ticket cancelled. ₹${refund} refund processed!`);
  }
};

// ==========================================
// 11. Chatbot Assistant & Offers
// ==========================================

window.sendChatMessage = function(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  const messagesContainer = document.getElementById('chat-messages');

  // Add User Message
  messagesContainer.innerHTML += `
    <div class="chat-bubble user">${text}</div>
  `;
  input.value = '';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Bot response simulation
  setTimeout(() => {
    let reply = "I'm here to help with your bus journey! You can reach our 24/7 hotline at 1800-BUS-GO.";
    const lower = text.toLowerCase();
    if (lower.includes('cancel') || lower.includes('refund')) reply = "You can cancel confirmed tickets in 'My Bookings'. You get an instant 85% refund credited within 2 hours.";
    else if (lower.includes('track') || lower.includes('where')) reply = "Live GPS tracking link will be sent to your mobile phone 1 hour before departure.";
    else if (lower.includes('luggage') || lower.includes('bag')) reply = "Each passenger is allowed up to 20kg of checked luggage plus 1 personal cabin bag.";

    messagesContainer.innerHTML += `
      <div class="chat-bubble bot">🤖 ${reply}</div>
    `;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 600);
};

window.copyCoupon = function(code) {
  navigator.clipboard.writeText(code);
  showToast(`Coupon code ${code} copied to clipboard!`);
};

// ==========================================
// 12. Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  setupSearchInputs();
  updateNavBadge();

  // Set default date to +2 days from now
  const d = new Date();
  d.setDate(d.getDate() + 2);
  const dateStr = d.toISOString().split('T')[0];
  const dateInput = document.getElementById('journey-date');
  if (dateInput) {
    dateInput.value = dateStr;
    state.date = dateStr;
  }

  // Hamburger mobile toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.style.display = (navLinks.style.display === 'flex') ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '70px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'white';
      navLinks.style.padding = '1rem';
      navLinks.style.boxShadow = 'var(--shadow-md)';
    });
  }

  // Navigation click listeners
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = link.getAttribute('data-view');
      navigateTo(view);
      if (window.innerWidth <= 768 && navLinks) navLinks.style.display = 'none';
    });
  });
});
