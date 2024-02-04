/* eslint-disable no-unused-vars */
import '../App.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ButtonComponent from './Button';
import InputComponent from './Input';
import { createAssignment, updateAssignment, reset } from '../features/assignment/assignmentSlice';
import { getCourses } from '../features/course/courseSlice';
import FormatDate from './DateFormat';

export default function AssignmentForm({ id, assignment, completed}) {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
        name: '',
        dueDate: ''
    });

    useEffect(() => {
        if (assignment && assignment.dueDate) {
            const dueDate = FormatDate({ date: assignment.dueDate, language: 'eng' });
            setFormValues({
                name: assignment.name,
                dueDate: dueDate
            });
        }
    }, [assignment]);

    const text = Object.keys(assignment).length === 0 ? 'Add' : 'Update';

    const onSubmit = (e) => {
        e.preventDefault();
        
        if (assignment && assignment._id) {
            dispatch(updateAssignment({
                id: assignment._id,
                name: formValues.name,
                dueDate: formValues.dueDate,
                course: id,
                completed: completed[assignment._id]
            }))
                .then(() => {
                    dispatch(getCourses());
            });
        }
        else {
            const assignmentData = {
                name: formValues.name,
                dueDate: formValues.dueDate,
                course: id,
            };
    
            dispatch(createAssignment(assignmentData))
                .then(() => {
                    dispatch(getCourses());
            });    
        }

        setFormValues({
            name: '',
            dueDate: ''
        });

        document.getElementById(id).style.display = 'none';

        dispatch(reset());
    }

    return (
        <div id={id} className='add-assignment' style={{display: 'none'}}>
                <form className="form" onSubmit={onSubmit}>
                    <span 
                        className="close" 
                        style={{ 
                            textAlign: 'right',
                            cursor: 'pointer',
                            fontSize: '24px',
                            color: 'black'}}
                        onClick={() => document.getElementById(id).style.display = 'none'}>close
                    </span>
                    <InputComponent 
                        id="assignment"
                        label="Assignment"
                        placeholder="Assignment"
                        value={formValues.name || ''}
                        onChange={(e) => setFormValues({...formValues, name: e.target.value})}
                        required
                     />
                    <InputComponent
                        id="dueDate"
                        type='date'
                        value={formValues.dueDate || ''}
                        onChange={(e) => setFormValues({...formValues, dueDate: e.target.value})}
                        required
                     />
                    <ButtonComponent id="submitAssignment" text={text} type='submit' />
                </form>
        </div>
    );
}