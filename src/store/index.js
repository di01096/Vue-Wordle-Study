import {createStore} from 'vuex'
import {initailzeWord} from '../telematics/wordData.js'

export default createStore({
    state : {
        words : [],
        wordsloaded : false,
    },
    mutations : {
        SET_WORDS(state, words) {
            if(!(state.words===[]))
            {
                state.wordsloaded = true
            }
            state.words = words
        },
    },
    actions : {
         async initailzeWord({commit}, count) {
            const ret = await initailzeWord(count)
            commit("SET_WORDS",ret);
        }
    },
    getters : {
        getWords : (state) => { 
            return state.words
        },
        getWordsLoaded : (state) => {
            return state.wordsloaded
        },
    }
})