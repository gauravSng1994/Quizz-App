import BottomButton from "../BottomButton/index";
import Header from "../Header/index";
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import {getAllCategories, getAnsweredQuestions, getJsonData} from "../../services/question";
import {BackgroundMusic, SelectSound} from "../../services/audio";
import {IS_MUSIC_OFF, IS_SOUND_OFF, CURRENT_SLIDE_INDEX} from "../../constants";
import LocalStorage from "../../services/LocalStorage";
import {downloadImage} from "../../services/image";

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
            isSoundOn:false,
            isMusicOn:false,
            currentSlideIndex:0,
            data:{},
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

        this.currentSlideIndex = LocalStorage.getItem(CURRENT_SLIDE_INDEX) || 0;
        this.isSoundOn = !LocalStorage.getItem(IS_SOUND_OFF);
        this.isMusicOn = !LocalStorage.getItem(IS_MUSIC_OFF);
        this.data = getJsonData();
        this.sortedCategories = getAllCategories();
        // console.log('Sorted cat',this.sortedCategories);
        this.headerTitle = (this.data||{}).title || "";
        // const selectedCategory = this.currentCategory ? this.sortedCategories.find(cat=> cat.id === this.currentCategory) : this.sortedCategories[0];
        const selectedCategory = this.currentCategory ? this.sortedCategories[this.currentCategory] : this.sortedCategories[Object.keys(this.sortedCategories)[0]];
        this.currentCategory = selectedCategory.id;
        let { title, chosen_icon, questions } = selectedCategory;
        // downloadImage(((data||{}).generic||{}).background || "").then( res => {
        // downloadImage("https://i.picsum.photos/id/1003/1181/1772.jpg?hmac=oN9fHMXiqe9Zq2RM6XT-RVZkojgPnECWwyEF1RvvTZk").then( res => {
        // downloadImage("https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y").then( res => {
        //     console.log('downloaded image',res);
        // });
        // let rhino = localStorage.getItem('rhino');
        // console.log(rhino);
        // this.backgroundImage = rhino || ((this.data||{}).generic||{}).background || "";
        this.backgroundImage = ((this.data||{}).generic||{}).background || "";
        this.categoryName = title;
        this.categoryImage = chosen_icon;
        this.totalQuestionsCount = questions.length;
        this.afterChange(this.currentSlideIndex,true);
        // this.backgroundImage = "https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-3-scaled.jpg";
    },
    methods: {
        async bottomBtnClick(){
            await this.goToQuestionList(this.currentCategory);
        },
        async goToQuestionList(categoryId){
            SelectSound.start();
            await this.$router.push({ name: 'QuestionList', params: { qid:categoryId } });
        },
        completedQuestionsCount(category){
            let answeredQuestions = getAnsweredQuestions(category.id);
            if(answeredQuestions && Array.isArray(answeredQuestions)) return answeredQuestions.length;
            else return 0;
        },
        toggleBackgroundMusic(on){
            if(on) {
                let res = BackgroundMusic.start()
                LocalStorage.setItem(IS_MUSIC_OFF,"");
                if(res) this.isMusicOn = true;
            } else {
                let res = BackgroundMusic.stop();
                LocalStorage.setItem(IS_MUSIC_OFF,"true");
                if(res) this.isMusicOn = false;
            }
        },
        toggleSound(on){
            if(on) {
                LocalStorage.setItem(IS_SOUND_OFF,"");
                this.isSoundOn = true;
            } else {
                LocalStorage.setItem(IS_SOUND_OFF,"true");
                this.isSoundOn = false;
            }
        },
        afterChange(slideInd,disableSound){
            if(!disableSound) SelectSound.start();
            const allCategories = getAllCategories();
            let changedCategory = allCategories[Object.keys(allCategories).find( (key,ind) => Number(ind) === Number(slideInd))];
            this.currentCategory = changedCategory.id;
            LocalStorage.setItem(CURRENT_SLIDE_INDEX, slideInd);
        }
    },
    computed: {

    },
};
