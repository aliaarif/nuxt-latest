import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true }
})
categorySchema.set('timestamps', true)
const CategoryModel = mongoose.model('category', categorySchema)
export default CategoryModel


