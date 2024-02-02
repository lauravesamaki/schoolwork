import '../App.css';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import InputComponent from '../components/Input';
import ButtonComponent from '../components/Button';

export default function SignUp() {
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirmation: ''
    });

    const {username, password, passwordConfirmation} = formData;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            alert('Passwords do not match');
            return;
        }
        else {
            await axios.post('http://localhost:5000/api/users/signup', {
                username: username,
                password: password,
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
                .then((res) => {
                    if (res.status === 201) {
                        nav(`/user/${res.id}`, {state: {username: res.username}});
                    }
                    else {
                        alert('Error creating account');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
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