import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import ButtonComponent from '../components/Button';
import InputComponent from '../components/Input';
import Alert from '../components/Alert';

export default function AddAssignment() {
    const nav = useNavigate();
    const location = useLocation();

    const [name, setName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [course, setCourse] = useState({});

    const courseId = location.state.courseId;

    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${courseId}`)
            .then(response => {
                setCourse(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [courseId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newAssignment = {
            name: name,
            dueDate: dueDate,
            course: course
        };
        try {
            axios.post('http://localhost:5000/api/assignments', newAssignment)
                .then(response => {
                    document.querySelector('.Alert').className = 'Alert show';
                    setName('');
                    setDueDate('');
                    setTimeout(() => {
                        document.querySelector('.Alert').className = 'Alert';
                    }, 3000);
                })
            }
        catch (error) {
            console.log(error);
            document.querySelector('.Alert-error').className = 'Alert-error show';
            setTimeout(() => {
                document.querySelector('.Alert-error').className = 'Alert-error';
            }, 3000);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Schoolwork</h1>
            </header>
            <main className='App-main'>
                <Alert message='Assignment added succesfully!' />
                <form className="form" onSubmit={handleSubmit}>
                    <InputComponent 
                        label="Assignment"
                        placeholder="Assignment"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required />
                    <InputComponent
                        type='date'
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                        required />
                    <ButtonComponent text="Add assignment" type='submit' />
                </form>
                <ButtonComponent text="Back" onClick={() => nav('/')} />
            </main>
        </div>
    );
}