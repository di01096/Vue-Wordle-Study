import store from '../store' 
import {  computed } from 'vue'
export default function useWordData() {  
    const getWords = computed(() => store.getters['getWords']) 
    const getWordsLoaded = computed(() => store.getters['getWordsLoaded'])
    return {
        getWords,
        getWordsLoaded,
    }
}