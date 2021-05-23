import BottomButton from "../BottomButton/index";
import data from "../../data/quiz_config_v2_full.json";
import Header from "../Header/index";
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
            showHeaderBackButton:false,
            backgroundImage:"",
            categoryImage:'',
            completedQuestionsCount : 0,
            totalQuestionsCount : 0,
            questionAnsweredIcon:'',
            choosenIcon:'',
            notChoosenIcon:'',
            questionData:{},
            BottomButtonLabel:"Play",
            questionId:'',
        };
    },
    mounted(){
        console.log('This.router',this.$router);
        this.questionId = this.$router.currentRoute.params.qid;
        if(!this.questionId) alert('No question id found'); // todo handle it properly with modal alert
        this.questionData = data.categories.find( category => category.id === this.questionId );
        console.log('questionData',this.questionData);
        let {chosen_icon, title, not_chosen_icon, question_answered_icon, questions, background} = this.questionData || {};
        this.backgroundImage = background;
        this.headerTitle = title;
        this.choosenIcon = chosen_icon;
        this.notChoosenIcon = not_chosen_icon;
        this.questionAnsweredIcon = question_answered_icon;
        this.totalQuestionsCount = questions.length;
    },
    methods: {
        goToQuiz:async function(quizId){
            await this.$router.push({ name: 'Quiz', params: { qId:this.questionId, quizId:Number(quizId) } });
            // this.$router.push('/quiz')
        }
    },
    computed: {

    },
};
