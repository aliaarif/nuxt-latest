import mongoose from "mongoose";
const stateSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true }
})
stateSchema.set('timestamps', true)
const StateModel = mongoose.model('state', stateSchema)
export default StateModel
