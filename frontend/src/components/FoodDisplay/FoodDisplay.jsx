import React, { useContext, useEffect, useState } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';
import './FoodDisplay.css';
import axios from 'axios';

const FoodDisplay = ({ category }) => {
  const [food_list, setFoodList] = useState([]);


    useEffect(() => {
        // Fetch food_list from the backend
        axios.get("https://ilcibo-backend.onrender.com/api/food/list")
          .then((response) => {
            setFoodList(response.data.data);
          })
          .catch((error) => {
            console.error("There was an error fetching the list!", error);
          });
      }, []);
    


    // Filter food items based on the selected category
    const filteredFoodList = category === "All" 
        ? food_list 
        : food_list.filter(item => item.category?.toLowerCase() === category.toLowerCase());

    useEffect(() => {
        console.log("Current category in FoodDisplay:", category);
        console.log("All categories in food_list:", food_list.map(item => item.category));
        console.log("Filtered food list:", filteredFoodList);
    }, [category, filteredFoodList]);

    return (
        <div className="food-display">
            <div className="food-display-list">
                {filteredFoodList.length > 0 ? (
                    filteredFoodList.map((item) => (
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
        </div>
    );
};

export default FoodDisplay;
