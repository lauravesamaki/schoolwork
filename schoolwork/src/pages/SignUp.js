import '../App.css';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import InputComponent from '../components/Input';
import ButtonComponent from '../components/Button';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const nav = useNavigate();

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
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                <InputComponent
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                <InputComponent
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required />
                <ButtonComponent type="submit" text="Sign Up" />
            </form>
            <p>Already have an account? <a href="/login">Log In</a></p>
        </main>
        </div>
    );
}