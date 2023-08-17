import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    assigned_city: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    posted: { type: Number, required: false, trim: true },
    approved: { type: Number, required: false, trim: true },
    rejected: { type: Number, required: false, trim: true },
    status: { type: String, required: false, trim: true }
})
UserSchema.set('timestamps', true)
const UserModel = mongoose.model('user', UserSchema)
export default UserModel
