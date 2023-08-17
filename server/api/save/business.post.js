import SubcategoryModel from "~~/server/models/Subcategory"
import BusinessModel from "~~/server/models/Business"
// import saveAs from 'file-saver'

export default defineEventHandler(async event => {
    const body = await readBody(event)
    const res = {}

    try {
        // const meta = SubcategoryModel.findOne({ name: body.business_category }, { page_title: 1, page_content: 1, _id: 0 })
        // body.page_title = meta.page_title
        if (body._id) {
            // res.imgs = []
            // body.business_images.forEach(async (blob) => {
            // const response = await fetch(blob);
            // const blob = await response.blob();
            // saveAs(blob, 'image.jpg');

            // Create a link element to trigger download
            // const imageURL = `./${blob}.jpg`;
            // let blobURL = URL.createObjectURL(blob);
            // const link = document.createElement('a');
            // link.href = blobURL;
            // link.download = imageURL;
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
            // });
            let result1 = BusinessModel.save(body)
            res.status = 200
            // res.meta = body.page_title
            res.message = 'Business Saved!'
        } else {
            // res.imgs = []
            // body.business_images.forEach(async (blob) => {
            // const response = await fetch(blob);
            // const blob = await response.blob();
            // saveAs(blob, 'image.jpg');

            // Create a link element to trigger download
            // const imageURL = `./${blob}.jpg`;
            // let blobURL = URL.createObjectURL(blob);
            // const link = document.createElement('a');
            // link.href = blobURL;
            // link.download = imageURL;
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
            // });
            let result2 = BusinessModel.create(body)
            res.status = 200
            res.message = 'Business Added!'
        }
        res.body = body
        // res.meta = body.page_title
        return res
    } catch (error) {
        console.log(error)
    }
})