import { FormControl } from "@mui/material";
import InputComponent from "../components/Input";
import ButtonComponent from "../components/Button";
import '../App.css';
import { useNavigate } from 'react-router-dom';

export default function AddCourse() {
    const navigate = useNavigate();

    return (
        <div className="App">
            <header className="App-header">
                <h1>Schoolwork</h1>
            </header>
            <main className='App-main'>
                <FormControl className="form">
                    <InputComponent label="Course name" placeholder="Math" required />
                    <InputComponent label="Course code" placeholder="MATH 101" />
                    <InputComponent label="Course teacher" placeholder="Mr. Smith" />
                    <ButtonComponent text="Add course" />
                </FormControl>
                <ButtonComponent text="Back" onClick={() => navigate('/')} />
            </main>
        </div>
    );
}