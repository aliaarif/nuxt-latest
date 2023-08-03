import SubcategoryModel from "~~/server/models/Subcategory";

export default defineEventHandler(async event => {
    const body = await readBody(event)
    const res = {}
    try {
        SubcategoryModel.create(body)
        res.status = 201
        res.message = 'Record Added to ' + body.module
        res.payload = body
        return res
    } catch (error) {
        console.log(error)
    }
})