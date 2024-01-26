import axios from 'axios'
import { hasToken, getToken } from './Token'
import { useAuthStore } from '../stores/auth'

const BASE_URL = 'http://localhost/api/'

const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
})

Axios.interceptors.request.use((config) => {
  const isLoggedIn = useAuthStore().user_information.isLoggedIn
  if (hasToken() && isLoggedIn) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
})

export default Axios
