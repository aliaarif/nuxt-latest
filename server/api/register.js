import UserModel from "~~/server/models/User";

export default defineEventHandler(async event => {
    const body = await readBody(event)
    const res = {}
    try {
        const user = UserModel.create(body)
        if (user) {
            res.value = user
        }
        return res.value

    } catch (error) {
        console.log(error)
    }
})