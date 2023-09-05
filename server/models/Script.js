import mongoose from "mongoose";
const scriptSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    type: { type: String, required: false, trim: true },
    positions: { type: Array, required: false, trim: true },
    body: { type: String, required: false, trim: true },
    status: { type: String, required: false, trim: true }
})
scriptSchema.set('timestamps', true)
const ScriptModel = mongoose.model('script', scriptSchema)
export default ScriptModel
