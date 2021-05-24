import { ALL_QUESTIONS, ANSWERED_QUESTIONS, CHOSEN_QUESTIONS, SELECTED_QUESTION, SELECTED_CATEGORY} from "../constants";
import LocalStorage from "../services/LocalStorage";

import jsonData from '../data/quiz_config_v2_full.json';

const initialState = {
    selectedCategory : '',
    selectedQuestion : {},
    allQuestions: {},
    answeredQuestions : {
        // categoryId:{
        //     questions:{
        //          qnId:
        //     },
        //     count:0
        // },
        count:0
    },
    chosenQuestions : {
        // categoryId:{
        //     questions:{
        //          qnId:
        //     },
        //     count:0
        // },
        count:0
    }
};

const initialiseLocalStorage = () => {
    console.log('Initialising localStorage');
    let questions = jsonData.categories.reduce( (acc, category) => {
        console.log(acc,category,category.id);
        if(!acc[category.id]) acc[category.id] = category;
        // acc[category.id].questions = category.questions;
        return acc;
    },{});
    const {allQuestions, selectedQuestion, selectedCategory, answeredQuestions, chosenQuestions} = initialState;
    LocalStorage.setItem(SELECTED_QUESTION, LocalStorage.getItem(SELECTED_QUESTION) || selectedQuestion);
    LocalStorage.setItem(SELECTED_CATEGORY, LocalStorage.getItem(SELECTED_CATEGORY) || selectedCategory);
    LocalStorage.setItem(ALL_QUESTIONS, LocalStorage.getItem(ALL_QUESTIONS) || JSON.stringify(questions) || JSON.stringify(allQuestions));
    LocalStorage.setItem(ANSWERED_QUESTIONS, LocalStorage.getItem(ANSWERED_QUESTIONS) || JSON.stringify(answeredQuestions));
    LocalStorage.setItem(CHOSEN_QUESTIONS, LocalStorage.getItem(CHOSEN_QUESTIONS) || JSON.stringify(chosenQuestions));
}

initialiseLocalStorage();
