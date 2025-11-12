import { baseURL } from '../login/axiosConfig'

export const checkId = async (username) => {
  try {
    const response = await fetch(
      `${baseURL}/api/auth/check-username?username=${encodeURIComponent(username)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const data = await response.json()
    return data
  } catch (err) {
    console.error('아이디 중복검사 실패:', err)
    return { success: false, code: 500, message: '서버 오류', data: null }
  }
}

export const checkNickname = async (nickname) => {
  try {
    const response = await fetch(
      `${baseURL}/api/auth/check-nickname?nickname=${encodeURIComponent(nickname)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const data = await response.json()
    return data
  } catch (err) {
    console.error('닉네임 중복검사 실패:', err)
    return { success: false, code: 500, message: '서버 오류', data: null }
  }
}

export const checkPassword = async (password) => {
  try {
    const response = await fetch(`${baseURL}/api/auth/check-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
      }),
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.error('비밀번호 검사 실패:', err)
    return { success: false, code: 500, message: '서버 오류', data: null }
  }
}
