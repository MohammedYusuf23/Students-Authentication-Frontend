import { Routes, Route, Navigate } from 'react-router-dom';

import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import New from '../Pages/New';
// import FakeHome from '../Pages/FakeHome'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/login" element={<Login />} />

      <Route path="/home" element={<New />} />
      {/* <Route path="/newhome" element={<FakeHome />} /> */}
    </Routes>
  );
}
