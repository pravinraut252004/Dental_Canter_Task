import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const users = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { email: 'p1@example.com', password: 'patient123', role: 'patient', patientId: 'p001' },
  { email: 'p2@example.com', password: 'patient123', role: 'patient', patientId: 'p002' },
  { email: 'p3@example.com', password: 'patient123', role: 'patient', patientId: 'p003' }
]

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    const user = users.find((u) => u.email === email && u.password === password)

    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      if (user.role === 'admin') navigate('/admin')
      else if (user.role === 'patient') navigate('/patient')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white py-2 rounded-md 
                       bg-gradient-to-r from-teal-400 to-teal-600 
                       hover:from-teal-500 hover:to-teal-700 
                       shadow-lg hover:shadow-teal-400 
                       transition duration-300 transform hover:-translate-y-1 active:scale-95"
          >
            Login
          </button>
        </form>

        <div className="text-sm text-gray-500 mt-6 text-center">
          <p><strong>Admin:</strong> admin@example.com / admin123</p>
          <p><strong>Patient 1:</strong> p1@example.com / patient123</p>
          <p><strong>Patient 2:</strong> p2@example.com / patient123</p>
          <p><strong>Patient 3:</strong> p3@example.com / patient123</p>
        </div>
      </div>
    </div>
  )
}
