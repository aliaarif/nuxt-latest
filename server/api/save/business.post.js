import SubcategoryModel from "~~/server/models/Subcategory";
import BusinessModel from "~~/server/models/Business";

export default defineEventHandler(async event => {
    // const config = useRuntimeConfig()
    // const params = getQuery(event)
    const body = await readBody(event)

    const res = {}

    try {
        return body
        if (!body.editFlag) {
            let result1 = BusinessModel.create(body)
            res.status = 201
            res.message = 'Record Added to ' + body.module
        } else {
            let result2 = BusinessModel.update(body)
            res.status = 200
            res.message = 'Record updated for ' + body.module
        }


        return res
    } catch (error) {
        console.log(error)
    }
})