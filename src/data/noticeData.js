export const noticeData = {
  아이디: {
    type: 'text',
    placeholder: '아이디를 입력하세요',
    none: { label: '', style: 'body-03-1_3 text-gray-400' },
    default: { label: '4-12자리 영문,숫자로 입력해주세요.', style: 'body-03-1_3 text-gray-400' },
    duplicate: { label: '이미 사용 중인 아이디입니다', style: 'body-03-1_3 text-red-400' },
    invalid: { label: '영문/숫자만 입력 가능합니다', style: 'body-03-1_3 text-red-400' },
    error: { label: '해당 아이디를 찾을 수 없습니다.', style: 'body-03-1_3 text-red-400' },
  },
  비밀번호: {
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
    none: { label: '', style: 'body-03-1_3 text-green-400' },
    default: {
      label: '8-20자, 영문·숫자·특수문자 2종 이상 조합해주세요.',
      style: 'body-03-1_3 text-gray-400',
    },
    invalid: {
      label: '8-20자, 영문·숫자·특수문자 2종 이상 조합해주세요.',
      style: 'body-03-1_3 text-red-500',
    },
    error: { label: '비밀번호가 틀렸습니다.', style: 'body-03-1_3 text-red-500' },
    duplicate: { label: '', style: 'body-03-1_3 text-red-500' },
  },
  닉네임: {
    type: 'text',
    placeholder: '쿨타임에서 사용할 닉네임을 입력해주세요',
    none: { label: '한글 12자 이내로 입력해주세요.', style: 'body-03-1_3 text-gray-400' },
    default: { label: '한글 12자 이내로 입력해주세요.', style: 'body-03-1_3 text-gray-400' },
    invalid: {
      label: '닉네임은 한글만 사용 가능하며, 1~12자 이내여야 합니다.',
      style: 'body-03-1_3 text-red-500',
    },
    duplicate: { label: '중복된 닉네임입니다', style: 'body-03-1_3 text-red-400' },
  },
  비밀번호_확인: {
    type: 'password',
    placeholder: '비밀번호를 재입력해주세요',
    none: { label: '', style: 'body-03-1_3 text-gray-400' },
    default: {
      label: '',
      style: 'body-03-1_3 text-gray-400',
    },
    invalid: { label: '', style: 'body-03-1_3 text-red-500' },
    error: { label: '', style: 'body-03-1_3 text-red-500' },
    duplicate: { label: '비밀번호가 일치하지 않습니다.', style: 'body-03-1_3 text-red-500' },
  },
}
