import InputComponent from "../components/Input";
import ButtonComponent from "../components/Button";
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Alert from '../components/Alert';

export default function AddCourse() {
    const nav = useNavigate();
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [teacher, setTeacher] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const course = {
            name,
            code,
            teacher
        };
        try {
        axios.post('http://localhost:5000/api/courses', course)
            .then(response => {
                nav('/');
                setName('');
                setCode('');
                setTeacher('');
            })
        }
        catch (error) {
            console.log(error);
            document.querySelector('.Alert-error').className = 'Alert-error show';
            setTimeout(() => {
                document.querySelector('.Alert-error').className = 'Alert-error';
            }, 3000);
        }
    }
    
    return (
        <div className="App">
            <header className="App-header">
                <h1>Schoolwork</h1>
            </header>
            <main className='App-main'>
                <Alert />
                <form className="form" onSubmit={handleSubmit} >
                    <InputComponent 
                        id="courseName"
                        label="Course name" 
                        onChange={(e) => setName(e.target.value)}
                        value={name} 
                        required />
                    <InputComponent 
                        id="courseCode" 
                        label="Course code" 
                        onChange={(e) => setCode(e.target.value)}
                        value={code} />
                    <InputComponent 
                        id="courseTeacher"
                        label="Course teacher" 
                        onChange={(e) => setTeacher(e.target.value)}
                        value={teacher} />
                    <ButtonComponent text="Add course" type='submit' />
                </form>
                <ButtonComponent text="Back" onClick={() => nav('/')} />
            </main>
        </div>
    );
}