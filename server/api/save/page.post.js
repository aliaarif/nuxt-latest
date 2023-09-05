import PageModel from "~~/server/models/Page";
export default defineEventHandler(async event => {
    const body = await readBody(event)
    const res = {}
    try {
        let result1 = PageModel.create(body)
        res.status = 201
        res.message = 'New Page Generated successfully'
        return res
    } catch (error) {
        console.log(error)
    }
})