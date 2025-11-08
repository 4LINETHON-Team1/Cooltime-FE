import { baseURL } from '@/pages/SignupPage'

export const signup = async (formData) => {
  try {
    const response = await fetch(`${baseURL}/api/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.id,
        password: formData.password,
        nickname: formData.nickname,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('회원가입 실패:', errorData)
      return { success: false, data: errorData }
    }

    const data = await response.json()
    console.log('회원가입 성공:', data)
    return { success: true, data }
  } catch (err) {
    console.error('회원가입 요청 중 오류 발생:', err)
    return { success: false, data: err }
  }
}

export default signup
