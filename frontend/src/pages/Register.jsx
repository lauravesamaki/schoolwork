/* eslint-disable no-unused-vars */
import '../App.css';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {register, reset} from '../features/auth/authSlice';
import axios from 'axios';
import InputComponent from '../components/Input';
import ButtonComponent from '../components/Button';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirmation: ''
    });

    const {username, password, passwordConfirmation} = formData;

    const nav = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

    useEffect(() => {
        if(isError){
            toast.error(message);
        }

        if(isSuccess || user){
            nav(`/user`);
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, nav, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            toast.error('Passwords do not match');
        }
        else {
            const userData = {
                username, 
                password
            }

            dispatch(register(userData));
        }
    }

    return (
        <div className="App">
        <header className="App-header">
            <h1>Schoolwork</h1>
        </header>
        <main className='App-main'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <InputComponent
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    required />
                <InputComponent
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required />
                <InputComponent
                    name="passwordConfirmation"
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirmation}
                    onChange={(e) => setFormData({...formData, passwordConfirmation: e.target.value})}
                    required />
                <ButtonComponent type="submit" text="Sign Up" />
            </form>
            <p>Already have an account? <a href="/login">Log In</a></p>
        </main>
        </div>
    );
}