import BottomButton from "../BottomButton/index";
import data from "../../data/quiz_config_v2_full.json";
import Header from "../Header/index";
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import { getAnsweredQuestions} from "../../services/question";
// import {getAllQuestions} from "../../services/question";
// import GirlImage from '../../assets/downloadedImages/you_go_girl_background.png';
export default {
    name:"Categories",
    components:{
      BottomButton,
      Header,
      VueSlickCarousel
    },
    props: {
    },
    data: function () {
        return {
            headerTitle:"",
            showHeaderBackButton:false,
            backgroundImage:"",
            label: 'Normal Button',
            categoryImage:'',
            categoryName:'',
            // completedQuestionsCount : 0,
            totalQuestionsCount : 0,
            selectedCategoryId:'',
            sortedCategories:'',
            currentCategory: '',
            carouselSettings:{
                "centerMode": true,
                "centerPadding": "80px",
                "focusOnSelect": true,
                "infinite": false,
                "arrows":false,
                "dots":false,
                "slidesToShow": 1,
                "slidesToScroll": 1,
                "ref":"carousel",
                "initialSlide":0,
            }
        };
    },
    mounted(){
        console.log('refs',this.$refs);
        this.sortedCategories = data.categories.sort( (a,b) => a.sequence - b.sequence);
        // console.log('data',this.sortedCategories);
        this.headerTitle = (data||{}).title || "";
        const selectedCategory = this.currentCategory ? this.sortedCategories.find(cat=> cat.id === this.currentCategory) : this.sortedCategories[0];
        this.currentCategory = selectedCategory.id;
        let { background, title, chosen_icon, questions } = selectedCategory;
        this.backgroundImage = background;
        this.categoryName = title;
        this.categoryImage = chosen_icon;
        this.totalQuestionsCount = questions.length;
        // this.backgroundImage = "https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-3-scaled.jpg";
    },
    methods: {
        bottomBtnClick : function (){
            console.log('HELLO!!! Please implement me.');
            this.$router.push({ name: 'QuestionList', params: { qid:this.currentCategory } });
        },
        async goToQuestionList(categoryId){
            console.log('category id',categoryId);
            await this.$router.push({ name: 'QuestionList', params: { qid:categoryId } });
        },
        completedQuestionsCount(category){
            let answeredQuestions = getAnsweredQuestions(category.id);
            if(answeredQuestions && Array.isArray(answeredQuestions)) return answeredQuestions.length;
            else return 0;
        },
        // swipe(dir){
        //     console.log('swipe',dir);
        // },
        afterChange(slideInd){
            const allCategories = this.sortedCategories;
            // let currInd;
            let changedCategory = allCategories.find( (category,ind) => ind === slideInd);
            // console.log('currInd',currInd,allCategories.length-1);
            this.currentCategory = changedCategory.id;
            this.backgroundImage = changedCategory.background;
            // if(dir==='left' && currInd < allCategories.length-1){
            //     console.log('left swipe');
            //     this.currentCategory = allCategories[currInd+1].id;
            // }else if(dir==='right' && currInd>0 ){
            //     this.currentCategory = allCategories[currInd-1].id;
            // }
        }
    },
    computed: {

    },
};
