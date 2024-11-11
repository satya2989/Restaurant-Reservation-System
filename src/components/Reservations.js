import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reservations.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Reservations() {
    const [reservations, setReservations] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { usid } = location.state || {};

    useEffect(() => {
        if (usid!=null) {
            console.log(`User ID for reservations: ${usid}`);
            
            const fetchReservations = async () => {
                try {
                    const response = await axios.post('http://localhost:5000/reservationsdata', { usid });
                    setReservations(response.data);
                    console.log('Fetched Reservations:', response.data);
                } catch (error) {
                    console.error('Error fetching reservations:', error);
                    alert('Failed to fetch reservations. Please try again later.');
                }
            };
            fetchReservations();
        }
    }, [usid]);

    const handleBack = (e) => {
        e.preventDefault();
        navigate('/head', { state: { id: usid } });
    };

    return (
        <div className="reservations">
            <h2>Your Reservations</h2>
            <table>
                <thead>
                    <tr>
                        <th>USER ID</th>
                        <th>USER Name</th>
                        <th>USER Mobile Number</th>
                        <th>Restaurant ID</th>
                        <th>Restaurant Name</th>
                        <th>Restaurant City</th>
                        <th>Reservation Time</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.length > 0 ? (
                        reservations.map((res) => (
                            <tr key={res.user_id}>
                                <td>{res.user_id}</td>
                                <td>{res.user_name}</td>
                                <td>{res.MobileNo}</td>
                                <td>{res.restaurant_id}</td>
                                <td>{res.restaurant_name}</td>
                                <td>{res.restaurant_city}</td>
                                <td>{new Date(res.reservation_time).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No reservations found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button id="back"onClick={handleBack}>BACK</button>
        </div>
    );
}

export default Reservations;