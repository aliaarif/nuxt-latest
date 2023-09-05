import ScriptModel from "~~/server/models/Script";
export default defineEventHandler(async event => {
    const body = await readBody(event)
    const res = {}
    try {
        let result1 = ScriptModel.create(body)
        res.status = 201
        res.message = 'New Script Generated successfully'
        return res
    } catch (error) {
        console.log(error)
    }
})