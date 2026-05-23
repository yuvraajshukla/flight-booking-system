# ✈️ AeroBook – Flight Booking System

A modern full-stack flight booking web application built using Next.js, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

- User Authentication (Login / Signup)
- Flight Search System
- Dynamic Seat Selection
- Real-time Seat Availability
- Booking Confirmation
- My Bookings Page
- Responsive Modern UI
- Supabase Database Integration
- Protected Booking Flow

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend / Database
- Supabase
- PostgreSQL

### Deployment
- GitHub
- Vercel (optional)

---

## 📂 Project Structure

```bash
app/
 ├── login/
 ├── search/
 ├── seats/
 ├── my-bookings/

lib/
 └── supabase/

supabase/
 └── migrations/
```

---

## 🔐 Authentication

Authentication is handled using Supabase Auth.

Users can:
- Sign up
- Login
- Book seats
- View their bookings

---

## 🎟️ Booking Flow

1. User logs in
2. Searches flights
3. Selects preferred seat
4. Booking stored in Supabase
5. Booking visible in “My Bookings”

---

## 💺 Seat Management

- Available seats shown in green
- Occupied seats shown in red
- Selected seat shown in blue
- Duplicate seat booking prevented

---

## 📸 UI Highlights

- Modern airline-inspired interface
- Dark premium theme
- Responsive layout
- Interactive seat selection
- Smooth hover effects

---

## ⚙️ Environment Variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## ▶️ Running Locally

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## 📌 Future Improvements

- Payment Gateway Integration
- Admin Dashboard
- Real Flight APIs
- Email Notifications
- Ticket PDF Generation
- Flight Filters & Sorting

---

## 👨‍💻 Author

Developed by Yuvraaj Shukla

- VIT Vellore
- Computer Science Engineering
- AWS Cloud Practitioner Certified
