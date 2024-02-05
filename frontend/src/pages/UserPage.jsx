/* eslint-disable no-unused-vars */
import '../App.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {logout} from '../features/auth/authSlice';
import {getCourses, deleteCourse, reset} from '../features/course/courseSlice';
import ButtonComponent from '../components/Button';
import CourseDiv from '../components/CourseDiv';
import CourseForm from '../components/CourseForm';
import Confirmation from '../components/Confirmation';

export default function UserPage() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [editingCourse, setEditingCourse] = useState({});

    const {user} = useSelector((state) => state.auth);
    const {courses, isLoading, isError, message} = useSelector((state) => state.course);

    useEffect(() => {
        if(isError) {
            console.log(message);
        }

        if(!user) {
            nav('/login');
        }

        dispatch(getCourses());

        return () => {
            dispatch(reset());
        }
    }, [user, nav, isError, message, dispatch]);
    

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        nav('/');
    };

    const addCourse = () => {
        document.getElementById('course-form').style.display = 'block';
    };

    const editCourse = (course) => {
        document.getElementById('course-form').style.display = 'block';
        
        setEditingCourse(course);
    };

    const handleOpen = (id) => {
        setSelectedCourseId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCourseId(null);
    };

    const handleDelete = (id) => {
        dispatch(deleteCourse({id: id}))
            .then(() => {
                dispatch(getCourses());
            });
    };

    if(isLoading) {
        return (
            <div className='App'>
                <header className='App-header user'>
                    <h1>Schoolwork</h1>
                </header>
                <main className='App-main user-main'>
                    <h2>Loading...</h2>
                </main>
            </div>
        );
    }

    return (
        <div className='App'>
            <header className='App-header user'>
                <h1>Schoolwork</h1>
            </header>
            <main className='App-main user-main'>
                <h2 id='user-h2'>Welcome {user && user.username}!</h2>
                <div className="btns">
                    <ButtonComponent onClick={handleLogout} text="Sign out" />
                    <ButtonComponent onClick={addCourse} text="Add Course" user={user} />
                </div>
                <CourseForm user={user && user._id} course={editingCourse} setCourse={setEditingCourse} />
                <div className="courses">
                    <h2 id='course-h2'>Courses</h2>
                    {courses.length > 0 ? 
                        courses.map((course, index) => {
                            return <React.Fragment key={course._id + index}>
                                    <CourseDiv
                                        course={course}
                                        onClickDelete={() => handleOpen(course._id)}
                                        onClickEdit={() => editCourse(course)}
                                     />
                                    {open && selectedCourseId === course._id && (<Confirmation 
                                        open={open}
                                        title={`Are you sure you want to delete ${course.name} course?`}
                                        message="This action cannot be undone and will delete all assignments associated with this course."
                                        onClose={handleClose}
                                        handleClose={handleClose}
                                        handleConfirm={() => handleDelete(course._id)}/>
                                    )}
                            </React.Fragment>
                        }) :
                        (<p>You don't have courses yet</p>)}
                </div>
            </main>
        </div>
    );
}