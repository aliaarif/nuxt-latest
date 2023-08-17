import PageModel from "~~/server/models/Page";

export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    try {
        if (params.slug) {
            return PageModel.findOne({ slug: params.slug }, {})
        } else {
            return PageModel.find({}, {})
        }
    } catch (error) {

    }
})