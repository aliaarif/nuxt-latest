export default defineNuxtRouteMiddleware((to, from) => {

    // alert(from.params.category)
    // typeof window !== 'undefined' ? from.params.category : '111'
    // import { commonStore } from "../store/common"
    // const  store } = commonStore()
    // sessionStorage.categoty = from.params.categoty
    // console.log(from.params.categoty)
    // const runtimeConfig = useRuntimeConfig()

    // const {
    //     data: me,
    //     error,
    //     refresh,
    //     pending
    // } = useAsyncData('me',
    //     async () => {
    //         //  Si=ome  code before API call
    //         return await $fetch('http://dev.apna-slide-backend/api/me', {
    //             header: {
    //                 Authorization: `Bearer ${runtimeConfig.public.token}`
    //             },
    //             method: "get",
    //         }
    //         )
    //     }
    // )
    // console.log(me);
    // if (me) {
    //     return true
    // } else {
    //     return false
    // }


    // return navigateTo('/auth/login')

})