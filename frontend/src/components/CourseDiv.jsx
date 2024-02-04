import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteAssignment } from '../features/assignment/assignmentSlice';
import { getCourses } from '../features/course/courseSlice';
import ButtonComponent from './Button';
import AssignmentForm from '../components/AssignmentForm';
import FormatDate from './DateFormat';
import Confirmation from './Confirmation';

export default function CourseDiv({ course, onClick }) {
    const dispatch = useDispatch();

    const [completedStates, setCompletedStates] = useState(false);
    const [editingAssignment, setEditingAssignment] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(!course.assignments) {
            return;
        }

        const newCompletedStates = course.assignments.reduce(
            (acc, assignment) => {
                acc[assignment._id] = assignment.completed;
                return acc;
            }, {});

        setCompletedStates(newCompletedStates);
    }, [course.assignments]);

    const handleCheckboxChange = (id, e) => {
        setCompletedStates({
            ...completedStates,
            [id]: e.target.checked
        });
    };

    const addAssignment = () => {
        document.getElementById(course._id).style.display = 'block';
    };

    const editAssignment = (e) => {
        document.getElementById(course._id).style.display = 'block';
        
        const id = e.currentTarget.id.split('-')[1];

        const assignment = course.assignments.find((assignment) => assignment._id === id);

        setEditingAssignment(assignment);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = (id) => {
        const courseId = course._id;
        dispatch(deleteAssignment({ 
            id: id, 
            course: courseId 
        }));
        setOpen(false);
        dispatch(getCourses());
    };
    
    return (
        <div className="course-elem">
            <h2>{course.name}</h2>
            <p>{course.code}</p>
            <p>{course.teacher}</p>
                        <div className='assignments'>
                            {course.assignments && course.assignments.length > 0 ? 
                                course.assignments.map((assignment) => {
                                    return (
                                        <div 
                                            key={assignment._id} 
                                            className={assignment.completed ? `completed${assignment._id}` : `incomplete${assignment._id}`}>
                                                <h4>{assignment.name}</h4>
                                                <div
                                                    className='assignment-div'
                                                    style={{
                                                        display: 'flex', 
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center'
                                                    }}>
                                                    <p style={{
                                                        margin: '5px'
                                                    }}>
                                                        {FormatDate({ date: assignment.dueDate, language: 'fin'})}
                                                    </p>
                                                    <Checkbox
                                                        id={`checkBox-${assignment._id}`}
                                                        checked={completedStates[assignment._id] || false}
                                                        onChange={(e) => handleCheckboxChange(assignment._id, e)}
                                                        sx={{
                                                            margin: '5px',
                                                            color: 'white',
                                                            '& .Mui-checked': {
                                                                color: 'white'
                                                            }
                                                        }} />
                                                    <EditIcon
                                                        id={`edit-${assignment._id}`}
                                                        onClick={editAssignment}
                                                        sx={{
                                                            cursor: 'pointer',
                                                            margin: '5px'                                                        
                                                        }} />
                                                    <DeleteIcon 
                                                        id={`delete-${assignment._id}`}
                                                        onClick={handleOpen}
                                                        sx={{
                                                            cursor: 'pointer',
                                                            margin: '5px'
                                                        }} />
                                                </div>
                                                <Confirmation 
                                                    open={open}
                                                    title='Are you sure you want to delete this assignment?'
                                                    message='This action cannot be undone.'
                                                    handleClose={handleClose}
                                                    handleConfirm={() => handleConfirm(assignment._id)} />
                                        </div>
                                    )
                                }) : <p>No assignments</p>
                            }
                        </div>
            <ButtonComponent text="Add assignment" onClick={addAssignment} />
            <AssignmentForm id={course._id} assignment={editingAssignment} completed={completedStates} />
            <ButtonComponent text="Delete course" onClick={onClick} />
        </div>
    );
}