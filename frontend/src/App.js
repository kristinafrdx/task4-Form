import './App.css';
import React from 'react';
import {  Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login.js';
import Registration from './components/Registration.js';
import Table from './components/Table.js';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/registration' element={<Registration />}/>
      <Route path='/table' element={<Table />}/>
    </Routes>
    </div>
  );
}

export default App;
