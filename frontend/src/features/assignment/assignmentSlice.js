import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import assignmentService from './assignmentService';

const initialState = {
    assignments: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
};

// create a new assignment
export const createAssignment = createAsyncThunk('assignment/create',
    async (assignmentData, thunkAPI) => {
        try {
            const token =  thunkAPI.getState().auth.user.token;
            return await assignmentService.createAssignment(assignmentData, token);
        }
        catch (error) {
            const message = (error.response && error.response.data.message)
                || error.message
                || error.toString();

            return thunkAPI.rejectWithValue({message});
        }
    }
);

// get all assignments
export const getAssignments = createAsyncThunk('assignment/getAll',
    async (_, thunkAPI) => {
        try {
            const token =  thunkAPI.getState().auth.user.token;
            return await assignmentService.getAssignments(token);
        }
        catch (error) {
            const message = (error.response && error.response.data.message)
                || error.message
                || error.toString();

            return thunkAPI.rejectWithValue({message});
        }
    }
);

// update an assignment
export const updateAssignment = createAsyncThunk('assignment/update',
    async (assignmentData, thunkAPI) => {
        try {
            const token =  thunkAPI.getState().auth.user.token;
            return await assignmentService.updateAssignment(assignmentData, token);
        }
        catch (error) {
            const message = (error.response && error.response.data.message)
                || error.message
                || error.toString();

            return thunkAPI.rejectWithValue({message});
        }
    }
);

// delete an assignment
export const deleteAssignment = createAsyncThunk('assignment/delete',
    async (assignmentId, thunkAPI) => {
        try {
            const token =  thunkAPI.getState().auth.user.token;
            return await assignmentService.deleteAssignment(assignmentId, token);
        }
        catch (error) {
            const message = (error.response && error.response.data.message)
                || error.message
                || error.toString();

            return thunkAPI.rejectWithValue({message});
        }
    }
);

export const assignmentSlice = createSlice({
    name: 'assignment',
    initialState,
    reducers: {
        reset: state => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAssignment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAssignment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.assignments.push(action.payload);
            })
            .addCase(createAssignment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAssignments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAssignments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.assignments = action.payload;
            })
            .addCase(getAssignments.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateAssignment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAssignment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.assignments = state.assignments.map(
                    assignment => assignment._id === action.payload._id ? action.payload : assignment
                );
            })
            .addCase(updateAssignment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteAssignment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAssignment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.assignments = state.assignments.filter(
                    assignment => assignment._id !== action.payload._id
                );
            })
            .addCase(deleteAssignment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = assignmentSlice.actions;
export default assignmentSlice.reducer;