import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Menu from './Menu'; 
import "./Header.css";

function Header({ id }) {
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState('');
    const [rests, setRests] = useState([]);
    const [sorting, setsorting] = useState('DESC');
    const [usid, setUsid] = useState(null);

    const navigate = useNavigate();
    const locationState = useLocation();
    useEffect(() => {
        const userId = id || locationState.state?.id;
        if (userId) {
            setUsid(userId);
        }
    }, [id, locationState.state]);

    const locations = [
        'Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Kolkata',
        'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Goa',
        'Chandigarh', 'Lucknow', 'Kochi', 'Gurgaon', 'Noida'
    ];

    const ratings = ['4', '3', '2', '1'];

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/restaurants', {
                location,
                rating,
                sorting
            });
            setRests(response.data);
        } catch (error) {
            console.log('Error fetching restaurants:', error);
        }
    };

    const handleGoToReservations = () => {
        navigate('/reservations', { state: { usid } });
    };

    const handledesc = () => {
        setsorting('DESC');
        handleSearch();
    };

    const handleasc = () => {
        setsorting('ASC');
        handleSearch();
    };

    return (
        <header className="header">
            <h1>Dine At Your Favorite Restaurant in India</h1>
            <nav>
                <ul>
                    <li><button onClick={() => navigate('/login')}>Login</button></li>
                    <li><button onClick={handleGoToReservations}>Reservations</button></li>
                    <li><button onClick={() => navigate('/contact')}>Contact</button></li>
                    <li>{`User ID:${usid ? usid : 'Not Logged In'}`}</li>
                </ul>
                <hr />
            </nav>
            <form className="search-form" onSubmit={handleSearch}>
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value="">Select Location</option>
                    {locations.map((loc, index) => (
                        <option key={index} value={loc}>{loc}</option>
                    ))}
                </select>
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value="">Select Rating</option>
                    {ratings.map((rate, index) => (
                        <option key={index} value={rate}>Above {rate}</option>
                    ))}
                </select>
                <button type="submit">Search</button>
                <button type="button" onClick={handleasc}>Sort Asc</button>
                <button type="button" onClick={handledesc}>Sort Desc</button>
            </form>
            <Menu restaurants={rests} usid={usid} />
        </header>
    );
}

export default Header;