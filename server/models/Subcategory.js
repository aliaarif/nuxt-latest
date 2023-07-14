import mongoose from "mongoose";

// Define subCategory Schema
const subCategorySchema = new mongoose.Schema({
    // categoryId: ObjectId,
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true }
})

// Compilng subCategory Schema

const SubcategoryModel = mongoose.model('subcategory', subCategorySchema)

export default SubcategoryModel
