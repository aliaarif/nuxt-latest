import CategoryModel from "~~/server/models/Category";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const params = getQuery(event)
    const body = await useBody(event)

    try {
        // const categories = CategoryModel.find({}, {})
        // console.log(subcategories)
        return body
    } catch (error) {
        // console.log(error)
    }
})