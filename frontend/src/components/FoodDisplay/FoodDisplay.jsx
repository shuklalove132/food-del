import React, { useEffect, useState } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';
import axios from 'axios';
import Spinner from '../Spinner'; // A spinner component for loading animation

const FoodDisplay = ({ category }) => {
  const [food_list, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch food_list from the backend
    setLoading(true); // Start loading
    axios
      .get("https://ilcibo-backend.onrender.com/api/food/list")
      .then((response) => {
        setFoodList(response.data.data);
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("There was an error fetching the list!", error);
        setLoading(false); // Stop loading even on error
      });
  }, []);

  // Filter food items based on the selected category
  const filteredFoodList =
    category === "All"
      ? food_list
      : food_list.filter(
          (item) => item.category?.toLowerCase() === category.toLowerCase()
        );

  return (
    <div className="food-display">
      <div className="food-display-list">
        {loading ? (
          <Spinner /> // Display spinner while loading
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
