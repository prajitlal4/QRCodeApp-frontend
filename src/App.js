import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import UserDashboardPage from './pages/UserDashboardPage';
import BusinessDashboardPage from './pages/BusinessDashboardPage';
import Protected from './components/Protected';
import BusinessSignUpPage from './pages/BusinessSignUpPage';
import BusinessTemplateSelectorPage from './pages/BusinessTemplateSelectorPage';
import BusinessFormBuilderPage from './pages/BusinessFormBuilderPage';
import FormViewPage from './pages/FormViewPage';
import ProtectedRoute from './components/ProtectedRoute';
import ApplicationSubmissionsPage from './pages/ApplicationSubmissionsPage';
import ApplicantInformationPage from './pages/ApplicantInformationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/form/:instanceId" element={<ProtectedRoute element={<FormViewPage />} />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-up-business" element={<BusinessSignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/dashboard" element={<Protected />}> {/* Protected route, checks if token exists before entering*/}
          <Route path="/dashboard" index element={<UserDashboardPage />} />
        </Route>
        <Route path="/business-dashboard" element={<Protected />}> {/* Protected route, checks if token exists before entering*/}
          <Route path="/business-dashboard" index element={<BusinessDashboardPage />} />
        </Route >
        <Route path="/submissions/:instanceId" element={<Protected />}> {/* Protected route, checks if token exists before entering*/}
          <Route path="/submissions/:instanceId" element={<ApplicationSubmissionsPage />} />
        </Route >
        <Route path="/submissions/:instanceId/responses/:submissionId" element={<Protected />}> {/* Protected route, checks if token exists before entering*/}
          <Route path="/submissions/:instanceId/responses/:submissionId" element={<ApplicantInformationPage />} />
        </Route >
        <Route path="/create-form/:templateId" element={<BusinessFormBuilderPage />} />
        <Route path="/template-selection" element={<BusinessTemplateSelectorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
