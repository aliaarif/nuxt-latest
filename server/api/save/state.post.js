import StateModel from "~~/server/models/State";
export default defineEventHandler(async event => {
    const body = await readBody(event)
    const res = {}
    try {
        let result1 = StateModel.create(body)
        res.status = 201
        res.message = 'New State Generated successfully'
        return res
    } catch (error) {
        console.log(error)
    }
})