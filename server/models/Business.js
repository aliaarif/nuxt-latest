import mongoose from "mongoose";
const businessSchema = new mongoose.Schema({
        business_name: { type: String, required: true, trim: true },
        business_slug: { type: String, required: true, trim: true },
        business_category: { type: String, required: false, trim: true },
        business_services: { type: Array, required: false, trim: true },
        business_timing: { type: Object, required: false, trim: true },
        business_address: { type: String, required: false, trim: true },
        business_locality: { type: String, required: false, trim: true },
        business_city: { type: String, required: false, trim: true },
        business_state: { type: String, required: false, trim: true },
        business_pin: { type: Number, required: false, trim: true },
        business_latitude: { type: String, required: false, trim: true },
        business_longitude: { type: String, required: false, trim: true },
        business_phone: { type: Number, required: false, trim: true },
        business_ownership: { type: String, required: false, trim: true },
        business_email: { type: String, required: false, trim: true },
        business_website: { type: String, required: false, trim: true },
        business_social: { type: Object, required: false, trim: true },
        business_description: { type: String, required: false, trim: true },
        business_faqs: { type: Array, required: false, trim: true },
        business_images: { type: Array, required: false, trim: true },
        created_by: { type: String, required: false, trim: true },
        updated_by: { type: String, required: false, trim: true },
        approved_by: { type: String, required: false, trim: true },
        page_title: { type: String, required: false, trim: true },
        page_content: { type: String, required: false, trim: true },
        status: { type: String, required: false, trim: true }
})

businessSchema.set('timestamps', true)
const BusinessModel = mongoose.model('business', businessSchema)
export default BusinessModel
