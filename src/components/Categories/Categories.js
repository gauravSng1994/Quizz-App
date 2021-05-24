import BottomButton from "../BottomButton/index";
import data from "../../data/quiz_config_v2_full.json";
import Header from "../Header/index";
// import GirlImage from '../../assets/downloadedImages/you_go_girl_background.png';
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
            totalQuestionsCount : 0,
            selectedCategoryId:''
        };
    },
    mounted(){
        const sortedCategories = data.categories.sort( (a,b) => a.sequence - b.sequence);
        console.log('data',sortedCategories);
        this.headerTitle = (data||{}).title || "";
        const selectedCategory = sortedCategories[0];
        let { background, title, chosen_icon, questions } = selectedCategory;
        this.backgroundImage = background;
        // this.backgroundImage = GirlImage;
        this.categoryName = title;
        this.categoryImage = chosen_icon;
        this.totalQuestionsCount = questions.length;
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
