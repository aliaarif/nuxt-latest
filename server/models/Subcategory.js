import mongoose from "mongoose";
const subCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    page_title: { type: String, required: true, trim: true },
    page_content: { type: String, required: true, trim: true }
})
subCategorySchema.set('timestamps', true)
const SubcategoryModel = mongoose.model('subcategory', subCategorySchema)
export default SubcategoryModel
