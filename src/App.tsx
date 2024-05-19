import './App.css'
import { useAppDispatch } from './store/hooks'
import { getTokenFromLocalStorage } from './helpers/localstorage.helper'
import { login, logout } from './store/user/userSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'

function App() {
  const dispatch = useAppDispatch()
  const checkedAuth = async () => {
    const token = getTokenFromLocalStorage()

    try {
      if (token) {
        dispatch(login())
      } else {
        dispatch(logout())
      }
    } catch (error: any) {
      const err = error.response?.data.messages
      toast.error(err.toString())
    }
  }

  useEffect(() => {
    checkedAuth()
  })
  return <RouterProvider router={router} />
}

export default App
