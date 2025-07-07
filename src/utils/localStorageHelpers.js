const PATIENTS_KEY = 'patients'

export const getPatients = () => {
  return JSON.parse(localStorage.getItem(PATIENTS_KEY)) || []
}

export const savePatients = (patients) => {
  localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients))
}

export const deletePatient = (id) => {
  const updated = getPatients().filter((p) => p.id !== id)
  savePatients(updated)
}
