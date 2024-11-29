import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ReactHelmet from '../components/ReactHelmet';
import Login from '../pages/Login';
import Verify from '../pages/Verify';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <ReactHelmet />
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/verify'} element={<Verify />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
