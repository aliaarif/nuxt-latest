


export default function useCommon() {

    const city = useState('city', () => 'new-delhi')
    const category = useState('category', () => 'hire-on')

    const pageTitle = useState('pageTitle', () => '')

    const metaContent = useState('metaContent', () => '')

    const meta = useState('meta', () => { })

    const pageType = useState('pageType', () => '')

    const dynamicTitle = useState('dynamicTitle', () => 'Dashboard')

    const fields = useState('fields', () => [])

    const module = useState('module', () => 'dashboard')

    const td = useState('td', () => [])

    const item = useState('item', () => { })

    const action = useState('action', () => 'grid')

    const search = useState('search', () => '')

    const edit = useState('edit', () => false)

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

    const { data: subcategories } = useAsyncData('subcategories',
        () => {
            return $fetch(`/api/subcategories`, {
                method: 'get'
            })
        },
    )

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

    const setModule = (val) => {
        module.value = val

        if (val == 'businesses') {
            td.value = ['id', 'business_name', 'business_category', 'business_city', 'created_by', 'status', 'action']
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

        if (val == 'categories') {
            td.value = ['name', 'status', 'action']
            fields.value = [
                {
                    label: 'Category Name',
                    type: 'text',
                    value: '',
                    default: ''
                }

            ]
        }

        if (val == 'subcategories') {
            td.value = ['name', 'category', 'status', 'action']
        }

        if (val == 'users') {
            td.value = ['name', 'email', 'role', 'city', 'status', 'action']
        }

        if (val == 'cities') {
            td.value = ['name', 'state', 'status', 'action']
        }

        if (val == 'states') {
            td.value = ['name', 'status', 'action']
        }


        $fetch(`/api/modules?name=${module.value}`, {
            method: 'get'
        }).then((res) => {
            rows.value = res
        })

        return;
    }



    const setAction = (val) => {
        // alert(module.value)
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



    const setSearch = (val) => {
        search.value = val
        return;
    }

    const rows = useState('rows', () => {
        return {}
    })



    return {
        city, setCity, slug, title, pageTitle, setPageTitle, metaContent, setMetaContent, meta, setMeta, pageType, setPageType, module, action, edit, setModule, setAction, setEdit, td, setTd, rows, search, setSearch, dynamicTitle, setDynamicTitle, fields, item, setItem
    }
}