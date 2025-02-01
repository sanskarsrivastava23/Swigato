const mongoose = require('mongoose');
const mongoURI = "mongodb://sanskar2303:Sanskar2308@swigato-shard-00-00.dpxuk.mongodb.net:27017,swigato-shard-00-01.dpxuk.mongodb.net:27017,swigato-shard-00-02.dpxuk.mongodb.net:27017/Swigato?ssl=true&replicaSet=atlas-th73nr-shard-0&authSource=admin&retryWrites=true&w=majority&appName=swigato";

const mongoDB = async () => {
    try {
        // Connect to MongoDB using correct options
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log("MongoDB connected successfully");

        // Fetch food_items collection data
        const fetched_data = await mongoose.connection.db.collection("food_items");

        fetched_data.find({}).toArray(async (err, data) => {
            if (err) {
                console.log("Error fetching food_items:", err);
                return;
            }

            // Fetch foodCategory collection data
            const foodCategory = await mongoose.connection.db.collection("foodCategory");

            foodCategory.find({}).toArray((err, catData) => {
                if (err) {
                    console.log("Error fetching foodCategory:", err);
                    return;
                }

                // Store collections in global variables
                global.food_items = data;
                global.foodCategory = catData;
                console.log("Data fetched and stored in global variables");
            });
        });

    } catch (err) {
        console.log("Connection error:", err);
    }
};

module.exports = mongoDB;
