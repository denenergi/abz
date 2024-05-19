import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const Layout: FC = () => {
  return (
    <div className='min-h-screen'>
      <div className='min-w-max bg-white'>
        <Header />
      </div>
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout