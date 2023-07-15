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

    if (params.query1) {
        return SubcategoryModel.find({ "category": title(params.query1) }, {})
    } else if (params.query2 && params.query3) {
        return BusinessModel.find({
            "category": title(params.query2), "city": title(params.query3)
        }, {})
    } else {
        return BusinessModel.find({ "title_slug": params.query1 }, {})
    }

})



