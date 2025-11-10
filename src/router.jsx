import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import MainPage from './pages/MainPage'
import TestPage from '@/pages/TestPage'
import TestResultIntroPage from './pages/TestResultIntroPage'
import StartPage from './pages/StartPage'
import TypeResultPage from './pages/TypeResultPage'
import MyPage from './pages/MyPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import WelcomePage from './pages/WelcomePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <TestPage /> },
      { path: 'home', element: <MainPage /> },
      { path: 'test', element: <TestPage /> },
      { path: 'result/intro', element: <TestResultIntroPage /> },
      { path: 'result', element: <TypeResultPage /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'welcome', element: <WelcomePage /> },
      { path: 'start', element: <StartPage /> },
    ],
  },
])

export default router
