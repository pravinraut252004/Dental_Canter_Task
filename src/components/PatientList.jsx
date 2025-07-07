import { deletePatient, getPatients, savePatients } from '../utils/localStorageHelpers'
import { useState, useEffect } from 'react'
export default function PatientList({ onEdit }) {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    setPatients(getPatients())
  }, [])

  const handleDelete = (id) => {
    deletePatient(id)
    setPatients(getPatients())
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Full Name</th>
            <th className="p-3">DOB</th>
            <th className="p-3">Contact</th>
            <th className="p-3">Health Info</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} className="border-t">
              <td className="p-3">{patient.fullName}</td>
              <td className="p-3">{patient.dob}</td>
              <td className="p-3">{patient.contact}</td>
              <td className="p-3">{patient.healthInfo}</td>
              <td className="p-3 space-x-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => onEdit(patient)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(patient.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
