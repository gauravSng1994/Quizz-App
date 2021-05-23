import BottomButton from "../BottomButton/index";
import data from "../../data/quiz_config_v2_full.json";
import Header from "../Header/index";
import GirlImage from '../../assets/downloadedImages/you_go_girl_background.png';
export default {
    name:"Categories",
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
            label: 'Normal Button',
            categoryImage:'',
            categoryName:'',
            completedQuestionsCount : 0,
            totalQuestionsCount : 0
        };
    },
    mounted(){
        const sortedCategories = data.categories.sort( (a,b) => a.sequence - b.sequence);
        console.log('data',sortedCategories);
        this.headerTitle = (data||{}).title || "";
    //     "id": "the_family",
    //   "sequence": "1",
    //   "title": "The Family",
    //   "not_chosen_icon": "https://thekardashians.b-cdn.net/the_family/icons/catagory_icon_not_chosen_the_family.svg",
    //   "chosen_icon": "https://thekardashians.b-cdn.net/the_family/icons/catagory_icon_chosen_the_family.svg",
    //   "question_answered_icon": "https://thekardashians.b-cdn.net/the_family/icons/answered_question_the_family.svg",
    //   "background": "https://thekardashians.b-cdn.net/the_family/background/the_family_background.png",

        // this.backgroundImage = sortedCategories[0].background;
        this.backgroundImage = GirlImage;
        this.categoryName = sortedCategories[0].title;
        this.categoryImage = sortedCategories[0].chosen_icon;
        this.totalQuestionsCount = sortedCategories[0].questions.length;
        // this.backgroundImage = "https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-3-scaled.jpg";
    },
    methods: {
        bottomBtnClick : function (){
            console.log('HELLO!!! Please implement me.');
        }
    },
    computed: {

    },
};
