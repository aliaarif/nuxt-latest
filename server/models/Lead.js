import mongoose from "mongoose";

// Define subCategory Schema
const leadSchema = new mongoose.Schema({
    // categoryId: ObjectId,
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    subcategory: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    full_path: { type: String, required: true, trim: true }
})

leadSchema.set('timestamps', true)

// Compilng subCategory Schema
const LeadModel = mongoose.model('lead', leadSchema)

export default LeadModel
