import BottomButton from "../BottomButton/index";
import data from "../../data/quiz_config_v2_full.json";
import Header from "../Header/index";
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
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
            completedQuestionsCount : 0,
            totalQuestionsCount : 0,
            selectedCategoryId:'',
            sortedCategories:'',
            carouselSettings:{
                "centerMode": true,
                "centerPadding": "20px",
                "focusOnSelect": true,
                "infinite": false,
                "arrows":false,
                "dots":false,
                // "slidesToShow": 3,
                // "speed": 500,
                "slidesToShow": 1,
                "slidesToScroll": 1,
                // "variableWidth": true
            }

        };
    },
    mounted(){
        this.sortedCategories = data.categories.sort( (a,b) => a.sequence - b.sequence);
        console.log('data',this.sortedCategories);
        this.headerTitle = (data||{}).title || "";

        const selectedCategory = this.sortedCategories[0];
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
        },
        async goToQuestionList(categoryId){
            console.log('category id',categoryId);
            await this.$router.push({ name: 'QuestionList', params: { qid:categoryId } });
        }
    },
    computed: {

    },
};
