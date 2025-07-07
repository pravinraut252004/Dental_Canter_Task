import { getPatients, savePatients } from '../utils/localStorageHelpers'
import { useState, useEffect } from 'react'

export default function PatientForm({ editingPatient, onSave }) {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    contact: '',
    healthInfo: '',
  })

  useEffect(() => {
    if (editingPatient) setFormData(editingPatient)
  }, [editingPatient])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let patients = getPatients()

    if (formData.id) {
      patients = patients.map((p) =>
        p.id === formData.id ? formData : p
      )
    } else {
      formData.id = Date.now()
      patients.push(formData)
    }

    savePatients(patients)
    onSave()
    setFormData({ fullName: '', dob: '', contact: '', healthInfo: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-4">
      <h3 className="text-lg font-semibold mb-2">{formData.id ? 'Edit' : 'Add'} Patient</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="healthInfo"
          placeholder="Health Info"
          value={formData.healthInfo}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Save
      </button>
    </form>
  )
}
