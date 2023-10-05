import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/Layouts/Homepage/HomePage'
import AdminPage from './Pages/Layouts/AdminLayout';
import UserPage from './Pages/Layouts/UserLayout';
function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route path="/app/*" element={<AdminPage/>}/>
          <Route path="/user" element={<UserPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
