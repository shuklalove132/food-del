import React, { useContext, useEffect } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';
import './FoodDisplay.css';

const FoodDisplay = () => {
    const { food_list, url, currency, cartItems } = useContext(StoreContext);

    // Log context data to check if data is received correctly
    console.log("FoodDisplay component rendered");
    console.log("Food list in FoodDisplay:", food_list);
    console.log("URL in FoodDisplay:", url);
    console.log("Currency in FoodDisplay:", currency);
    console.log("Cart items in FoodDisplay:", cartItems);

    useEffect(() => {
        console.log("FoodDisplay useEffect called to check data load");

        if (food_list.length === 0) {
            console.warn("Warning: food_list is empty in FoodDisplay");
        }
    }, [food_list]);

    return (
        <div className="food-display">
            {food_list.length > 0 ? (
                food_list.map((item) => (
                    <FoodItem
                        key={item._id}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                        description={item.description}
                    />
                ))
            ) : (
                <p>No food items available.</p>
            )}
        </div>
    );
};

export default FoodDisplay;
