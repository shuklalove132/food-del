import foodModel from "../models/foodModel.js";

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
        res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Credentials", "true");
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// add food
const addFood = async (req, res) => {
    try {
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.body.image, // Using image URL from Firebase
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
          next();
        console.log(res);
        console.log(food);
        
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// delete food
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
          next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { listFood, addFood, removeFood };
