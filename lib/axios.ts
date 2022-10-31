// Axios custom instance
import axios from 'axios'
import { env } from '../config'
import router from 'next/router'
import { message } from 'antd'

const client = axios.create({
  baseURL: `${env.apiUrl}`,
  withCredentials: true
})

client.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      message.success(response.data.message)
    }

    if (response.data.status === 200) {
      message.success('Success')
    }

    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      router.push('/auth/login')
    }

    if (error.response?.status === 403) {
      message.error('You do not have permission to perform this action')
    }

    return Promise.reject(error)
  }
)

export default client
