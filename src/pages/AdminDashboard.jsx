import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppointmentForm from '../components/AppointmentForm'
import AppointmentList from '../components/AppointmentList'
import FileUpload from '../components/FileUpload'
import FileList from '../components/FileList'

const patients = [
  { id: 'p001', name: 'Patient One' },
  { id: 'p002', name: 'Patient Two' },
  { id: 'p003', name: 'Patient Three' }
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [editing, setEditing] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.role !== 'admin') {
      navigate('/')
    }
  }, [])

  const handleSave = () => {
    setEditing(null)
    setRefreshKey((prev) => prev + 1)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-800">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
        >
          Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        <AppointmentForm editing={editing} onSave={handleSave} />
        <AppointmentList onEdit={setEditing} refreshKey={refreshKey} />
        <FileUpload onUpload={() => setRefreshKey((prev) => prev + 1)} />

        <div className="space-y-10 mt-10">
          {patients.map((p) => (
            <div key={p.id} className="space-y-3">
              <h2 className="text-xl font-semibold text-indigo-800 border-b pb-1">
                Treatment History for {p.name} ({p.id})
              </h2>
              <FileList patientId={p.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
