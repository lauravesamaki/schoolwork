import axios from 'axios';

const API_URL = '/api/courses/';

// create a new course
const createCourse = async (courseData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, courseData, config);

    return response.data;
};

// get all courses
const getAll = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config);

    return response.data;
};

// delete a course
const deleteCourse = async (courseData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            id: courseData.id
        }
    }

    const courseId = courseData.id;
    const response = await axios.delete(`${API_URL}${courseId}`, config);

    return response.data;
};

const courseService = {
    createCourse,
    getAll,
    deleteCourse
};

export default courseService;