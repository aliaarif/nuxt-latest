import SubcategoryModel from "~~/server/models/Subcategory";
import BusinessModel from "~~/server/models/Business";
import CategoryModel from "~~/server/models/Category";
import CityModel from "~~/server/models/City";
import StateModel from "~~/server/models/State";
import UserModel from "~~/server/models/User";

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



    if (params.name == 'categories') {
        return CategoryModel.find({}, {})
    }

    if (params.name == 'subcategories') {
        return SubcategoryModel.find({}, {})
    }

    if (params.name == 'businesses') {
        return BusinessModel.find({}, {})
    }

    if (params.name == 'cities') {
        return CityModel.find({}, {})
    }

    if (params.name == 'states') {
        return StateModel.find({}, {})
    }

    if (params.name == 'users') {
        return UserModel.find({}, {})
    }



})



