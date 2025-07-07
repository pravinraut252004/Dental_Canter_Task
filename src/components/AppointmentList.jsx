import { useEffect, useState } from 'react'
import { getAppointments, deleteAppointment } from '../utils/appointmentStorage'

export default function AppointmentList({ onEdit, refreshKey }) {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    setAppointments(getAppointments())
  }, [refreshKey])

  const handleDelete = (id) => {
    deleteAppointment(id)
    setAppointments(getAppointments())
  }

  return (
    <div className="overflow-x-auto">
      <h3 className="text-lg font-bold mb-3 text-indigo-700">Appointments</h3>
      <table className="min-w-full bg-white border rounded shadow">
        <thead className="bg-indigo-100 text-indigo-800">
          <tr>
            <th className="p-3 text-left">Patient ID</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-left">Treatment</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{a.patientId}</td>
              <td className="p-3">{a.date}</td>
              <td className="p-3">{a.time}</td>
              <td className="p-3">{a.treatment}</td>
              <td className="p-3 flex flex-wrap gap-2">
                <button
                  onClick={() => onEdit(a)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {appointments.length === 0 && (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No appointments yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
