import SubcategoryModel from "~~/server/models/Subcategory";

export default defineEventHandler(async (event) => {
    const params = getQuery(event)

    try {
        if (params.name) {
            const meta = SubcategoryModel.findOne({ name: params.name }, {})
            return meta
        }
    } catch (error) {

    }
})