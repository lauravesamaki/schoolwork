/* eslint-disable no-unused-vars */
import '../App.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputComponent from "./Input";
import ButtonComponent from "./Button";
import { createCourse } from '../features/course/courseSlice';

export default function CourseForm() {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [teacher, setTeacher] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        
        const courseData = {
            name,
            code,
            teacher,
        };

        dispatch(createCourse(courseData));

        setName('');
        setCode('');
        setTeacher('');

        document.getElementById('add-course').style.display = 'none';
    }

    return (
        <div id="add-course" style={{display: 'none'}}>
            <form className="form" onSubmit={onSubmit}>
                <span 
                    className="close" 
                    style={{ 
                        textAlign: 'right',
                        cursor: 'pointer',
                        fontSize: '24px',
                        color: 'black'}}
                    onClick={() => document.getElementById('add-course').style.display = 'none'}>close
                </span>
                <InputComponent 
                    id="courseName"
                    label="Course name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                />
                <InputComponent 
                    id="courseCode" 
                    label="Course code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    />
                <InputComponent 
                    id="courseTeacher"
                    label="Course teacher"
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                    />
                <ButtonComponent text="Add course" type='submit' />
            </form>
        </div>
    );
}