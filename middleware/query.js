// import { log } from "console"

export default defineNuxtRouteMiddleware((to, from) => {

    const { slug, title, pageTitle, setPageTitle, pageType, setPageType } = useCommon()


    const city = to.params.city
    const query = to.params.query
    const id = to.params.id


    const metaContent = ref('')

    if (!query.includes('-in-') && !query.includes('-biz-')) {
        pageTitle.value = 'Subcategories'
        metaContent.value = 'Subcategories Meta Contents'
        setPageTitle('Subcategories')
        setPageType('Subcategories')
        console.log(pageType.value)
    } else if (query.includes('-in-') && !query.includes('-biz-')) {
        pageTitle.value = 'Businesses'
        metaContent.value = 'Businesses Meta Contents'
        setPageTitle('Businesses')
        setPageType('Businesses')
        console.log(pageType.value)
    } else if (!query.includes('-in-') && query.includes('-biz-')) {
        pageTitle.value = 'Business Details'
        metaContent.value = 'Business Details Meta Contents'
        setPageTitle('Business Details')
        setPageType('Business Details')
        console.log(pageType.value)
    }

})