import BusinessModel from "~~/server/models/Business";
import SubcategoryModel from "~~/server/models/Subcategory";


export default defineEventHandler(async event => {
    const body = await readBody(event)
    const res = {}
    try {

        if (body.mod == 'BusinessModel') {
            return BusinessModel.count({ business_category: 'Car Rental' }, {})
        }

    } catch (error) {
        console.log(error)
    }
})