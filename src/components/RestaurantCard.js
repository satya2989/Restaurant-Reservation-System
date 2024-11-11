import React, { useState } from 'react';
import ReservationForm from './ReservationForm';
import './RestaurantCard.css';

function RestaurantCard({ restaurant }) {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => setShowMenu(!showMenu);

    return (
        <div className="restaurant-card">
            <h3 onClick={toggleMenu}>{restaurant.name}</h3>
            <p>{restaurant.address}</p>
            <p>Rating: {restaurant.rating}</p>
            <p>Open Hours: {restaurant.openHours}</p>
            
            {showMenu && (
                <div className="menu">
                    <h4>Menu:</h4>
                    <ul>
                        {restaurant.menu.map((item, index) => (
                            <li key={index}>
                                {item.name} - ₹{item.price}
                            </li>
                        ))}
                    </ul>
                    <ReservationForm restaurant={restaurant} />
                </div>
            )}
        </div>
    );
}

export default RestaurantCard;