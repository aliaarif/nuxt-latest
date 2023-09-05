export default defineNuxtRouteMiddleware(async (to, from) => {
    const { title, setMeta, setPageType } = useCommon()
    const query = to.params.query

    if (!query.includes('-in-') && !query.includes('-biz-')) {
        setPageType('Subcategories')
        const { data: metaResults } = await useAsyncData('metaResults',
            () => {
                return $fetch(`/api/getCategoriesMeta?name=${title(query)}`, {
                    method: 'get'
                })
            })
        setMeta(metaResults)

    } else if (query.includes('-in-') && !query.includes('-biz-')) {
        setPageType('Businesses')
        const data = query.split('-in-')[0]
        const { data: metaResults } = await useAsyncData('metaResults1',
            () => {
                return $fetch(`/api/getSubcategoriesMeta?name=${title(data)}`, {
                    method: 'get'
                })
            })
        setMeta(metaResults)
    } else if (!query.includes('-in-') && query.includes('-biz-')) {
        const data = query.split('-biz-')[0]
        setPageType('Business Details')
        const { data: metaResults } = await useAsyncData('metaResults',
            () => {
                return $fetch(`/api/getBusinessesMeta?slug=${data}`, {
                    method: 'get'
                })
            })
        setMeta(metaResults)
    } 
})