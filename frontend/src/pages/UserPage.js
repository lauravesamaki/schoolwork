import '../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogActions, DialogContentText } from '@mui/material';
import ButtonComponent from '../components/Button';
import CourseDiv from '../components/CourseDiv';
import Alert from '../components/Alert';

export default function UserPage() {
    const nav = useNavigate();
    const location = useLocation();
    const [courses, setCourses] = useState([]);
    const [open, setOpen] = useState(false);
    const [courseId, setCourseId] = useState('');

    const username = location.state.username;

    useEffect(() => {
        axios.get('http://localhost:5000/api/courses')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const deleteCourse = () => {
        try {
        axios.delete(`http://localhost:5000/api/courses/${courseId}`)
            .then(response => {
                setCourses(courses.filter(course => course._id !== courseId));
                document.querySelector('.Alert').className = 'Alert show';
                setOpen(false);
                setCourseId('');
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

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        nav('/');
    };

    const getInfo = async () => {
        try {
            const user = await axios.get('http://localhost:5000/api/users', { 
                params: { username: username },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (user.status === 200) {
                const elem = document.querySelector('#userInfo')
                elem.innerHTML = `Username: ${user.data.username} <br /> ID: ${user.data._id}`;
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='App'>
            <header className='App-header user'>
                <h1>Schoolwork</h1>
            </header>
            <main className='App-main user-main'>
                <h2 id='user-h2'>Welcome, {username}!</h2>
                <ButtonComponent onClick={getInfo} text='My info' />
                <p id='userInfo'></p>
                <div className="btns">
                    <ButtonComponent onClick={() => nav('/add-course') } text="Add course" />
                    <ButtonComponent onClick={handleLogout} text="Sign out" />
                </div>
                <Alert message='Course deleted succesfully!' />
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Are you sure you want to delete course?</DialogTitle>
                    <DialogContentText>
                        Deleting a course will also delete all assignments associated with it.
                        This action cannot be undone.
                    </DialogContentText>
                    <DialogActions>
                        <ButtonComponent onClick={handleClose} text="Cancel" />
                        <ButtonComponent onClick={deleteCourse} text="Delete" />
                    </DialogActions>
                </Dialog>
                <div className="courses">
                    <h2 id='course-h2'>Courses</h2>
                    {courses.length > 0 ? courses.map((course, index) => (
                        <div className='course-div'>
                            <CourseDiv 
                                key={index}
                                id={course._id}
                                courseName={course.name}
                                code={course.code}
                                teacher={course.teacher}
                            />                        
                            <ButtonComponent
                                text="Assignments"
                                onClick={
                                    () => nav('/add-assignment', {state: {courseId: course._id}})} />
                            <ButtonComponent
                                text="Delete"
                                onClick={() => {setCourseId(course._id); setOpen(true)}} />
                            <ButtonComponent text="Edit" />
                        </div>)) : <p>No courses added yet</p>
                    }
                </div>
            </main>
        </div>
    );
}