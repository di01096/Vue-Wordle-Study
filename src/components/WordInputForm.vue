<template>
    <li v-for="count in words.AnswerWordCount" :key="count">
        <input class="wordInput" type="text" v-for=" (w, index) in AnswerWord.split('')"
        :key="'wordInput_'+count+'_'+index" readonly
        :value="(words.AnswerWordIndex + 1) == count ? words.NewWord[index] : 
                (words.AnswerWordIndex + 1) > count ? words.NewWords[count - 1][index] : ''"
        :class="CheckAnswerWordLetter(count - 1,index)">
    </li>
    <div class="hint"> </div>
    <li v-for="(keyBoardFloorLetters ,boardIndex) in keyBoard.keyBoardLetters" :key="boardIndex">
        <input class="keyBoard-Letter" type="text" v-for=" (letter, letterIndex) in keyBoardFloorLetters" :key="letterIndex" readonly :value="letter"
        :class="CheckKeyboardLetter(letter)" @click="ClickKeyBorad(letter)">
    </li>
</template>

<script>
import {ConvertInputData} from '../util/wordsUtil'
import useWordData from '../hooks/wordData.js'
import {RandomNumber} from '../util/mathUtil'

export default {
    name:"word-Input-Form",
    data() {
        return {
            words : {
                AnswerWordCount : 6,
                AnswerWordIndex : 0,
                NewWord : "",
                NewWords : [],
                wordArray : this.getWords,
                wordIndex : RandomNumber(0, this.getWords.length - 1),
                wordLoaded : this.getWordsLoaded ,
            },
            keyBoard : {
                AnswerKeyBoardLetters : {"green":[],"yellow":[],"gray":[]},
                keyBoardLetters : [["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Enter","Z","X","C","V","B","N","M","<"]],
            },
            game : {
                bNewStart : false,
            }
        }
    },
    computed : {
        AnswerWord () {
            return this.words.wordArray[this.words.wordIndex]
        }
    },
    methods: {
        WordKeyUpEvnet(event) {
            const key = ConvertInputData(event)
            if(key == "Backspace" || key =="<"){
                this.words.NewWord = this.words.NewWord.slice(0,-1)
            }
            else if(key == "Enter")
            {
                this.AfterEnter()
            }
            else if(this.words.NewWord.length < 5 && key.length == 1){
                this.words.NewWord += key.toUpperCase()
            }
        },
        AfterEnter() {
            if(this.words.NewWord.length < 5)
            {
                alert("This is not 5 letter.")
            }
            else if(this.words.NewWord == this.AnswerWord) {
                this.words.NewWords.push(this.words.NewWord)
                this.words.AnswerWordIndex += 1
                this.words.NewWord =""
                this.game.bNewStart = true
                alert("This is answer.")
            } 
            else if(this.words.wordArray.includes(this.words.NewWord)) {
                if(this.words.AnswerWordCount - 1 == this.words.AnswerWordIndex) {
                    this.SetNewGame()
                    alert("Start new game")
                }
                else{
                    this.words.NewWords.push(this.words.NewWord)
                    this.words.AnswerWordIndex += 1
                    this.words.NewWord =""
                    alert("This is now answer.")
                }
            }
            else {
                alert("This is not word")
                this.words.NewWord =""
            }
        },
        SetNewGame() {
            this.game.bNewStart = false
            this.words.NewWord = ""
            this.words.AnswerWordIndex = 0
            this.words.NewWords = []
            this.keyBoard.AnswerKeyBoardLetters = {"green":[],"yellow":[],"gray":[]}
        },
        CheckAnswerWordLetter(count,index) {
            if(this.words.AnswerWordIndex <= count) {
                return "blank"
            }
            const NewWordLetter = this.words.NewWords[count][index]
            let AnswerWordCopy = this.AnswerWord.split("")
            this.words.NewWords[count].split("").forEach( function(element,index) {
                if (AnswerWordCopy[index] == element){
                    AnswerWordCopy[index] = ""
                }
            })
            AnswerWordCopy = AnswerWordCopy.join("")
            if( NewWordLetter === this.AnswerWord[index] ){
                if(!this.keyBoard.AnswerKeyBoardLetters.green.includes(NewWordLetter)) {
                    this.keyBoard.AnswerKeyBoardLetters.green.push(NewWordLetter)
                }
                return "green"
            }
            else if( NewWordLetter !== this.AnswerWord[index] ){
                const AnswerWordLetterCount = AnswerWordCopy.split(NewWordLetter).length - 1
                const NewWordLetterCount = this.words.NewWords[count].substring(0,index + 1).split(NewWordLetter).length - 1
                if(AnswerWordLetterCount >= NewWordLetterCount) {
                    if(!this.keyBoard.AnswerKeyBoardLetters.yellow.includes(NewWordLetter)) {
                        this.keyBoard.AnswerKeyBoardLetters.yellow.push(NewWordLetter)
                    }
                    return "yellow"
                } else {
                    if(!this.keyBoard.AnswerKeyBoardLetters.gray.includes(NewWordLetter)) {
                        this.keyBoard.AnswerKeyBoardLetters.gray.push(NewWordLetter)
                    }
                    return "gray"
                }
            }
        },
        CheckKeyboardLetter(letter){
            if(this.keyBoard.AnswerKeyBoardLetters.green.includes(letter)){
                return "green"
            }
            else if(this.keyBoard.AnswerKeyBoardLetters.yellow.includes(letter)){
                return "yellow"
            }
            else if(this.keyBoard.AnswerKeyBoardLetters.gray.includes(letter)){
                return "gray"
            }
            return "blank"
        },
        ClickKeyBorad(letter) {
            const e = {"key": letter}
            this.WordKeyUpEvnet(e)
        }
    },
    mounted() {
        window.addEventListener('keyup', this.WordKeyUpEvnet) // enter 클릭시 alert 창 닫기
    },
    beforeUnmount() {
        window.removeEventListener('keyup', this.WordKeyUpEvnet) // enter 클릭시 alert 창 닫기
    },
    setup() {
        const { 
            getWords,
            getWordsLoaded,
         } = useWordData()
        return { 
            getWords,
            getWordsLoaded,
         }
    }
}
</script>

<style scoped>
    .wordInput {
        width: 40px;
        height: 45px;
        font-size: 35px;
        text-align: center;
        padding-top: 5px;
        margin: 5px;
    }
    li{
        list-style:none;
        padding-left:0px;
    }
    .keyBoard-Letter {
        width: 20px;
        height: 30px;
        font-size: 20px;
        text-align: center;
        margin: 8px;
    }
    .hint {
        height: 50px;
    }
    .gray {
        color : black;
        background-color: gray;
    }
    .yellow {
        color : blue;
        background-color: yellow;
    }
    .green {
        color: violet;
        background-color: green;
    }
</style>