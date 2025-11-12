import apiClient from '../login/axiosConfig'

export const getDashboardData = async () => {
  try {
    const response = await apiClient.get('/api/stats/overview', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('카테고리 데이터 조회 실패:', error)
    throw error
  }
}
