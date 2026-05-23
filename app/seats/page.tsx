'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

const seats = [
  '1A', '1B', '1C', '1D',
  '2A', '2B', '2C', '2D',
  '3A', '3B', '3C', '3D',
  '4A', '4B', '4C', '4D',
]

export default function SeatsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const flightId =
    searchParams.get('flightId')

  const [selectedSeat, setSelectedSeat] =
    useState('')

  const [occupiedSeats, setOccupiedSeats] =
    useState<string[]>([])

  const [loading, setLoading] =
    useState(false)

  useEffect(() => {
    fetchOccupiedSeats()
  }, [])

  async function fetchOccupiedSeats() {
    const { data, error } = await supabase
      .from('bookings')
      .select('seat_no')
      .eq('flight_id', flightId)

    if (!error && data) {
      setOccupiedSeats(
        data.map((item) => item.seat_no)
      )
    }
  }

  function handleSeatSelect(seat: string) {
    if (occupiedSeats.includes(seat))
      return

    setSelectedSeat(seat)
  }

  async function handleBooking() {
    if (!selectedSeat) {
      alert('Please select a seat')
      return
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert('Please login first')
      router.push('/login')
      return
    }

    setLoading(true)

    const { error } = await supabase
      .from('bookings')
      .insert({
        user_id: user.id,
        flight_id: flightId,
        seat_no: selectedSeat,
      })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    alert('Booking Successful!')

    router.push('/my-bookings')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white">

      {/* NAVBAR */}

      <nav className="border-b border-slate-800 backdrop-blur-sm sticky top-0 z-50 bg-black/30">

        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

          <h1 className="text-4xl font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            AeroBook
          </h1>

          <div className="flex gap-8 text-sm md:text-base">

            <button
              onClick={() =>
                router.push('/search')
              }
              className="hover:text-cyan-400 transition duration-200"
            >
              Search Flights
            </button>

            <button
              onClick={() =>
                router.push('/my-bookings')
              }
              className="hover:text-cyan-400 transition duration-200"
            >
              My Bookings
            </button>

          </div>

        </div>

      </nav>

      {/* MAIN */}

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* HEADER */}

        <div className="text-center mb-14">

          <h1 className="text-6xl md:text-7xl font-extrabold mb-5 leading-tight">
            Select Your Seat
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Experience premium comfort and choose
            your preferred seat before boarding.
          </p>

        </div>

        {/* LEGEND */}

        <div className="flex justify-center gap-8 flex-wrap mb-12">

          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-md bg-green-500 shadow-lg shadow-green-500/30"></div>
            <span className="text-slate-300">
              Available
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-md bg-red-600 shadow-lg shadow-red-500/30"></div>
            <span className="text-slate-300">
              Occupied
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-md bg-cyan-500 shadow-lg shadow-cyan-500/30"></div>
            <span className="text-slate-300">
              Selected
            </span>
          </div>

        </div>

        {/* SEAT MAP */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl">

          <div className="text-center mb-10">

            <div className="inline-block px-6 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm tracking-widest uppercase">
              Aircraft Cabin
            </div>

          </div>

          {/* COLUMN LABELS */}

          <div className="grid grid-cols-4 gap-6 max-w-3xl mx-auto mb-4 text-center text-slate-500 font-semibold">

            <div>A</div>
            <div>B</div>
            <div>C</div>
            <div>D</div>

          </div>

          {/* SEATS */}

          <div className="grid grid-cols-4 gap-6 max-w-3xl mx-auto">

            {seats.map((seat) => {
              const occupied =
                occupiedSeats.includes(seat)

              const selected =
                selectedSeat === seat

              return (
                <button
                  key={seat}
                  disabled={occupied}
                  onClick={() =>
                    handleSeatSelect(seat)
                  }
                  className={`
                    relative h-24 rounded-3xl text-2xl font-bold transition-all duration-300 border

                    ${
                      occupied
                        ? 'bg-red-700/80 border-red-500/30 cursor-not-allowed opacity-70'
                        : selected
                        ? 'bg-cyan-500 border-cyan-300 scale-110 shadow-2xl shadow-cyan-500/40'
                        : 'bg-green-500/20 border-green-400/30 hover:bg-green-500 hover:scale-105 hover:shadow-xl hover:shadow-green-500/30'
                    }
                  `}
                >
                  {seat}
                </button>
              )
            })}

          </div>

          {/* BOOKING CARD */}

          {selectedSeat && (

            <div className="mt-14 max-w-2xl mx-auto">

              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-[28px] p-8 shadow-2xl backdrop-blur-xl">

                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                  <div>

                    <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">
                      Selected Seat
                    </p>

                    <h2 className="text-5xl font-extrabold text-cyan-400">
                      {selectedSeat}
                    </h2>

                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={loading}
                    className="w-full md:w-auto px-10 py-5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black font-bold text-xl shadow-2xl shadow-cyan-500/30 hover:scale-105"
                  >
                    {loading
                      ? 'Booking...'
                      : 'Confirm Booking'}
                  </button>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  )
}