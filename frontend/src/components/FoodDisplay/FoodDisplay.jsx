import React, { useEffect, useState } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';
import axios from 'axios';

const FoodDisplay = ({ category }) => {
  const [food_list, setFoodList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFoodList = async () => {
      console.time("fetchAndDisplayFoodList");
      let dataFetched = false;
      while (!dataFetched) {
        try {
          const response = await axios.get("https://ilcibo-backend.onrender.com/api/food/list");
          if (response.data.data && response.data.data.length > 0) {
            setFoodList(response.data.data);
            dataFetched = true;
          }
        } catch (error) {
          console.error("Error fetching food list, retrying...", error);
        }
      }
      setIsLoading(false);
      console.timeEnd("fetchAndDisplayFoodList");
    };

    fetchFoodList();
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
      {isLoading ? (
        <div className="loading-icon">Loading...</div>
      ) : (
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
      )}
    </div>
  );
};

export default FoodDisplay;
