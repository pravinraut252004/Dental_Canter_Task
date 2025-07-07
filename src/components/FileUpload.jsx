import { useState } from 'react'
import { addFile } from '../utils/fileStorage'

export default function FileUpload({ onUpload }) {
  const [patientId, setPatientId] = useState('')
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = () => {
    if (!file || !patientId) return alert('Please enter Patient ID and select a file.')

    const reader = new FileReader()
    reader.onloadend = () => {
      const fileObj = {
        id: Date.now(),
        patientId,
        fileName: file.name,
        content: reader.result,
      }
      addFile(fileObj)
      setFile(null)
      setPatientId('')
      onUpload?.()
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="bg-white p-4 rounded shadow border mb-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">Upload Treatment Record</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input type="file" onChange={handleFileChange} className="p-2 border rounded" />
      </div>

      <button
        onClick={handleUpload}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
      >
        Upload
      </button>
    </div>
  )
}
