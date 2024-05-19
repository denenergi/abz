import { FC } from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import { IPosition } from '../types/types'
import { InputMask } from '@react-input/mask'

const PostForm: FC = () => {
    const positions = useLoaderData() as IPosition[]

    return (
        <div className='rounded-md'>
            <Form className='grid w-[380px] justify-center items-center max-sm:w-full' method='post'>
                <label className="grid mb-10" htmlFor="name">
                    <input type="text" className='input placeholder:text-black' placeholder='Your name' name='name' required minLength={2} />
                </label>
                <label className="grid mb-10" htmlFor="email">
                    <input type="email" className='input placeholder:text-black' placeholder='Email' name='email' required />
                </label>
                <label className="grid mb-6" htmlFor="phone">
                    <InputMask mask="+38 (___) ___-__-__" replacement={{ _: /\d/ }} type="phone" className='input  placeholder:text-black mb-1' placeholder='Phone' name='phone' required />
                    <span className='flex text-left ml-2'>+38 (XXX) XXX - XX - XX</span>
                </label>
                <label htmlFor="category" className='grid mb-10 gap-2'>
                    <span className='text-left text-base'>Select your position</span>
                    <div className='flex flex-col gap-2 items-start'>
                        {positions.map((position, i) => (
                            <label className='flex gap-2 items-center' key={position.id}><input type="radio" name="position" value={position.id} defaultChecked={i === 0}/>{position.name} </label>
                        ))}
                    </div>
                </label>
                <div className='relative mb-12'>
                    <label className="cursor-pointer flex mb-6 z-10 absolute t-0 l-0 w-[83px] h-full justify-center items-center border-black border rounded-l-md" htmlFor="photo">Upload</label>
                    <input type="file" className='input cursor-pointer placeholder:text-black pl-28 file:h-full file:w-[83px] w-full file:absolute file:z-20 file:left-0 file:top-0 file:opacity-0 file:cursor-pointer' placeholder='Upload your photo' name='photo' required />
                </div>
                <button className='btn max-w-fit mt-2 mx-auto'>Sign up</button>
            </Form>
        </div>
    )
}

export default PostForm