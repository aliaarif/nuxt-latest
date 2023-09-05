import ContactModel from "~~/server/models/Contact";
export default defineEventHandler(async event => {
    const body = await readBody(event)
    const res = {}
    try {
        if (body._id) {
           
            const filter = { _id: body._id };
            const update = { status: body.status };

            // return update
            
            let result1 = ContactModel.updateOne(filter, update)
            res.status = 200
            res.message = 'Status Updated successfully'
         } else {
            let result1 = ContactModel.create(body)
            res.status = 201
            res.message = 'New Contact Generated successfully'
        }
    
        
        return res
    } catch (error) {
        console.log(error)
    }
})

