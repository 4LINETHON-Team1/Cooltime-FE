import UploadBtn from '@/assets/UploadBtn.svg?react'
import { useUserStore } from '@/store/store'

const InputBox = ({ inputRef, onClick = () => {} }) => {
  // 테마 색상
  const { theme } = useUserStore()
  const color = {
    blue: 'border-blue-300 focus-within:border-blue-400',
    mint: 'border-mint-300 focus-within:border-mint-400',
    peach: 'border-peach-300 focus-within:border-peach-400',
  }
  const Color = color[theme] ?? null
  return (
    <div>
      <div className='flex gap-4'>
        <div
          className={`flex justify-center px-4 py-2 border mb-1 text-black-400  rounded-2xl ${Color}`}
        >
          <input
            ref={inputRef}
            className='resize-none border-none outline-none text-[12px] w-[200px]'
            placeholder='텍스트를 입력하세요...'
          />
        </div>
        <button onClick={onClick}>
          <UploadBtn className='blue:text-blue-400 mint:text-mint-400 peach:text-peach-400' />
        </button>
      </div>
    </div>
  )
}

export default InputBox
