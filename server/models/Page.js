import mongoose from "mongoose";
const pageSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    page_title: { type: String, required: true, trim: true },
    page_content: { type: String, required: true, trim: true },
    status: { type: String, required: false, trim: true }
})
pageSchema.set('timestamps', true)
const PageModel = mongoose.model('page', pageSchema)
export default PageModel
