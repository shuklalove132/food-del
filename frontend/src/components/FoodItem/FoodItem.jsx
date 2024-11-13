import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, description, id }) => {
    const { cartItems, addToCart, removeFromCart, url, currency } = useContext(StoreContext);

    console.log("Rendering FoodItem:", { image, name, price, description, id });
    console.log("Cart items in FoodItem:", cartItems);
    
    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={`${image}`} alt={name} />
                {!cartItems[id] ? (
                    <img className='add' onClick={() => { console.log("Add to cart clicked"); addToCart(id); }} src={assets.add_icon_white} alt="Add to Cart" />
                ) : (
                    <div className="food-item-counter">
                        <img src={assets.remove_icon_red} onClick={() => { console.log("Remove from cart clicked"); removeFromCart(id); }} alt="Remove from Cart" />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} onClick={() => { console.log("Increase item count clicked"); addToCart(id); }} alt="Add more" />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p> <img src={assets.rating_starts} alt="Rating" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">{currency}{price}</p>
            </div>
        </div>
    );
};

export default FoodItem;
