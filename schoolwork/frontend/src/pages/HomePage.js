import '../App.css';
import ButtonComponent from '../components/Button';
import { useNavigate} from 'react-router-dom';

export default function HomePage() {
    const nav = useNavigate();

    return (
        <div className="App">
            <header className="App-header">
                <h1>Schoolwork</h1>
            </header>
            <main className='App-main'>
                <p>Welcome to Schoolwork!</p>
                <p>Here you can add your courses and assignments to track your progression.</p>
                <ButtonComponent onClick={() => nav('/signup') } text="Sign up" />
                <ButtonComponent onClick={() => nav('/login') } text="Sign in" />
            </main>
        </div>
    );
}