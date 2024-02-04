import axios from 'axios';

const API_URL = '/api/assignments/';

// create a new assignment
const createAssignment = async (assignmentData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, assignmentData, config);

    return response.data;
};

// get all assignments
const getAssignments = async (courseId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, courseId, config);

    return response.data;
};

// update an assignment
const updateAssignment = async (assignmentData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const assignmentId = assignmentData.id;
    const response = await axios.patch(`${API_URL}${assignmentId}`, assignmentData, config);

    return response.data;
}

// delete an assignment
const deleteAssignment = async (assignmentData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            id: assignmentData.id,
            course: assignmentData.course
        }
    }

    const id = assignmentData.id;
    const response = await axios.delete(`${API_URL}${id}`, config);

    return response.data;
};

const assignmentService = {
    createAssignment,
    getAssignments,
    updateAssignment,
    deleteAssignment
};

export default assignmentService;