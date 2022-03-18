import axios from 'axios'

async function initailzeWord (count) {
    if(count > 4){
        return []
    }
    const ret = await axios.get('https://raw.githubusercontent.com/amirrajan/word-finder/master/lib/dictionary.json').then(res => {
        const fiveWordsArray = []
        res.data.dictionary.forEach(element => {
            if (element.length == 5) {
                fiveWordsArray.push(element)
            }
        });
        return fiveWordsArray
    }).catch(err => {
        console.log(err)
        initailzeWord (count + 1);
    })
    return ret
}

export {initailzeWord}

