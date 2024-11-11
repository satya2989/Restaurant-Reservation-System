import React, { useState } from 'react';
import axios from 'axios';
import './ReservationForm.css';
import { useLocation, useNavigate } from 'react-router-dom';

function ReservationForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { restaurant, usid } = location.state; 
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [reservationTime, setReservationTime] = useState('');
    const [reservationId, setReservationId] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const reservation = {
            name,
            mobile,
            reservationTime,
            restaurantId: restaurant.restaurant_id, 
            usid
        };

        try {
            const response = await axios.post('http://localhost:5000/booking', reservation);
            setReservationId(response.data.reservationId);
            alert('Reservation Successful!');
            navigate('/head', { state: { id: usid } });
        } catch (error) {
            console.error('Error saving reservation:', error);
            alert('Failed to make reservation. Please try again.');
        }
    };

    return (
        <div className="reservation-form">
            {restaurant ? (
                <>
                    <h3>Make a Reservation at <h1>{restaurant.restaurant_name}</h1></h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Mobile Number:
                            <input
                                type="text"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Reservation Time:
                            <input
                                type="datetime-local"
                                value={reservationTime}
                                onChange={(e) => setReservationTime(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Make Reservation</button>
                    </form>
                    {reservationId && (
                        <div className="reservation-receipt">
                            <h4>Reservation Successful!</h4>
                            <p>Reservation ID: {reservationId}</p>
                            <p>Thank you for your reservation at {restaurant.restaurant_name}.</p>
                        </div>
                    )}
                </>
            ) : (
                <p>Restaurant data is not available.</p>
            )}
        </div>
    );
}

export default ReservationForm;