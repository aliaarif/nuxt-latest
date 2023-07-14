

export default function useCommon() {
    const city = useState('city', () => 'new-delhi')

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

    const setCity = (city) => {

        if (typeof window !== 'undefined') {
            localStorage.city = city
            city.value = localStorage.city ?? slug(city)
        }
        return true


    }

    return {
        city, slug, title, setCity
    }
}