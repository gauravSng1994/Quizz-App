import { JSON_DATA, SELECTED_QUESTION, SELECTED_CATEGORY } from "../constants";
import LocalStorage from "../services/LocalStorage";
import jsonData from '../data/quiz_config_v2_full.json';
import {downloadImage} from "../services/image";

const initialState = {
    selectedCategory : '',
    selectedQuestion : {},
    allQuestions: {
        // categoryId:{
        //     questions:{
        //          qnId:
        //     },
        //     count:0
        // },
    },
};

const initialiseLocalStorage = async () => {

    //     "title": "The Olympics Quiz",
    //     "generic": {
    //     "background": "https://theolympics.b-cdn.net/generic/default_background.png"
    // },

    let sortedCategories = jsonData.categories.sort( (a,b) => a.sequence - b.sequence);
    let categories = {};
    sortedCategories.map( async category => {
        try {
            category.not_chosen_iconBase64 = await downloadImage(category.not_chosen_icon);
            category.chosen_iconBase64 = await downloadImage(category.chosen_icon);
            category.question_answered_iconBase64 = await downloadImage(category.question_answered_icon);
            category.backgroundBase64 = await downloadImage(category.background);
        }catch (e) {
            console.log(e);
        }
        if(!categories[category.id]) categories[category.id] = category;
        const questions = [];
        for(let question of category.questions){
            if(question.type === 'image') {
                try {
                    question.questionImageURLBase64 = await downloadImage(question.questionImageURL);
                }catch (e) {
                    console.log('e',e);
                }
            }
            questions.push(question);
        }
        // "not_chosen_icon": "https://theolympics.b-cdn.net/You%20go%20girl!/icons/catagory_icon_not_chosen_you_go_girl.svg",
        // "chosen_icon": "https://theolympics.b-cdn.net/You%20go%20girl!/icons/catagory_icon_chosen_you_go_girl.svg",
        // "question_answered_icon": "https://theolympics.b-cdn.net/You%20go%20girl!/icons/answerd_question_you_go_girl.svg",
        // "background": "https://theolympics.b-cdn.net/You%20go%20girl!/background/you_go_girl_background.png",
        // questions : [
        //     {
        //         "type": "image",
        //         "question": "What is the sport shown in the picture?",
        //         "questionImageURL": "https://theolympics.b-cdn.net/You%20go%20girl!/questions/13.jpg",
        //     }
        // ]
    },{});
    const genericBackground = await downloadImage(jsonData.generic.background);
    let data = {
        title : jsonData.title,
        generic : jsonData.generic,
        categories : categories,
    }
    data.generic.backgroundBase64 = genericBackground;
    const { allQuestions, selectedQuestion, selectedCategory } = initialState;
    LocalStorage.setItem(SELECTED_QUESTION, LocalStorage.getItem(SELECTED_QUESTION) || selectedQuestion);
    LocalStorage.setItem(SELECTED_CATEGORY, LocalStorage.getItem(SELECTED_CATEGORY) || selectedCategory);
    LocalStorage.setItem(JSON_DATA, LocalStorage.getItem(JSON_DATA) || JSON.stringify(data) || JSON.stringify(allQuestions));
}

initialiseLocalStorage();
