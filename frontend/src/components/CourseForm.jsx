/* eslint-disable no-unused-vars */
import '../App.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import InputComponent from "./Input";
import ButtonComponent from "./Button";
import { createCourse, updateCourse, getCourses, reset } from '../features/course/courseSlice';

export default function CourseForm( { course, setCourse }) {
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        name: '',
        code: '',
        teacher: ''
    });

    useEffect(() => {
        if (course && course.name) {
            setFormValues({
                name: course.name,
                code: course.code,
                teacher: course.teacher,
            });
        }
    }, [course]);

    const text = Object.keys(course).length === 0 ? 'Add' : 'Update';

    const onSubmit = (e) => {
        e.preventDefault();
        
        if (course && course._id) {
            dispatch(updateCourse({
                id: course._id,
                name: formValues.name,
                code: formValues.code,
                teacher: formValues.teacher,
                user: course.user
            }))
                .then(() => {
                    dispatch(getCourses());
                });
        }
        else {
            const courseData = {
                name: formValues.name,
                code: formValues.code,
                teacher: formValues.teacher
            };
    
            dispatch(createCourse(courseData))
                .then(() => {
                    dispatch(getCourses());
                });
        }

        setFormValues({
            name: '',
            code: '',
            teacher: ''
        });
    }

    return (
        <div id="course-form" style={{display: 'none'}}>
            <form className="form" onSubmit={onSubmit}>
                <span 
                    className="close" 
                    style={{ 
                        textAlign: 'right',
                        cursor: 'pointer',
                        fontSize: '24px',
                        color: 'black'}}
                    onClick={() => {
                        document.getElementById('course-form').style.display = 'none'
                        setFormValues({
                            name: '',
                            code: '',
                            teacher: ''
                        });

                        setCourse({});
                    }}>close
                </span>
                <InputComponent 
                    id="courseName"
                    label="Course name"
                    value={formValues.name}
                    onChange={(e) => setFormValues({...formValues, name: e.target.value})}
                    required 
                />
                <InputComponent 
                    id="courseCode" 
                    label="Course code"
                    value={formValues.code}
                    onChange={(e) => setFormValues({...formValues, code: e.target.value})}
                    />
                <InputComponent 
                    id="courseTeacher"
                    label="Course teacher"
                    value={formValues.teacher}
                    onChange={(e) => setFormValues({...formValues, teacher: e.target.value})}
                    />
                <ButtonComponent text={text} type='submit' />
            </form>
        </div>
    );
}