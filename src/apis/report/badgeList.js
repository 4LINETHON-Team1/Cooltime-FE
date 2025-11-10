import apiClient from '../login/axiosConfig'

export const getBadgeData = async () => {
  try {
    const response = await apiClient.get('/api/badges', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('전체 배지 데이터 조회 실패:', error)
    throw error
  }
}
