import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import InputComponent from "../components/Input";
import ButtonComponent from "../components/Button";

export default function SignIn() {
    const nav = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = await axios.get(`http://localhost:5000/api/users/`, { params: { username: username } })
        
        if (user) {
            await axios.post(`http://localhost:5000/api/users/login`, { password: password, username: username } )
                .then((res) => {
                    if (res.status === 200) {
                        nav(`/user/${user.data._id}`, { state: { username: user.data.username } });
                    }
                    else {
                        alert('Incorrect username or password');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

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
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required />
                    <InputComponent
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required />
                    <ButtonComponent text="Sign In" type='submit' />
                </form>
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            </main>
        </div>
    );
}