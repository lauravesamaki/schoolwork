/* eslint-disable no-unused-vars */
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import InputComponent from "../components/Input";
import ButtonComponent from "../components/Button";

export default function LogIn() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const nav = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if(isError){
            toast.error(message);
        }

        if(isSuccess || user){
            const id = user ? user._id : null;
            nav(`/user/${id}`);
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, nav, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            password
        }

        dispatch(login(userData));
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Schoolwork</h1>
            </header>
            <main className='App-main'>
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <InputComponent
                        placeholder="Username"
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        value={username}
                        required />
                    <InputComponent
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        value={password}
                        required />
                    <ButtonComponent text="Sign In" type='submit' />
                </form>
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            </main>
        </div>
    );
}