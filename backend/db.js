const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://deodhemanthan10:Manthan%404703@fooddelivery.mu98b3i.mongodb.net/epiceatsmern?retryWrites=true&w=majority&appName=FoodDelivery';

const MongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("Connected to MongoDB");

        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("food_Category").find({}).toArray();

        global.food_items = fetched_data;
        global.foodCategory = foodCategory;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = MongoDB;
