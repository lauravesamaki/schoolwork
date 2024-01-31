import '../App.css';
import InputComponent from "../components/Input";
import ButtonComponent from "../components/Button";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SignIn() {
    const nav = useNavigate();
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = users.find((user) => user.username === username);
        if (user) {
            await axios.post(`http://localhost:5000/api/users/login`, { password: password, username: username } )
                .then((res) => {
                    if (res.status === 200) {
                        nav('/userpage', { state: { username: user.username } });
                    }
                    else {
                        alert('Password does not match');
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
                <h1>Sign In</h1>
            </header>
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
            <ButtonComponent text="Home" onClick={() => nav('/')} />
        </div>
    );
}