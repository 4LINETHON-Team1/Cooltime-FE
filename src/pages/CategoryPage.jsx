import React from 'react'
import { useUserStore } from '@/store/store'
import Header from '@/components/shared/Header'
import CategoryList from '@/components/category/CategoryList'

const CategoryPage = () => {
  const { theme, nickname } = useUserStore()

  const categoryData = [
    { rank: 1, title: '공부', total: 20, delayCount: 6 },
    { rank: 2, title: '애니메이션', total: 20, delayCount: 5 },
    { rank: 3, title: '운동', total: 20, delayCount: 2 },
  ]

  const color = {
    blue: {
      background: 'bg-linear-to-b from-main-100 to-gray-100',
      number: 'bg-blue-500',
    },
    mint: {
      background: 'bg-linear-to-b from-mint-100 to-gray-100',
      number: 'bg-mint-500',
    },
    peach: {
      background: 'bg-linear-to-b from-peach-100 to-gray-100',
      number: 'bg-peach-500',
    },
  }
  const backgound = color[theme].background ?? 'bg-linear-to-b from-main-100 to-gray-100'

  return (
    <div className={`flex flex-col w-full max-w-[440px] min-h-screen items-center ${backgound}`}>
      <Header label='카테고리별' />
      <div className='flex flex-col w-full items-start mt-[94px] pl-4 mb-10'>
        <p className='Title-01-1_1 text-black-400'>카테고리별로</p>
        <p className='Title-01-1_1 text-black-400'>{nickname}님이</p>
        <p className='Title-01-1_1 text-black-400'>미룬 비율이에요</p>
        <p className='body-02-1_2 text-gray-900 mt-4'>내가 자주 미룬 카테고리를 확인하고,</p>
        <p className='body-02-1_2 text-gray-900 -mt-1'>집중이 필요한 패턴을 찾아보세요.</p>
      </div>
      {categoryData.map((data) => (
        <CategoryList data={data} color={color[theme].number} />
      ))}
    </div>
  )
}

export default CategoryPage
