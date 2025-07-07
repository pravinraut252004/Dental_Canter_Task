import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAppointments } from '../utils/appointmentStorage'
import FileList from '../components/FileList'

export default function PatientDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (!storedUser || storedUser.role !== 'patient') {
      navigate('/')
    } else {
      setUser(storedUser)
      const allAppointments = getAppointments()
      const filtered = allAppointments.filter((appt) => appt.patientId === storedUser.patientId)
      setAppointments(filtered)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  if (!user) return null

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-gray-100">
      <header className="px-6 py-4 bg-white shadow flex justify-between items-center max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-green-700">Patient Dashboard - {user.email}</h1>
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Logout
        </button>
      </header>

      <main className="flex-1 overflow-auto px-4 py-6 w-full max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700">Your Appointments</h2>
          {appointments.length > 0 ? (
            <table className="w-full border-collapse">
              <thead className="bg-indigo-100 text-indigo-800">
                <tr>
                  <th className="p-3 text-left border-b">Date</th>
                  <th className="p-3 text-left border-b">Time</th>
                  <th className="p-3 text-left border-b">Treatment</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-gray-50 transition duration-200">
                    <td className="p-3">{a.date}</td>
                    <td className="p-3">{a.time}</td>
                    <td className="p-3">{a.treatment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No appointments found.</p>
          )}
        </div>

        <FileList patientId={user.patientId} />
      </main>
    </div>
  )
}
