// src/utils/appointmentStorage.js
const KEY = 'appointments'

export const getAppointments = () => JSON.parse(localStorage.getItem(KEY)) || []

export const saveAppointments = (appointments) =>
  localStorage.setItem(KEY, JSON.stringify(appointments))

export const deleteAppointment = (id) => {
  const updated = getAppointments().filter((a) => a.id !== id)
  saveAppointments(updated)
}
