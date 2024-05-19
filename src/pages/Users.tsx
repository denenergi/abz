import { FC, useEffect, useState } from 'react';
import { instance } from '../api/axios.api';
import { IUser } from '../types/types';
import UserCard from '../components/UserCard';
import PostForm from '../components/PostForm';
import { toast } from 'react-toastify';
import { useActionData } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { useAuth } from '../hooks/useAuth';
import { login, logout } from '../store/user/userSlice';
import { removeTokenFromLocalStorage, setTokenToLocalStorage } from '../helpers/localstorage.helper';

export const positionsLoader = async () => {
    try {
        const data = await instance.get('/positions')
        return data.data.positions
    } catch (error: any) {
        const err = error.response?.data.message
        toast.error(err.toString())
    }
}

export const formAction = async ({ request }: any) => {
    const formData = await request.formData()
    const newUser = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        position_id: 1,
        photo: formData.get('photo')
    }
    try {
        const res = await instance.post('/users', newUser)
        toast.success('User added')
        return res
    } catch (error: any) {
        const err = error.response?.data.message
        toast.error(err.toString())
    }

    return null
}

const Users: FC = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    let actionData = useActionData();
    const isAuth = useAuth();
    const dispatch = useAppDispatch()

    const fetchUsers = async (reset = false) => {
        const response = await instance.get(`/users?page=${currentPage}&count=6`);
        if (reset) {
            setCurrentPage(1);
            setUsers(response.data.users);
        } else {
            setUsers(prevUsers => [...prevUsers, ...response.data.users]);
        }
        setTotalPages(response.data.total_pages);
    };

    useEffect(() => {
        if (actionData) {
            fetchUsers(true);
        }
    }, [actionData]);

    useEffect(() => {
        if (!actionData) {
            fetchUsers();
        }
    }, [currentPage]);

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
        <div>
            <div className="bg-[url('./assets/bg-min.jpg')] w-full h-[650px] flex justify-center items-center mb-20 max-md:h-[500px]">
                <div className='flex flex-col w-[380px] gap-4 items-center max-sm:w-full max-sm:px-6'>
                    <h2 className='text-white' style={{ fontSize: "2.5rem", lineHeight: "2.5rem" }}>Test assignment for front-end developer</h2>
                    <p className='text-white' style={{ fontSize: "1rem", lineHeight: "1.75rem" }}>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
                    {isAuth ? (
                        <button className="btn" onClick={logoutHandler}>
                            <span>Log out</span>
                        </button>
                    ) : (
                        <button className="btn" onClick={loginHandler}>
                            <span>Sign up</span>
                        </button>
                    )}
                </div>
            </div>
            <div className='flex flex-col items-center mb-10 max-xl:px-10 max-lg:px-8 max-md:px-6 max-sm:px-4'>
                <h4 className='flex mb-10' style={{ fontSize: "2.5rem", lineHeight: "2.5rem" }}>Working with GET request</h4>
                <div className='grid grid-cols-3 flex-wrap gap-8 justify-between mb-10 max-md:grid-cols-2 max-sm:grid-cols-1 max-md:gap-6 max-sm:gap-4'>
                    {users?.length > 0 && users.map((user, i) => (
                        <UserCard user={user} key={i} />
                    ))}
                </div>
                <button className={'btn'} onClick={() => setCurrentPage(currentPage + 1)} disabled={totalPages === currentPage}>Show more</button>
            </div>
            <div className='flex flex-col items-center mb-10 max-xl:px-10 max-lg:px-8 max-md:px-6 max-sm:px-4'>
                <h4 className='flex mb-10' style={{ fontSize: "2.5rem", lineHeight: "2.5rem" }}>Working with POST request</h4>
                <div className='flex flex-wrap gap-8 justify-between mb-10'>
                    <PostForm />
                </div>
            </div>
        </div>
    )
}

export default Users