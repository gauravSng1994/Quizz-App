import BottomButton from "../BottomButton/index";
// import data from "../../data/quiz_config_v2_full.json";

import Header from "../Header/index";
import LetterBox from "../LetterBox/index"
import {getJsonData, getQuestion, markChosen, updateAnswer} from '../../services/question';
import {ClearSound, CorrectSound, LetterSelectSound, ProceedSelectSound, WrongSound} from "../../services/audio";
const data = getJsonData();
export default {
    name:"Quiz",
    components:{
      BottomButton,
      Header,
      LetterBox
    },
    props: {
    },
    data: function () {
        return {
            headerTitle:"",
            showHeaderBackButton:true,
            backgroundImage:"",
            // categoryImage:'',
            // BottomButtonLabel:"Clear",
            questionTitle : '',
            questionType : '',
            answerType : '',
            answer : '',
            questionImage : '',
            letterBlock:[],
            currentLetterBlock:0,
            typedAnswer:{},
            quizOver:false,
            isAnswerCorrect:false,
            quizId:'',
            categoryId:'',
            letterBoxBorderType:'neutral',
        };
    },
    mounted(){
        console.log('mounting');
        this.init();
    },
    methods: {
        init(isWatch){
            this.currentLetterBlock = 0;
            this.categoryId = this.$router.currentRoute.params.qid;
            this.quizId = this.$router.currentRoute.params.quizId;
            console.log('initialising',this.quizId);
            markChosen(this.quizId,this.categoryId);
            console.log('OHHH great!!!!!1111')
            this.quizOver=false;
            this.isAnswerCorrect=false;
            this.categoryData =  data.categories[this.categoryId];//.find( category => category.id === this.categoryId );
            // this.questionData = this.categoryData.questions.find( q => Number(q.id) === Number(this.quizId) );
            console.log('categoryData',this.categoryData);
            // console.log('questionData',this.questionData);
            let {title,background,questions} = this.categoryData || {};
            this.backgroundImage = background;
            this.headerTitle = `${title} #${this.quizId}`;
            this.totalQuestionsCount = questions.length;
            this.questionData = getQuestion(this.categoryId,this.quizId);
            console.log('this.qData',this.questionData);
            let {question, type, questionImageURL,answer, answerType, userAnswer } = this.questionData||{};
            this.questionTitle = question;
            this.questionType = type;
            this.answerType = answerType;
            this.answer = answer;
            this.questionImage = questionImageURL;
            this.letterBlock = answer.split(' ').map( el => el.length);
            this.typedAnswer = this.letterBlock.reduce( (acc,count,index)=>{
                acc[index] = [];
                return acc;
            },{});
            if( userAnswer){
                for(let i = 0; i < userAnswer.length; ++i ) this.typeAnswer(userAnswer[i],isWatch,true);
            }
        },
        typeAnswer(char,isWatch,autoFill){
            if(!(isWatch || autoFill)) LetterSelectSound.start();
            console.log('this.currentLetterBlock',this.currentLetterBlock);
            console.log('this.letterBlock',this.letterBlock);
            if(this.currentLetterBlock >= this.letterBlock.length) {
                return console.log('No more entries allowed',this.typedAnswer);
            }
            let newArr = [...this.typedAnswer[this.currentLetterBlock],char]
            this.typedAnswer = {
                ...this.typedAnswer,
                [this.currentLetterBlock] : newArr
            }
            if(this.currentLetterBlock < this.letterBlock.length-1
                && this.typedAnswer[this.currentLetterBlock].length >= this.letterBlock[this.currentLetterBlock]) this.currentLetterBlock +=1;
            if(this.currentLetterBlock >= this.letterBlock.length-1){
                let givenAnswer = Object.values(this.typedAnswer).map( el => el.join('')).join(' ');
                if(givenAnswer.length === this.answer.length){
                    this.quizOver = true;
                    this.isAnswerCorrect = this.answer.toLowerCase() === givenAnswer.toLowerCase();
                    this.currentLetterBlock +=1;
                    if(!(isWatch || autoFill)) this.isAnswerCorrect ? CorrectSound.start() : WrongSound.start();
                    this.letterBoxBorderType = this.isAnswerCorrect ? 'correct' : 'wrong';
                    updateAnswer(this.quizId,this.categoryId,givenAnswer.toLowerCase());
                    // return console.log('No more entries allowed',this.answer, givenAnswer,this.isAnswerCorrect);
                }
            }
        },
        clearAnswer: async function (){
            if(this.quizOver){
                // todo move to next quiz
                ProceedSelectSound.start();
                await this.$router.push({ name: 'Quiz', params: { qId:this.categoryId, quizId:Number(this.quizId)+1 } });
                //since we push the same page again, vue ignores it, this.$router.go() reloads the page and 0 means to go back 0 pages
                // this.$router.go(0)

                console.log('quiz over');
            }else {
                ClearSound.start()
                this.typedAnswer = this.letterBlock.reduce( (acc,count,index)=>{
                    acc[index] = [];
                    return acc;
                },{});
                this.currentLetterBlock = 0;
            }
        }
    },
    computed: {
        shuffledAnswer(){
            let arr = this.answer.split('').filter( _ =>_.trim() );
            let alphabets = new Set(arr);
            let chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
            for(let char of chars){
                if(alphabets.size >= 18) break;
                if(alphabets.has(char)) continue;
                alphabets.add(char);
            }
            arr = Array.from(alphabets);
            let n = arr.length;
            for(let i=0 ; i<n-1 ; ++i) {
                let j = Math.floor(Math.random() * n);
                let temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
            }
            return arr.join('');
        },
        BottomButtonLabel(){
            return this.quizOver ? "Next" : "Clear";
        },
        gameOverText(){
          return `Your guess is ${this.isAnswerCorrect ? "correct" : "wrong"}!`
        }
    },
    watch: {
        '$route.params.quizId': {
            handler: function(prev,next) {
                console.log('watching',prev,next);
                if(prev && next && prev!==next) this.init(true);
            },
            deep: true,
            immediate: true
        }
    }
};
