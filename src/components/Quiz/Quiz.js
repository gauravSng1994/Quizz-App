import BottomButton from "../BottomButton/index";
import data from "../../data/quiz_config_v2_full.json";
import Header from "../Header/index";
import LetterBox from "../LetterBox/index"
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
            showHeaderBackButton:false,
            backgroundImage:"",
            categoryImage:'',
            BottomButtonLabel:"Clear",
            questionTitle : '',
            questionType : '',
            answerType : '',
            answer : '',
            questionImage : '',
            letterBlock:[],
            typedAnswer:{}
        };
    },
    // "id": "you_go_girl",
    //         "sequence": "1",
    //         "title": "You Go Girl!",
    //         "not_chosen_icon": "https://theolympics.b-cdn.net/You%20go%20girl!/icons/catagory_icon_not_chosen_you_go_girl.svg",
    //         "chosen_icon": "https://theolympics.b-cdn.net/You%20go%20girl!/icons/catagory_icon_chosen_you_go_girl.svg",
    //         "question_answered_icon": "https://theolympics.b-cdn.net/You%20go%20girl!/icons/answerd_question_you_go_girl.svg",
    //         "background": "https://theolympics.b-cdn.net/You%20go%20girl!/background/you_go_girl_background.png",
    //         "questions":[
    //     {
    //         "id": "1",
    //         "type": "image",
    //         "question": "What is the name of this sport?",
    //         "questionImageURL": "https://theolympics.b-cdn.net/You%20go%20girl!/questions/1.jpg",
    //         "answerType": "text",
    //         "answer": "rugby"
    //     },
    mounted(){
        console.log('This.router',this.$router);
        const questionId = this.$router.currentRoute.params.qid;
        const quizId = this.$router.currentRoute.params.quizId;
        console.log('QuizId',quizId,typeof quizId);
        this.categoryData = data.categories.find( category => category.id === questionId );
        this.questionData = this.categoryData.questions.find( q => q.id === quizId);
        console.log('categoryData',this.categoryData);
        console.log('questionData',this.questionData);
        let {title,background,questions} = this.categoryData || {};
        this.backgroundImage = background;
        this.headerTitle = title;
        this.totalQuestionsCount = questions.length;

        let {question, type, questionImageURL,answer, answerType} = this.questionData;
        this.questionTitle = question;
        this.questionType = type;
        this.answerType = answerType;
        this.answer = answer;
        this.questionImage = questionImageURL;
        answer = 'My name iss';
        this.letterBlock = answer.split(' ').map( el => el.length);
        this.typedAnswer = this.letterBlock.reduce( (acc,count,index)=>{
            console.log('acc',acc,index);
            acc[index] = [];
            return acc;
        },{});
        console.log('typedAnswer',this.letterBlock, this.typedAnswer);
    },
    methods: {
        typeAnswer(char){
            console.log('Char clicked',char);
        }
    },
    computed: {
        shuffledAnswer(){
            var arr = this.answer.split('');
            var n = arr.length;
            for(var i=0 ; i<n-1 ; ++i) {
                var j = Math.floor(Math.random() * n);

                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }

            let s = arr.join('');                // Convert Array to string
            return s;
        }
    },
};