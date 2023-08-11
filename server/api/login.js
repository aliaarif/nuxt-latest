import UserModel from "~~/server/models/User";
// import { hashPassword } from '@/utilities/bcrypt.js';

export default defineEventHandler(async event => {
    const body = await readBody(event)
    const res = {}
    try {
        const user = UserModel.findOne({ email: body.username }, {})

        // res.value = user && await bcrypt.compare(body.password, user.password);
        // hashPassword(body.password)
        if (user) {
            res.value = user
        }
        return res.value

    } catch (error) {
        console.log(error)
    }
})