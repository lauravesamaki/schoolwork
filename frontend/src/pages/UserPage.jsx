/* eslint-disable no-unused-vars */
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {logout, reset} from '../features/auth/authSlice';
import axios from 'axios';
import { Dialog, DialogTitle, DialogActions, DialogContentText } from '@mui/material';
import ButtonComponent from '../components/Button';
import CourseDiv from '../components/CourseDiv';

export default function UserPage() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        nav('/');
    };

    return (
        <div className='App'>
            <header className='App-header user'>
                <h1>Schoolwork</h1>
            </header>
            <main className='App-main user-main'>
                <h2 id='user-h2'>Welcome!</h2>
                <div className="btns">
                    <ButtonComponent onClick={() => nav('/add-course') } text="Add course" />
                    <ButtonComponent onClick={handleLogout} text="Sign out" />
                </div>
                <div className="courses">
                    <h2 id='course-h2'>Courses</h2>
                    
                </div>
            </main>
        </div>
    );
}