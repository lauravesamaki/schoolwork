/* eslint-disable no-unused-vars */
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage';
import AddCourse from './pages/AddCourse';
import AddAssignment from './pages/AddAssignment';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import UserPage from './pages/UserPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/add-course" exact element={<AddCourse />} />
          <Route path="/add-assignment" exact element={<AddAssignment />} />
          <Route path="/signup" exact element={<Register />} />
          <Route path="/login" exact element={<LogIn />} />
          <Route path="/user/:id" exact element={<UserPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
