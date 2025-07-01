const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
});

module.exports = mongoose.model("Property", PropertySchema);
