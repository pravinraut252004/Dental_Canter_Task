const FILE_KEY = 'files'

export const getFiles = () => JSON.parse(localStorage.getItem(FILE_KEY)) || []

export const saveFiles = (files) =>
  localStorage.setItem(FILE_KEY, JSON.stringify(files))

export const addFile = (fileObj) => {
  const files = getFiles()
  saveFiles([...files, fileObj])
}

export const getFilesByPatient = (patientId) =>
  getFiles().filter((f) => f.patientId === patientId)
                