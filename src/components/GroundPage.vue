<template>
  <div>
    <h1> {{ title }} </h1>
    <word-Input-Form v-if="getWordsLoaded"/>
    <LoadingPage v-else/>
  </div>
</template>

<script>
import wordInput from '../components/WordInputForm.vue'
import LoadingPage from '../components/LoadingPage.vue'
import useWordData from '../hooks/wordData.js'

export default {
  name: 'ground-page',
  components: {
    "word-Input-Form" : wordInput,
    "LoadingPage" : LoadingPage,
  },
  data(){
    return {
      title : "WORDLE"
    }
  },
  async created() {
      await this.$store.dispatch("initailzeWord",0);
  },
  setup () {
    const {
        getWordsLoaded, 
    } = useWordData()
    return {
        getWordsLoaded,
        }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>