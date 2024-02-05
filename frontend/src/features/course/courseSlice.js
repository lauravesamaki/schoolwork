import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import courseService from './courseService';

const initialState = {
    courses: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
};

// create a new course
export const createCourse = createAsyncThunk('course/create', 
    async (courseData, thunkAPI) => {
        try {
            const token =  thunkAPI.getState().auth.user.token;
            return await courseService.createCourse(courseData, token);
        }
        catch (error) {
            const message = (error.response && error.response.data.message)
                || error.message
                || error.toString();

            return thunkAPI.rejectWithValue({message});
        }
    }    
);

// get all courses
export const getCourses = createAsyncThunk('course/getAll',
    async (_, thunkAPI) => {
        try {
            const token =  thunkAPI.getState().auth.user.token;
            return await courseService.getAll(token);
        }
        catch (error) {
            const message = (error.response && error.response.data.message)
                || error.message
                || error.toString();

            return thunkAPI.rejectWithValue({message});
        }
    }
);

// update a course
export const updateCourse = createAsyncThunk('course/update',
    async (courseData, thunkAPI) => {
        try {
            const token =  thunkAPI.getState().auth.user.token;
            return await courseService.updateCourse(courseData, token);
        }
        catch (error) {
            const message = (error.response && error.response.data.message)
                || error.message
                || error.toString();

            return thunkAPI.rejectWithValue({message});
        }
    }
);

// delete a course
export const deleteCourse = createAsyncThunk('course/delete',
    async (courseId, thunkAPI) => {
        try {
            const token =  thunkAPI.getState().auth.user.token;
            return await courseService.deleteCourse(courseId, token);
        }
        catch (error) {
            const message = (error.response && error.response.data.message)
                || error.message
                || error.toString();

            return thunkAPI.rejectWithValue({message});
        }
    }
);

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCourse.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.courses.push(action.payload);
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getCourses.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.courses = action.payload;
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateCourse.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.courses = state.courses.map(
                    course => course._id === action.payload._id ? action.payload : course
                );
            })
            .addCase(updateCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteCourse.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.courses = state.courses.filter(
                    course => course._id !== action.payload.id
                );
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = courseSlice.actions;
export default courseSlice.reducer;