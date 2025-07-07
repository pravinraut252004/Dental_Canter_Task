import { getFilesByPatient } from '../utils/fileStorage'

export default function FileList({ patientId }) {
  const files = getFilesByPatient(patientId)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-indigo-700">
        Treatment Records for <span className="font-bold">{patientId}</span>
      </h3>

      {files.length === 0 ? (
        <p className="text-gray-500 italic">No files uploaded.</p>
      ) : (
        <ul className="space-y-3">
          {files.map((file) => (
            <li
              key={file.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded hover:bg-gray-100 transition"
            >
              <span className="truncate max-w-xs text-gray-800">{file.fileName}</span>
              <a
                href={file.content}
                download={file.fileName}
                className="bg-indigo-500 text-white px-4 py-1.5 rounded hover:bg-indigo-600 transition"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
