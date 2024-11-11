import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './components/Header';
import ReservationForm from './components/ReservationForm';
import Menu from './components/Menu';
import Reservations from './components/Reservations';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/head" element={<Header />} />
                    <Route path="/reserve" element={<ReservationForm/>}/>
                    <Route path="/reservations" element={<Reservations />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;