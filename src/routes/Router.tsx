import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ReactHelmet from '../components/ReactHelmet';
import Join from '../pages/Join';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Verify from '../pages/Verify';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <ReactHelmet />
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/verify'} element={<Verify />} />
        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/join'} element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
