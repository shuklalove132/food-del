import { createContext, useEffect, useState } from "react";
import { food_list, menu_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "https://ilcibo-backend.onrender.com";
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const currency = "₹";
    const deliveryCharge = 50;

    // Add to Cart Function
    const addToCart = async (itemId) => {
        console.log("Adding to cart, itemId:", itemId);
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        if (token) {
            console.log("Token available, syncing with backend:", token);
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    // Remove from Cart Function
    const removeFromCart = async (itemId) => {
        console.log("Removing from cart, itemId:", itemId);
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (token) {
            console.log("Token available, syncing removal with backend:", token);
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    // Calculate Total Cart Amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        console.log("Calculating total cart amount, cartItems:", cartItems);

        for (const item in cartItems) {
            try {
                if (cartItems[item] > 0) {
                    let itemInfo = food_list.find((product) => product._id === item);
                    console.log("Item found in food list:", itemInfo);
                    totalAmount += itemInfo.price * cartItems[item];
                }
            } catch (error) {
                console.error("Error finding item in food list:", error);
            }
        }
        console.log("Total Cart Amount:", totalAmount);
        return totalAmount;
    };

    // Fetch Food List
    const fetchFoodList = async () => {
        console.log("Fetching food list from:", url + "/api/food/list");
        const response = await axios.get(url + "/api/food/list");
        console.log("Food list fetched:", response.data.data);
        setFoodList(response.data.data);
    };

    // Load Cart Data
    const loadCartData = async (token) => {
        console.log("Loading cart data with token:", token);
        const response = await axios.post(url + "/api/cart/get", {}, { headers: token });
        console.log("Cart data fetched:", response.data.cartData);
        setCartItems(response.data.cartData);
    };

    // Initial Load
    useEffect(() => {
        async function loadData() {
            console.log("Initial data load started.");
            await fetchFoodList();

            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                console.log("Token found in localStorage:", storedToken);
                setToken(storedToken);
                await loadCartData({ token: storedToken });
            }
        }
        loadData();
    }, []);

    // Context Value
    const contextValue = {
        url,
        food_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems,
        currency,
        deliveryCharge,
    };

    console.log("StoreContext contextValue:", contextValue);

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
