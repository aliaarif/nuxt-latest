import CategoryModel from "~~/server/models/Category";

export default defineEventHandler(async (event) => {
    const params = getQuery(event)

    try {
        if (params.name) {
            const meta = CategoryModel.findOne({ name: params.name }, {})
            return meta
        }
    } catch (error) {

    }
})