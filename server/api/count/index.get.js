
import CityModel from "~~/server/models/City";
import BusinessModel from "~~/server/models/Business";
export default defineEventHandler(async event => {
    const params = getQuery(event)
    const res = {}
    try {
        if (params.mod == 'CityModel') {
            return CityModel.count({ state: params.countTerm }, {}).count()
        }

        if (params.mod == 'BusinessModel') {
            return BusinessModel.count({ business_category: params.countTerm }, {}).count()
        }
    } catch (error) {
        console.log(error)
    }
})