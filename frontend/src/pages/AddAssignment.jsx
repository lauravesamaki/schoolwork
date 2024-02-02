/* eslint-disable no-unused-vars */
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import ButtonComponent from '../components/Button';
import InputComponent from '../components/Input';

export default function AddAssignment() {
    const nav = useNavigate();
    const location = useLocation();

    return (
        <div className="App">
            <header className="App-header">
                <h1>Schoolwork</h1>
            </header>
            <main className='App-main'>
                <form className="form">
                    <InputComponent 
                        label="Assignment"
                        placeholder="Assignment"
                        required />
                    <InputComponent
                        type='date'
                        required />
                    <ButtonComponent text="Add assignment" type='submit' />
                </form>
                <ButtonComponent text="Back" onClick={() => nav('/')} />
            </main>
        </div>
    );
}