import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ReactHelmet from '../components/ReactHelmet';
import Login from '../pages/Login';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <ReactHelmet />
      <Routes>
        <Route path={'/login'} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
