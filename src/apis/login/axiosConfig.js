import axios from 'axios'

export const baseURL = import.meta.env.VITE_API_BASE_URL

const apiClient = axios.create({
  baseURL,
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (originalRequest.url === '/api/auth/refresh') {
        console.error('Refresh Token 만료 또는 유효하지 않음')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(error)
      }

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) throw new Error('Refresh Token 없음')

        const response = await apiClient.post('/api/auth/refresh', {
          refreshToken: refreshToken,
        })
        const { accessToken, refreshToken: newRefreshToken } = response.data.data

        localStorage.setItem('accessToken', accessToken)
        if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken)

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient

// import apiClient from './apiClient'
// export const getChartData = async () => {
//   try {
//     const response = await apiClient.get('/api/chart/data', {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // accessToken 자동 반영
//       },
//     })
//     return response.data
//   } catch (error) {
//     console.error('차트 데이터 조회 실패:', error)
//     throw error
//   }
// }
