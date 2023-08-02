import SubcategoryModel from "~~/server/models/Subcategory";
import BusinessModel from "~~/server/models/Business";

export default defineEventHandler(async event => {
    // const config = useRuntimeConfig()
    // const params = getQuery(event)
    const body = await readBody(event)

    const res = {}

    try {

        if (body.module == 'businesses') {
            // alert(11)
            let result2 = BusinessModel.create(body)
            res.status = 201
            res.message = 'Record Added to ' + body.module
        }

        // if (moduleName == 'businesses') {
        //     res.status = 200
        //     res.messege = "Business Added!"
        // }

        // if (moduleName == 'cities') {
        //     res.status = 200
        //     res.messege = "City Added!"
        // }

        // if (moduleName == 'states') {
        //     res.status = 200
        //     res.messege = "State Added!"
        // }

        // if (moduleName == 'users') {
        //     res.status = 200
        //     res.messege = "User Added!"
        // }

        return res
    } catch (error) {
        console.log(error)
    }
})