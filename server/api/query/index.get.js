import SubcategoryModel from "~~/server/models/Subcategory";
import BusinessModel from "~~/server/models/Business";

export default defineEventHandler(async (event) => {
    // const config = useRuntimeConfig()

    const slug = (str) => {
        return str ? str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') : '';
    }

    const title = (str) => {
        var words = str ? str.split('-') : '';
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            words[i] = word.charAt(0).toUpperCase() + word.slice(1);
        }
        return words ? words.join(' ') : '';
    }

    const params = getQuery(event)


    if (params.category) {
        return SubcategoryModel.find({ "category": params.category }, {})
    }


    if (params.subcategory && params.city) {
        const perPage = 10 //10docs in single page
        // const page = params.page ?? 1 //1st page
        return BusinessModel.find({ "category": params.subcategory, "city": params.city }, {})
    }

    if (params.title_slug) {
        return BusinessModel.findOne({ "title_slug": params.title_slug }, {})
    }

})



