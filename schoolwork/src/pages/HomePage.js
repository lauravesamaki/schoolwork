import '../App.css';
import ButtonComponent from '../components/Button';
import CourseDiv from '../components/CourseDiv';
import { useNavigate } from 'react-router-dom';

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
                <div className="btns">
                <ButtonComponent onClick={() => nav('/add-course')} text="Add course" />
                <ButtonComponent onClick={() => nav('/add-assignment')} text="Add assignment" />
                </div>
                <div className="courses">
                <h2 id='course-h2'>Courses</h2>
                <CourseDiv courseName="Math" />
                <CourseDiv courseName="Science" />
                <CourseDiv courseName="English" />
                </div>
            </main>
        </div>
    );
}