/* eslint-disable no-unused-vars */
import InputComponent from "../components/Input";
import ButtonComponent from "../components/Button";
import '../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function AddCourse() {
    const nav = useNavigate();
    
    
    return (
        <div className="App">
            <header className="App-header">
                <h1>Schoolwork</h1>
            </header>
            <main className='App-main'>
                <form className="form" >
                    <InputComponent 
                        id="courseName"
                        label="Course name"
                        required />
                    <InputComponent 
                        id="courseCode" 
                        label="Course code" />
                    <InputComponent 
                        id="courseTeacher"
                        label="Course teacher" />
                    <ButtonComponent text="Add course" type='submit' />
                </form>
                <ButtonComponent text="Back" />
            </main>
        </div>
    );
}