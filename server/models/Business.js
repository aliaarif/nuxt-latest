import mongoose from "mongoose";

// Define Bussines Schema
const businessSchema = new mongoose.Schema({
    business_name: { type: String, required: true, trim: true },
    business_slug: { type: String, required: true, trim: true },
    business_category: { type: String, required: true, trim: true },
    business_city: { type: String, required: true, trim: true },
    business_images: { type: Array, required: true, trim: true },
    business_timing: { type: String, required: true, trim: true }
})

businessSchema.set('timestamps', true)

// Compilng businessSchema Schema
const BusinessModel = mongoose.model('business', businessSchema)

export default BusinessModel
