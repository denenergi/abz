import { FC } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch } from '../store/hooks';
import { login, logout } from '../store/user/userSlice';
import { removeTokenFromLocalStorage, setTokenToLocalStorage } from '../helpers/localstorage.helper';
import { toast } from 'react-toastify';
import logo from '../assets/logo.svg'
import { instance } from '../api/axios.api';

const Header: FC = () => {
    const isAuth = useAuth();
    const dispatch = useAppDispatch()
    const logoutHandler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('token')
        toast.success('You logout!')
    }

    const loginHandler = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            const data = await instance.get('/token')
            if (data) {
                setTokenToLocalStorage('token', data.data.token)
                dispatch(login())
                toast.success('You logged in!')
            }
        } catch (err: any) {
            const error = err.response?.data.messages
            toast.error(error.toString())
        }
    }
    return (
        <header className='flex items-center max-w-[1170px] m-auto justify-between py-3 max-xl:px-10 max-sm:px-4'>
            <Link className='flex items-center' to={'/users'}>
                <img src={logo} alt="logo" />
                <p>TESTTASK</p>
            </Link>
            <div className='flex gap-2'>
                <Link className="btn" to={'/users'}>
                    <span>Users</span>
                </Link>
                {isAuth ? (
                    <button className="btn" onClick={logoutHandler}>
                        <span>Log out</span>
                    </button>
                ) : (
                    <button className="btn btn-red" onClick={loginHandler}>
                        <span>Sign up</span>
                    </button>
                )}
            </div>
        </header>
    )
}

export default Header