import './App.css';
import HomePage from './pages/HomePage';
import AddCourse from './pages/AddCourse';
import AddAssignment from './pages/AddAssignment';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import UserPage from './pages/UserPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/add-assignment" element={<AddAssignment />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/userpage" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
