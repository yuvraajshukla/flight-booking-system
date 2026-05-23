'use client'

import {
  useEffect,
  useState,
} from 'react'

import { supabase } from '@/lib/supabase/client'

interface Booking {
  id: string
  seat_no: string
  flight_id: string
  created_at: string
}

export default function MyBookingsPage() {
  const [bookings, setBookings] =
    useState<Booking[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)

      if (error) {
        console.log(error)
      } else {
        setBookings(data || [])
      }

      setLoading(false)
    }

    fetchBookings()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          My Bookings
        </h1>

        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found</p>
        ) : (
          <div className="space-y-4">

            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white p-6 rounded-2xl shadow-md"
              >

                <h2 className="text-2xl font-bold">
                  Seat: {booking.seat_no}
                </h2>

                <p className="text-gray-600 mt-2">
                  Flight ID:
                  {' '}
                  {booking.flight_id}
                </p>

                <p className="text-gray-500 text-sm mt-3">
                  Booked on:
                  {' '}
                  {new Date(
                    booking.created_at
                  ).toLocaleString()}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  )
}