
import ContactModel from "~~/server/models/Contact";

export default defineEventHandler(async event => {
    const body = await readBody(event)
    const res = {}
    try {
        let result1 = ContactModel.create(body)
        res.status = 201
        res.message = 'Message Sent.'
        return res
    } catch (error) {
        console.log(error)
    }
})