import UserModel from "~~/server/models/User";
export default defineEventHandler(async event => {
    const body = await readBody(event)
    const res = {}
    try {

        if (body._id) {
        //    return body._id
            const filter = { _id: body._id };
            // const update = {
            //     "name": body.name,
            //     "gender": body.gender,
            // };

            // Define the filter criteria to find the document to update
            // const filter = { _id: body._id }; // Replace with the actual document ID

            // // Define the update operation
            const update = {
                $set: {
                    // Update the fields you want to change
                    name: body,
                    gender: body.gender,
                    address: body.address,
                    locality: body.locality
                },
            };
            
            
            let result1 = UserModel.updateOne(filter, update).exec()
            if (result1) {
                return result1
                
                res.user = UserModel.find({"_id": body._id}, {})
                res.status = 200
                res.message = 'Profile Saved successfully'
              
            } 
         } else {
            let result2 = UserModel.create(body)
            res.status = 201
            res.message = 'New User Generated successfully'
        }

       


      
        return res
    } catch (error) {
        console.log(error)
    }
})