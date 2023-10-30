import React, { FC, useState } from "react";
import { AuthService } from '../services/auth.service';
import { toast } from 'react-toastify';
import { setTokenLocalStorage } from '../helpers/localstorage.helper';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Auth: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setLogin] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await AuthService.login({ email, password });
            console.log('data', data)

            if (data) {
                console.log('success')
                toast.success('ok')
                setTokenLocalStorage('token', data.token);
                dispatch(login(data));
                navigate('/');
            }
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString())
        }
    }

    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await AuthService.registration({ email, password });
            console.log('data', data)
            if (data) {
                console.log('success')
                toast.success('Account hus been created.')
                setLogin(!isLogin);
            }
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString())
        }
    }
    return (
        <div className='mt-40 flex flex-col items-center justify-center bg-slate-900 text-white'>
            <h1 className='mb-10 text-center text-xl'>
                {isLogin ? 'Login' : 'Registration'}
            </h1>

            <form
                className='mx-auto flex w-1/3 flex-col gap-5'
                onSubmit={isLogin ? loginHandler : registrationHandler}
            >
                <input type="text" className='input' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className='input' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />

                <button className='btn btn-green mx-auto'>Submit</button>
            </form>

            <div className='flex justify-center mt-5'>
                {
                    isLogin ? (
                        <button
                            className='text-slate-300 hover:text-white'
                            onClick={() => setLogin(!isLogin)}
                        >
                            You dont`t have account?
                        </button>
                    ) : (
                        <button
                            className='text-slate-300 hover:text-white'
                            onClick={() => setLogin(!isLogin)}
                        >
                            Already have an account?
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default Auth;