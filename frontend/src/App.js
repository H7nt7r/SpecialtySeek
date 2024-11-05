import React, { Component } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Registration from './components/Registration';
import Universities from './components/Universities';
import Specialities from './components/Specialities';
import ShowFullSpeciality from './components/ShowFullSpeciality';
import ShowFullUniversity from './components/ShowFullUniversity';
import Profile from './components/Profile';
import "./css/style.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  return(
      <Router>
        <>
          <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/universities' element={<Universities />} />
            <Route path='/university/:id' element={<ShowFullUniversity isAuthenticated={isAuthenticated} />} />
            <Route path='/specialities' element={<Specialities />} />
            <Route path='/speciality/:id' element={<ShowFullSpeciality />} />
            <Route path='/profile' element={<Profile isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
          </Routes>
          <Footer />
        </>
      </Router>
  );
}

export default App;
