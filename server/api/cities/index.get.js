import CityModel from "~~/server/models/City";

export default defineEventHandler(async () => {
    try {
        const cities = CityModel.find()
        return cities
    } catch (error) {
        console.log(error)
    }
})