
import LeadModel from "~~/server/models/Lead";

export default defineEventHandler(async event => {
    const body = await readBody(event)
    const res = {}
    try {
        let result1 = LeadModel.create(body)
        res.status = 201
        res.message = 'New Lead Generated successfully'
        return res
    } catch (error) {
        console.log(error)
    }
})