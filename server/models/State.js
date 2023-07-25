import mongoose from "mongoose";

// Define State Schema
const stateSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true }
})

// Compilng State Schema

const StateModel = mongoose.model('state', stateSchema)

export default StateModel
