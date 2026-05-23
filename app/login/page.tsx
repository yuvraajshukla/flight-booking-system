'use client'

import {
  useEffect,
  useState,
} from 'react'

import { useRouter } from 'next/navigation'

import { supabase } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        router.push('/search')
      }
    }

    checkUser()
  }, [router])

  const handleLogin = async () => {
    setLoading(true)

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (error) {
      alert(error.message)
    } else {
      router.push('/search')
    }

    setLoading(false)
  }

  const handleSignup = async () => {
    setLoading(true)

    const { error } =
      await supabase.auth.signUp({
        email,
        password,
      })

    if (error) {
      alert(error.message)
    } else {
      alert('Account created successfully')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4">

        <h1 className="text-3xl font-bold">
          Flight Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition"
        >
          {loading
            ? 'Loading...'
            : 'Login'}
        </button>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full border p-3 rounded-lg hover:bg-gray-100 transition"
        >
          Signup
        </button>

      </div>

    </div>
  )
}