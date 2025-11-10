import apiClient from '../login/axiosConfig'

export const getProgressData = async () => {
  try {
    const response = await apiClient.get('/api/badges/progress', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Progress 데이터 조회 실패:', error)
    throw error
  }
}
