import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: false, trim: true },
    phone: { type: Number, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, required: false, trim: true }
})
contactSchema.set('timestamps', true)
const ContactModel = mongoose.model('contact', contactSchema)
export default ContactModel
