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
            const response = await axios.get('http://localhost:5000/api/users');
            const users = response.data;
            for (let i = 0; i < users.length; i++) {
                if (users[i].username === username) {
                    alert('Username already exists');
                    return;
                }
            }

            try {
                await axios.post('http://localhost:5000/api/users', {
                    username: username,
                    password: password
                })
                .then((response) => {
                    nav(`/userpage`, {state: {username: username}});
                })
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="App">
        <header className="App-header">
            <h1>Sign Up</h1>
        </header>
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
        </div>
    );
}