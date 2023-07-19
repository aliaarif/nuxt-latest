

export default function useCommon() {

    const city = useState('city', () => 'new-delhi')
    const category = useState('category', () => 'hire-on')

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

    const setCity = (val) => {
        city.value = val
        return;
    }

    const pageTitle = useState('pageTitle', () => '')
    const pageType = useState('pageType', () => '')

    const setPageTitle = (val) => {
        pageTitle.value = val
        return;
    }
    const setPageType = (val) => {
        pageType.value = val
        return;
    }
    // const sCats = useState('sCats', () => {
    //     if (typeof window !== 'undefined') {
    //         return localStorage.sCats
    //     } else {
    //         return {}
    //     }
    // })


    // const businesses = useState('businesses', () => {
    //     if (typeof window !== 'undefined') {
    //         return localStorage.businesses
    //     } else {
    //         return {}
    //     }
    // })

    // const setContents = (uri, city) => {
    //     if (!slug(uri).includes('-in-')) {
    //         $fetch(`/api/query?city=${city}&uri=${title(uri)}`, { method: 'get' }).then((res) => {
    //             sCats.value = res
    //         })
    //         return true
    //     } else {
    //         const data = slug(uri).split('-in-')
    //         $fetch(`/api/query?city=${city}&uri=${title(data[0])}`, { method: 'get' }).then((res) => {
    //             businesses.value = res
    //         })
    //         return true
    //     }
    // }



    return {
        city, setCity, slug, title, pageTitle, setPageTitle, pageType, setPageType
    }
}