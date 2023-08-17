import SubcategoryModel from "~~/server/models/Subcategory";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const params = getQuery(event)

    try {
        return SubcategoryModel.findOne({name:params.name }, {services:1, _id:0})    
    } catch (error) {
        console.log(error)
    }

})