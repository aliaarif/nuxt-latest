import mongoose from "mongoose";

// Define Bussines Schema
const businessSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    title_slug: { type: String, required: true, trim: true },
    sub_category: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true }
})

// Compilng businessSchema Schema

const BusinessModel = mongoose.model('business', businessSchema)

export default BusinessModel
