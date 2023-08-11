import mongoose from "mongoose";

// Define User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true }
})

UserSchema.set('timestamps', true)

// Compilng User Schema
const UserModel = mongoose.model('user', UserSchema)

export default UserModel
