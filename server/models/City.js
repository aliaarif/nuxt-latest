import mongoose from "mongoose";

// Define City Schema
const citySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true }
})

citySchema.set('timestamps', true)

// Compilng City Schema
const CityModel = mongoose.model('city', citySchema)

export default CityModel
