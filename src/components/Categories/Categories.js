import BottomButton from "../BottomButton/index";
import data from "../../data/quiz_config_v2_full.json";
import Header from "../Header/index";
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import { getAnsweredQuestions} from "../../services/question";
import {BackgroundMusic, SelectSound} from "../../services/audio";
import {IS_MUSIC_OFF,IS_SOUND_OFF,CURRENT_SLIDE_INDEX} from "../../constants";
import LocalStorage from "../../services/LocalStorage";
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
        console.log('csi',LocalStorage.getItem(CURRENT_SLIDE_INDEX))
        this.currentSlideIndex = LocalStorage.getItem(CURRENT_SLIDE_INDEX) || 0;
        this.isSoundOn = !LocalStorage.getItem(IS_SOUND_OFF);
        this.isMusicOn = !LocalStorage.getItem(IS_MUSIC_OFF);
        this.sortedCategories = data.categories.sort( (a,b) => a.sequence - b.sequence);
        // console.log('data',this.sortedCategories);
        this.headerTitle = (data||{}).title || "";
        const selectedCategory = this.currentCategory ? this.sortedCategories.find(cat=> cat.id === this.currentCategory) : this.sortedCategories[0];
        this.currentCategory = selectedCategory.id;
        let { title, chosen_icon, questions } = selectedCategory;
        this.backgroundImage = ((data||{}).generic||{}).background || "";
        this.categoryName = title;
        this.categoryImage = chosen_icon;
        this.totalQuestionsCount = questions.length;
        this.afterChange(this.currentSlideIndex);
        // this.backgroundImage = "https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-3-scaled.jpg";
    },
    methods: {
        async bottomBtnClick(){
            console.log('HELLO!!! Please implement me.');
            await this.goToQuestionList(this.currentCategory);
            // this.$router.push({ name: 'QuestionList', params: { qid:this.currentCategory } });
        },
        async goToQuestionList(categoryId){
            console.log('category id',categoryId);
            SelectSound.start();
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
        afterChange(slideInd){
            const allCategories = this.sortedCategories;
            let changedCategory = allCategories.find( (category,ind) => Number(ind) === Number(slideInd));
            console.log('chCat',slideInd,allCategories,changedCategory);
            this.currentCategory = changedCategory.id;
            LocalStorage.setItem(CURRENT_SLIDE_INDEX, slideInd);
        }
    },
    computed: {

    },
};
