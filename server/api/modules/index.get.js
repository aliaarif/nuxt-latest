import SubcategoryModel from "~~/server/models/Subcategory";
import BusinessModel from "~~/server/models/Business";
import CategoryModel from "~~/server/models/Category";
import CityModel from "~~/server/models/City";
import StateModel from "~~/server/models/State";
import UserModel from "~~/server/models/User";
import LeadModel from "~~/server/models/Lead";
import ContactModel from "~~/server/models/Contact";
import ScriptModel from "~~/server/models/Script";


export default defineEventHandler(async (event) => {

    const params = getQuery(event)

    if (params.name == 'categories') {
        return CategoryModel.find({}, {}).limit(params.pageLimit)
    }

    if (params.name == 'subcategories') {
        return SubcategoryModel.find({ }, {}).limit(params.pageLimit)
        // if (params.searchTerms) {
        //     // '/' + params.searchTerms + '^/'
        //     return SubcategoryModel.find({ }, {}).limit(params.pageLimit)
        // } else if (params.searchTerms == '')  {
        //     return SubcategoryModel.find({ }, {}).limit(params.pageLimit)
        // }
    }

    if (params.name == 'businesses') {
        return BusinessModel.find({}, {}).limit(params.pageLimit)
    }

    if (params.name == 'cities') {
        return CityModel.find({}, {}).limit(params.pageLimit)
    }

    if (params.name == 'states') {
        return StateModel.find({}, {}).limit(params.pageLimit)
    }

    if (params.name == 'users') {
        return UserModel.find({}, {}).limit(params.pageLimit)
    }

    if (params.name == 'leads') {
        return LeadModel.find({}, {}).limit(params.pageLimit)
    }

    if (params.name == 'contacts') {
        return ContactModel.find({}, {}).limit(params.pageLimit)
    }

    if (params.name == 'scripts') {
        return ScriptModel.find({}, {}).limit(params.pageLimit)
    }

    if (params.name == 'profile') {
        return
    }
})



