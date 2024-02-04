import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import courseReducer from '../features/course/courseSlice';
import assignmentReducer from '../features/assignment/assignmentSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        course: courseReducer,
        assignment: assignmentReducer,
    },
});