import '../App.css';
import ButtonComponent from '../components/Button';
import InputComponent from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { FormControl } from '@mui/material';

export default function AddAssignment() {
    const nav = useNavigate();
    return (
        <div className="App">
            <header className="App-header">
                <h1>Schoolwork</h1>
            </header>
            <main className='App-main'>
                <FormControl className="form">
                    <InputComponent label="Assignment" placeholder="Assignment" required />
                    <InputComponent type='date' required />
                    <ButtonComponent text="Add assignment" />
                </FormControl>
                <ButtonComponent text="Back" onClick={() => nav('/')} />
            </main>
        </div>
    );
}