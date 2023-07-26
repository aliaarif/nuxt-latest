import BusinessModel from "~~/server/models/Business";

export default defineEventHandler(async (event) => {
    const params = getQuery(event)
    try {
        if (params.slug) {
            const meta = BusinessModel.findOne({ business_slug: params.slug }, {})
            return meta
        }
    } catch (error) {

    }
})