import { Routes, Route, Navigate } from 'react-router-dom';

import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import ErrorPage from '../Pages/ErrorPage';

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
