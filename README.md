# BusGo - Online Bus Ticket Booking Platform

[![React](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-purple?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**BusGo** is a modern, responsive, and feature-complete bus ticket booking web application. It allows users to search for buses across major routes, compare operators, select seats from an interactive bus deck, enter passenger details, simulate secure payments with coupons, and generate digital boarding passes with QR codes.

---

## 🌟 Key Features

- **Intuitive Search & Route Selection**:
  - Departure and destination city selection with instant autocomplete.
  - Quick-swap button to interchange origin and destination.
  - Pre-configured popular routes (*Chennai → Bangalore*, *Bangalore → Hyderabad*, *Mumbai → Pune*, *Delhi → Jaipur*, etc.).
  - Date pickers and multi-passenger count selector.

- **Smart Search Results & Multi-level Filters**:
  - Compare bus operators (*GreenLine Travels, IntrCity SmartBus, SRS Travels, Zingbus, VRL Travels, KPN Travels*).
  - Filter by **Bus Type** (*AC, Non-AC, Sleeper, Semi-Sleeper, Seater*).
  - Filter by **Departure Time** (*Before 6 AM, 6 AM–12 PM, 12 PM–6 PM, After 6 PM*).
  - Interactive **Price Range Slider** (₹400 – ₹1,500).
  - Filter by **Amenities** (*Wi-Fi, Charging Point, Water Bottle, Blanket, Live GPS Tracking, Clean Restroom*).
  - Sorting by *Recommended*, *Cheapest*, *Fastest*, *Earliest Departure*, and *Highest Rated*.

- **Visual Bus Layout & Seat Selection**:
  - Realistic bus deck interface with driver cabin wheel.
  - Multi-deck support: **Lower Deck** & **Upper Deck** for Sleeper buses, or standard 2+2 layout for Seaters.
  - Clear seat state legends: 🟢 Available, 🔵 Selected, ⚫ Booked, 🟣 Reserved for Ladies.
  - Integrated Boarding & Dropping point selector with exact pickup times and landmarks.
  - Real-time fare and tax calculation.

- **Passenger Details & Autofill**:
  - Dynamic forms for each reserved seat (Name, Age, Gender).
  - 1-click autofill from saved travelers for authenticated users.
  - Contact information inputs for SMS alerts and e-ticket delivery.

- **Multi-method Checkout & Coupon Engine**:
  - **UPI**: Dynamic QR Code for Google Pay, PhonePe, Paytm, plus VPA input.
  - **Cards**: Credit/Debit card form with live formatting and CVV security.
  - **Net Banking**: HDFC, SBI, ICICI, Axis, Kotak.
  - **Wallets**: Paytm, Amazon Pay, PhonePe.
  - Coupon support: Apply promo codes like `WELCOME20` (20% off) or `BUSGO100` (flat ₹100 off).

- **Digital E-Ticket & Confirmation**:
  - Official-style digital boarding pass with unique PNR and Booking ID.
  - Embedded scannable QR Code.
  - **Download Ticket** (saves a clean text/PDF e-ticket).
  - **Print Ticket** with optimized `@media print` layout.
  - **Email Ticket** action with feedback toast.

- **My Bookings Dashboard**:
  - **Upcoming Trips** & **Past Trips** tabs.
  - Instant ticket cancellation with automated refund calculation (85% refund policy).

- **Help Desk & Live Chatbot**:
  - Categorized FAQ accordions.
  - Automated **BusGo Assistant** chatbot providing instant answers for luggage policies, tracking, and cancellations.

---

## 🚀 How to Host on GitHub (GitHub Pages)

This repository includes a pre-configured GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys your site whenever you push to `main` or `master`.

### Step 1: Push to GitHub

1. Create a new repository on [GitHub](https://github.com/new) (e.g. `busgo`).
2. In your local terminal, initialize git (if not already done) and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of BusGo app"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```

### Step 2: Enable GitHub Pages

1. Open your repository on GitHub.
2. Go to **Settings** → **Pages** (in the left sidebar).
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. That's it! GitHub Actions will automatically run the build and publish your app at:
   ```
   https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/
   ```

> **Note on Asset Paths**: `vite.config.ts` is configured with `base: './'`, ensuring all assets load properly regardless of whether your site is hosted at a root domain or a GitHub Pages subfolder.

---

## ⚡ Alternative Free Hosting Options

### Deploy to Vercel
1. Go to [vercel.com](https://vercel.com/) and click **Add New Project**.
2. Import your GitHub repository.
3. Vercel will automatically detect **Vite**. Click **Deploy**.

### Deploy to Netlify
1. Go to [netlify.com](https://www.netlify.com/) and select **Import from Git**.
2. Choose your repository.
3. Build Command: `npm run build` | Publish Directory: `dist`.
4. Click **Deploy Site**.

---

## 💻 Local Development Setup

To run BusGo locally on your computer:

```bash
# 1. Clone the repository
git clone https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
cd <YOUR-REPO-NAME>

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

### Other Useful Commands:

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Run TypeScript checks
npm run lint
```

---

## 📁 Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── src/
│   ├── components/
│   │   ├── AuthModal.tsx             # Login / Sign up modal with demo account
│   │   ├── BookingConfirmation.tsx   # Digital boarding pass & QR code
│   │   ├── ErrorBoundary.tsx         # Graceful error handling
│   │   ├── Footer.tsx                # Site footer & travel links
│   │   ├── HelpSupportPage.tsx       # FAQs and automated support chatbot
│   │   ├── HeroSearch.tsx            # Hero banner & bus search box
│   │   ├── MyBookings.tsx            # Trip dashboard & ticket cancellation
│   │   ├── Navbar.tsx                # Header navigation & user status
│   │   ├── OffersPage.tsx            # Promotional coupon cards
│   │   ├── PassengerDetails.tsx      # Seat-by-seat passenger forms
│   │   ├── PaymentPage.tsx           # UPI, QR, Card & NetBanking checkout
│   │   ├── SearchResults.tsx         # Available buses, filters & sorting
│   │   ├── SeatSelection.tsx         # Bus deck layout & boarding point picker
│   │   └── Toast.tsx                 # Pop-up action feedback notifications
│   ├── data/
│   │   └── mockBusData.ts      # Indian cities, routes, buses & demo profile
│   ├── types/
│   │   └── bus.ts              # TypeScript interfaces for bus booking
│   ├── App.tsx                 # Root application state & flow manager
│   ├── index.css               # Tailwind CSS & print styles
│   └── main.tsx                # React root mount
├── .gitignore                  # Git ignore rules for node_modules and dist
├── index.html                  # HTML entry point
├── package.json                # Project dependencies and npm scripts
├── standalone.html             # Zero-install single-file version for Live Server
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration (base: './' for GitHub Pages)
```

---

## 📄 License

This project is licensed under the MIT License - feel free to use and customize it for your portfolio or commercial needs.
