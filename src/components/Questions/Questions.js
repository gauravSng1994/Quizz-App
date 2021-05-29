import BottomButton from "../BottomButton/index";
// import data from "../../data/quiz_config_v2_full.json";
import Header from "../Header/index";
import {getAllCategories, getAnsweredQuestions} from "../../services/question";
import {SelectSound} from "../../services/audio";
import unansweredQuestionIcon from "../../assets/variant/olympics/question_icon_questionmark.svg"
export default {
    name:"Questions",
    components:{
      BottomButton,
      Header
    },
    props: {
    },
    data: function () {
        return {
            headerTitle:"",
            showHeaderBackButton:true,
            backgroundImage:"",
            categoryImage:'',
            completedQuestionsCount : 0,
            totalQuestionsCount : 0,
            questionAnsweredIcon:'',
            chosenIcon:'',
            notChosenIcon:'',
            questionData:{},
            BottomButtonLabel:"Play",
            categoryId:'',
            questions:[]
        };
    },
    mounted(){
        console.log('this',this.$router.currentRoute.params);
        this.categoryId = this.$router.currentRoute.params.qid;
        if(!this.categoryId) alert('No question id found'); // todo handle it properly with modal alert
        const allQuestions = getAllCategories();
        let answeredQuestions = getAnsweredQuestions(this.categoryId);
        this.questionData = allQuestions[this.categoryId]//.categories.find( category => category.id === this.categoryId );
        console.log('questionData',this.questionData);
        let {chosen_icon, title, not_chosen_icon, question_answered_icon, questions, background} = this.questionData || {};
        this.backgroundImage = background;
        this.headerTitle = title;
        this.chosenIcon = chosen_icon;
        this.notChosenIcon = not_chosen_icon;
        this.questionAnsweredIcon = question_answered_icon;
        this.totalQuestionsCount = questions.length;
        this.questions = questions;
        this.completedQuestionsCount = (answeredQuestions||[]).length;
    },
    methods: {
        goToQuiz:async function(quizId){
            SelectSound.start();
            await this.$router.push({ name: 'Quiz', params: { qId:this.categoryId, quizId:Number(quizId) } });
        },
        questionListIcon(question){
            if( (question||{}).isAnswered ) return this.questionAnsweredIcon;
            else return unansweredQuestionIcon;
            // if( (question||{}).isChosen ) return this.chosenIcon;
            // else return this.notChosenIcon;
        }
    },
    computed: {
    },
};
