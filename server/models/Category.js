import mongoose from "mongoose";

// Define Category Schema
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true }
})

// Compilng Category Schema

const CategoryModel = mongoose.model('category', categorySchema)

export default CategoryModel


