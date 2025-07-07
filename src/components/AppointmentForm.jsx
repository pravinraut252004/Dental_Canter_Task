import { useEffect, useState } from 'react'
import { getAppointments, saveAppointments } from '../utils/appointmentStorage'

// Static patient list
const patientOptions = [
  { id: 'p001', name: 'Patient One' },
  { id: 'p002', name: 'Patient Two' },
  { id: 'p003', name: 'Patient Three' }
]

export default function AppointmentForm({ editing, onSave }) {
  const [formData, setFormData] = useState({
    patientId: '',
    date: '',
    time: '',
    treatment: ''
  })

  useEffect(() => {
    if (editing) setFormData(editing)
    else resetForm()
  }, [editing])

  const resetForm = () => {
    setFormData({ patientId: '', date: '', time: '', treatment: '' })
  }

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.patientId || !formData.date || !formData.time || !formData.treatment) {
      alert('All fields are required.')
      return
    }

    const all = getAppointments()
    let updated = []

    if (formData.id) {
      updated = all.map((a) => (a.id === formData.id ? formData : a))
    } else {
      formData.id = Date.now()
      updated = [...all, formData]
    }

    saveAppointments(updated)
    onSave()
    resetForm()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full"
    >
      <h2 className="text-xl font-bold mb-4 text-indigo-700">
        {formData.id ? 'Edit Appointment' : 'Add Appointment'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          required
          className="p-2 border rounded bg-white text-gray-700"
        >
          <option value="">Select Patient</option>
          {patientOptions.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.id})
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="p-2 border rounded bg-white text-gray-700"
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="p-2 border rounded bg-white text-gray-700"
          required
        />
        <input
          name="treatment"
          value={formData.treatment}
          onChange={handleChange}
          placeholder="Treatment Details"
          className="p-2 border rounded bg-white text-gray-700"
          required
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold transition duration-200"
        >
          {formData.id ? 'Update' : 'Save'}
        </button>
      </div>
    </form>
  )
}
