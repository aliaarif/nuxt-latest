// import { log } from "console"

export default defineNuxtRouteMiddleware((to, from) => {

    const { slug, title, pageTitle, setPageTitle, metaContent, setMetaContent, meta, setMeta, pageType, setPageType } = useCommon()


    const city = to.params.city
    const query = to.params.query
    const id = to.params.id




    if (!query.includes('-in-') && !query.includes('-biz-')) {
        pageTitle.value = 'Subcategories'
        metaContent.value = 'Subcategories Meta Contents'
        setPageTitle('Subcategories')
        setPageType('Subcategories')
        $fetch(`/api/getCategoriesMeta?name=${title(query)}`, {
            method: 'get'
        }).then(metaResults => setMeta(metaResults))
    } else if (query.includes('-in-') && !query.includes('-biz-')) {
        pageTitle.value = 'Businesses'
        metaContent.value = 'Businesses Meta Contents'
        setPageTitle('Businesses')
        setPageType('Businesses')
        const data = query.split('-in-')[0]
        $fetch(`/api/getSubcategoriesMeta?name=${title(data)}`, {
            method: 'get'
        }).then(metaResults => setMeta(metaResults))
    } else if (!query.includes('-in-') && query.includes('-biz-')) {
        const data = query.split('-biz-')[0]
        pageTitle.value = 'Business Details'
        metaContent.value = 'Business Details Meta Contents'
        setPageTitle('Business Details')
        setPageType('Business Details')
        // $fetch(`/api/getSubcategoriesMeta?name=${title(data)}`, {
        //     method: 'get'
        // }).then(metaResults => setMeta(metaResults))
    }







})