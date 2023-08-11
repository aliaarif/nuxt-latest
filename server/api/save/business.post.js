import BusinessModel from "~~/server/models/Business";
// import connectToDatabase from "../plugins/db"
// import multer from 'multer'
// import path from 'path'



export default defineEventHandler(async event => {
    const body = await readBody(event)
    const res = {}



    try {
        if (body._id) {

            return body.business_images[0]

            // body.business_images.forEach(function (img, index) {
            //     console.log(`Img at index ${index}: ${img}`);

            // })

            // const storage = multer.diskStorage({
            //     destination: (body, file, cb) => {
            //         cb(null, 'uploads/');
            //     },
            //     filename: (body, file, cb) => {
            //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            //         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
            //     },
            // });
            // const upload = multer({ storage });



            // const files = body.business_images.map((file) => ({
            //     filename: file.filename,
            //     path: file.path
            // }));



            // body.business_images = []

            // body.business_images = JSON.stringify(files)
            // let result2 = BusinessModel.updateOne(body)
            // res.status = 200
            // res.message = 'Record updated for business'


        } else {
            // return body.business_timing

            // const arr = ref([])
            // for (let i = 0; i < body.business_images.length; i++) {

            //     console.log(body.business_images[i])
            //     arr.value.push(body.business_images[i])
            // }
            // return arr.value

            // body.business_images.forEach(function (arr, img, index) {
            //     // console.log(`Img at index ${index}: ${img}`);
            //     const storage = multer.diskStorage({
            //         destination: (req, img, cb) => {
            //             cb(null, 'uploads/');
            //         },
            //         filename: (req, img, cb) => {
            //             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            //             cb(null, img.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
            //         },
            //     });
            //     const upload = multer({ storage });
            // })





            // const files = body.business_images.map((file) => ({
            //     name: file.name,
            //     size: file.size
            // }));



            // body.business_images = []

            // body.business_images = JSON.stringify(files)
            let result2 = BusinessModel.create(body)
            res.status = 200
            res.message = 'Record added for business'
        }
        res.body = body
        return res
    } catch (error) {
        console.log(error)
    }
})