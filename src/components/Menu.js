import React, { useState } from 'react';
import './Menu.css';
import { useNavigate } from 'react-router-dom';

function Menu({ restaurants, usid }) {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const navigate = useNavigate();
    const handleReservation = (restaurant) => {
        if (usid == null) {
            alert('YOU ARE NOT LOGGED IN');
            return;
        }
        navigate('/reserve', { state: { restaurant, usid } });
    };
    const toggleMenu = (restaurant) => {
        if (selectedRestaurant === restaurant) {
            setSelectedRestaurant(null);
        } else {
            setSelectedRestaurant(restaurant);
        }
    };
    return (
        <section className="menu">
            <h2>Restaurants</h2>
            <div className="menu-list">
                {restaurants.length > 0 ? (
                    restaurants.map((restaurant) => (
                        <div key={restaurant.restaurant_id} className="menu-item">
                            <img src={restaurant.restaurant_image} alt="restaurant" height="150" width="150"/>
                            <h3 class="wrap-text">Name: {restaurant.restaurant_name}</h3>
                            <p class="wrap-text"><strong>Address: </strong>{restaurant.restaurant_address}</p>
                            <p><strong>Rating: </strong>{restaurant.restaurant_rating}</p>
                            <button onClick={() => toggleMenu(restaurant)}>
                                {selectedRestaurant === restaurant ? 'Hide Menu' : 'Menu Highlights'}
                            </button>
                            {selectedRestaurant === restaurant && (
                                <div className="restaurant-details">
                                    <h4><b>Menu</b></h4>
                                    <ul>
                                        <li>{restaurant.restaurant_menu}</li>
                                    </ul>
                                    <button onClick={() => handleReservation(restaurant)}>Make Reservation</button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No restaurants found matching your criteria.</p>
                )}
            </div>
        </section>
    );
}

export default Menu;