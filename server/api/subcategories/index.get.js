import SubcategoryModel from "~~/server/models/Subcategory";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const params = getQuery(event)

    try {
        const subcategories = SubcategoryModel.find({}, {})
        // console.log(subcategories)
        return subcategories
    } catch (error) {
        // console.log(error)
    }
})