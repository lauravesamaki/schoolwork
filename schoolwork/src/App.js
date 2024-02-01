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
        <Route path="/" exact element={<HomePage />} />
        <Route path="/add-course" exact element={<AddCourse />} />
        <Route path="/add-assignment" exact element={<AddAssignment />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/login" exact element={<SignIn />} />
        <Route path="/user/:id" exact element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
