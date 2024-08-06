import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import React from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import ClassesPage from './pages/ClassesPage';
import DashboardPage from './pages/DashboardPage';
import HandleWithdrawalPage from './pages/HandleWithdrawalsPage';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import AuthGuard from './utils/AuthGuard';
import PublicRoute from './utils/PublicRoute';
import ClassInfoPage from './pages/ClassInfoPage';
function App() {
  return (
    <Router>
      <Navbar />
      <div className="max-w-screen">
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LoginPage />} />
          </Route>
          <Route element={<AuthGuard />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/withdrawals" element={<HandleWithdrawalPage />} />
            <Route path="/class/:id" element={<ClassInfoPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />;
        </Routes>
      </div>
    </Router>
  );
}

export default App;
