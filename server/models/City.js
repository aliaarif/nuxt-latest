import mongoose from "mongoose";
const citySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    status: { type: String, required: false, trim: true }
})
citySchema.set('timestamps', true)
const CityModel = mongoose.model('city', citySchema)
export default CityModel
