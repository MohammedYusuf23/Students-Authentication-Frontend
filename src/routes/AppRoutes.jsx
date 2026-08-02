import { Routes, Route, Navigate } from 'react-router-dom';

import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/login" element={<Login />} />

      <Route path="/home" element={<Home />} />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
