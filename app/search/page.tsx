'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'

interface Flight {
  id: string
  flight_no: string
  origin: string
  destination: string
  departs_at: string
  arrives_at: string
  aircraft_type: string
  status: string
  base_price: number
}

export default function SearchPage() {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [passengers, setPassengers] = useState(1)

  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(false)
const handleSearch = async () => {
  setLoading(true)

  const { data, error } = await supabase
    .from('flights')
    .select('*')
    .ilike('origin', origin)
    .ilike('destination', destination)

  if (error) {
    console.log(error)
    alert('Error fetching flights')
  } else {
    setFlights(data || [])
  }

  setLoading(false)
}

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
          <h1 className="text-3xl font-bold">
            Search Flights
          </h1>

          <input
            type="text"
            placeholder="Origin"
            className="w-full border p-3 rounded-lg"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />

          <input
            type="text"
            placeholder="Destination"
            className="w-full border p-3 rounded-lg"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <input
            type="date"
            className="w-full border p-3 rounded-lg"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="number"
            min={1}
            className="w-full border p-3 rounded-lg"
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
          />

          <button
            onClick={handleSearch}
            className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? 'Searching...' : 'Search Flights'}
          </button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {flights.length > 0 ? (
            flights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white rounded-2xl shadow-md p-5 border"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {flight.flight_no}
                    </h2>

                    <p className="text-gray-600">
                      {flight.origin} → {flight.destination}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      ₹{flight.base_price}
                    </p>

                    <p className="text-sm text-gray-500">
                      {flight.aircraft_type}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">
                      Departure
                    </p>

                    <p>
                      {new Date(
                        flight.departs_at
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold">
                      Arrival
                    </p>

                    <p>
                      {new Date(
                        flight.arrives_at
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
  
onClick={() =>
    window.location.href = `/seats?flightId=${flight.id}`
  }
  className="mt-5 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
>
  Select Flight
</button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No flights found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}