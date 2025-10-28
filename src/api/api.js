import axios from 'axios'


const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'


export const api = axios.create({ baseURL: API_BASE })


export const getMeetings = () => api.get('/meetings')
export const createMeeting = (payload) => api.post('/meetings', payload)

