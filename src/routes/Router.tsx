import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ReactHelmet from '../components/ReactHelmet';
import Login from '../pages/Login';
import Verify from '../pages/Verify';
import Signup from '../pages/Signup';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <ReactHelmet />
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/verify'} element={<Verify />} />
        <Route path={'/signup'} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
