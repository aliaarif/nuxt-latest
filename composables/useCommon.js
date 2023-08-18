


export default function useCommon() {

    const city = useState('city', () => 'new-delhi')
    const category = useState('category', () => 'hire-on')
    const pageTitle = useState('pageTitle', () => '')
    const metaContent = useState('metaContent', () => '')
    const meta = useState('meta', () => { })
    const customMeta = useState('customMeta', () => { })
    const pageType = useState('pageType', () => '')
    const dynamicTitle = useState('dynamicTitle', () => 'Dashboard')
    const fields = useState('fields', () => [])
    const module = useState('module', () => 'dashboard')
    const td = useState('td', () => [])
    const scats = useState('scats', () => [])
    const sCat = useState('sCat', () => '')
    const item = useState('item', () => { })
    const action = useState('action', () => 'grid')
    const edit = useState('edit', () => false)
    const pageNo = useState('pageNo', () => 1)
    const pageLimit = useState('pageLimit', () => 50)

    const auth = useState('auth', () => { })

    const pageSlug = useState('pageSlug', () => '')

    const searchTerms = useState('searchTerms', () => '')


    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const day = useState('day', () => {
        const currentDate = new Date();
        const currentDayIndex = currentDate.getDay();

        const currentDayName = daysOfWeek[currentDayIndex];

        return currentDayName

    })

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


    const { data: pages } = useAsyncData('pages',
        () => {
            return $fetch(`/api/pages`, {
                method: 'get'
            })
        },
    )

    const { data: page } = useAsyncData('page',
        () => {
            return $fetch(`/api/pages?slug=${pageSlug.value}`, {
                method: 'get'
            })
        },
    )



    const { data: subcategories } = useAsyncData('subcategories',
        () => {
            return $fetch(`/api/subcategories`, {
                method: 'get'
            })
        }
    )

    const { data: categories } = useAsyncData('categories',
        () => {
            return $fetch(`/api/categories`, {
                method: 'get'
            })
        },
    )



    const setAuth = (val) => {
        auth.value = val
        return;
    }

    const setPage = (val) => {
        pageSlug.value = val
        useFetch(`/api/pages?slug=${val}`, {
            method: 'get'
        }).then((res) => {
            page.value = res
        })
        return;
    }

    const setItem = (val) => {
        item.value = val
        return;
    }

    const setCity = (val) => {
        city.value = val
        return;
    }

    const setPageTitle = (val) => {
        pageTitle.value = val
        return;
    }

    const setMetaContent = (val) => {
        metaContent.value = val
        return;
    }

    const setPageType = (val) => {
        pageType.value = val
        return;
    }

    const setDynamicTitle = (val) => {
        dynamicTitle.value = val
        return;
    }

    const setMeta = (val) => {
        meta.value = val
        return;
    }

    const setCustomMeta = (val) => {
        customMeta.value = val
        return;
    }

    const setModule = (val) => {
        module.value = val

        if (val == 'businesses') {
            if (auth.value.role === 'Admin') {
                td.value = ['id', 'business_name', 'business_category', 'business_city', 'content_by', 'approved_by', 'status', 'created_at', 'action']
            }
            if (auth.value.role === 'QC') {
                td.value = ['id', 'business_name', 'business_category', 'business_city', 'created_by', 'content_by', 'status', 'created_at', 'action']
            }
            if (auth.value.role === 'Staff') {
                td.value = ['id', 'business_name', 'business_category', 'business_city', 'created_by', 'status', 'created_at', 'action']
            }

            fields.value = [
                {
                    label: 'Business Name',
                    type: 'text',
                    name: 'business_name',
                    value: '',
                    default: item.value
                },
                {
                    label: 'Business Slug',
                    type: 'text',
                    name: 'business_name',
                    value: '',
                    default: ''
                },
                {
                    label: 'Business Ownership',
                    type: 'dropdown',
                    name: 'business_ownership',
                    value: '',
                    default: 'Unclaimed'
                },
                {
                    label: 'Business Category',
                    type: 'dropdown',
                    name: 'business_category',
                    value: subcategories,
                    default: ''
                },

            ]
        }

        if (val == 'subcategories') {
            td.value = ['category', 'subcategory', 'total_business', 'status', 'action']
            fields.value = [
                {
                    label: 'Category Name',
                    type: 'dropdown',
                    name: 'category',
                    value: categories,
                    default: '---Select---'
                },

                {
                    label: 'Sub Category Name',
                    type: 'text',
                    name: 'subcategory',
                    value: '',
                    default: ''
                },

                {
                    label: 'Sub Category 111 ',
                    type: 'text',
                    name: 'subcategory',
                    value: '',
                    default: ''
                },


                {
                    label: 'Page Title',
                    type: 'text',
                    value: '',
                    default: ''
                },
                {
                    label: 'Page Content',
                    type: 'text',
                    value: '',
                    default: ''
                }


            ]
        }

        if (val == 'users') {
            td.value = ['name', 'email', 'role', 'assigned_city', 'posted', 'approved', 'rejected', 'status', 'action']
        }

        if (val == 'leads') {
            td.value = ['city', 'category', 'query', 'name', 'email', 'phone', 'date', 'action']
        }

        if (val == 'contacts') {
            td.value = ['name', 'email', 'phone', 'subject', 'message', 'date', 'status', 'action']
        }

        if (val == 'cities') {
            td.value = ['name', 'state', 'status', 'action']
        }

        if (val == 'states') {
            td.value = ['name', 'total_cities', 'status', 'action']
        }


        // if (searchTerms.value) {
        //     $fetch(`/api/modules?name=${module.value}&pageLimit=${pageLimit.value}&searchTerms=${searchTerms.value}`, {
        //         method: 'get'
        //     }).then((res) => {
        //         rows.value = res
        //     }) 
        // } else {
            $fetch(`/api/modules?name=${module.value}&pageLimit=${pageLimit.value}`, {
                method: 'get'
            }).then((res) => {
                rows.value = res
            }) 
        // }
       

        return;
    }



    const setPageNo = (val) => {
        pageNo.value = val
        return;
    }

    const setPageLimit = (val) => {
        pageLimit.value = val
        return;
    }

    const setAction = (val) => {
        action.value = val
        return;
    }

    const setTd = (val) => {
        td.value = val
        return;
    }

    const setEdit = (val) => {
        edit.value = val
        return;
    }

    // const setSearch = (val) => {
    //     search.value = val
    //     return;
    // }

    const rows = useState('rows', () => {
        return {}
    })

    const setSCat = (val) => {
        sCat.value = val
        return;
    }

    return {
        searchTerms, pages, page, setPage, pageNo, setPageNo, pageLimit, setPageLimit, title, auth, setAuth, city, setCity, slug, title, setSCat, day, pageTitle, setPageTitle, metaContent, setMetaContent, meta, setMeta, customMeta, setCustomMeta, pageType, setPageType, module, action, edit, setModule, setAction, setEdit, td, setTd, rows, dynamicTitle, setDynamicTitle, fields, item, setItem, categories, subcategories
    }
}