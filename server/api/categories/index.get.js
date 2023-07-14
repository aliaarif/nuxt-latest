import CategoryModel from "~~/server/models/Category";

export default defineEventHandler(async () => {
    try {

        // const categories = CategoryModel.distinct('name', {})
        const categories = CategoryModel.find()
        return categories
    } catch (error) {
        console.log(error)
    }
})