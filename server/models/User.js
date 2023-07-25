import mongoose from "mongoose";

// Define User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true }
})

// Compilng User Schema

const UserModel = mongoose.model('user', UserSchema)

export default UserModel
