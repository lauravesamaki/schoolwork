import './App.css';
import HomePage from './pages/HomePage';
import AddCourse from './pages/AddCourse';
import AddAssignment from './pages/AddAssignment';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/add-assignment" element={<AddAssignment />} />
      </Routes>
    </Router>
  );
}

export default App;
