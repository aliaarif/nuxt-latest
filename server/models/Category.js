import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    images: { type: String, required: true, trim: true },
    page_title: { type: String, required: false, trim: true },
    page_content: { type: String, required: false, trim: true },
    status: { type: String, required: false, trim: true }
})
categorySchema.set('timestamps', true)
const CategoryModel = mongoose.model('category', categorySchema)
export default CategoryModel


