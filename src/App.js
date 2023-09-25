import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import UserDashboardPage from './pages/UserDashboardPage';
import BusinessDashboardPage from './pages/BusinessDashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        {/* <Route path="/dashboard" element={<UserDashboardPage />} /> */}
        <Route path="/business-dashboard" element={<BusinessDashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
