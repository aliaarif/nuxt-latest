import mongoose from "mongoose";
const leadSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: false, trim: true },
    phone: { type: String, required: true, trim: true },
    subcategory: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    query: { type: String, required: true, trim: true },
    status: { type: String, required: false, trim: true }
})
leadSchema.set('timestamps', true)
const LeadModel = mongoose.model('lead', leadSchema)
export default LeadModel
