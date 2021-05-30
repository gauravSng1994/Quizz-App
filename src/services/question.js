import _ from 'lodash';
import LocalStorage from "./LocalStorage";
import { JSON_DATA } from '../constants/index';

export const getJsonData = () => {
    const jsonData = LocalStorage.getItem(JSON_DATA);
    return jsonData ? JSON.parse(jsonData) : {};
}

export const getAllCategories = () => {
    const allCategories = getJsonData().categories;
    if(!allCategories || _.isEmpty(allCategories)) return null;
    return allCategories;
}
export const getQuestion = (categoryId,questionId) => {
    const allCategories = getAllCategories();
    if(!allCategories || _.isEmpty(allCategories)) return null;
    return allCategories[categoryId].questions.find( el => Number(el.id) === Number(questionId));
}
export const getAnsweredQuestions = (categoryId) => {
    const allCategories = getAllCategories();
    if(!allCategories || _.isEmpty(allCategories)) throw new Error('List of questions is empty.');
    const questions = (allCategories[categoryId]||{}).questions;
    if(!questions || !Array.isArray(questions)) throw new Error('No question found for given questionId.');
    return questions.filter( q => q.isAnswered );
};

const setAllQuestions = (question) => {
    let data = getJsonData();
    data.categories = question;
    LocalStorage.setItem(JSON_DATA,JSON.stringify(data));
};

export const updateAnswer = (questionId, categoryId, answer) => {
    console.log('updating answer',questionId,categoryId,answer);
    if(!questionId ) throw new Error('Invalid argument for "question" field in markAnswered function.');
    if(!categoryId) throw new Error('Invalid argument for "categoryId" field in markAnswered function.');
    const allQuestions = getAllCategories();
    console.log(allQuestions);
    if(!allQuestions || _.isEmpty(allQuestions)) throw new Error('List of questions is empty.');
    const questions = (allQuestions[categoryId]||{}).questions;
    if(!questions || !Array.isArray(questions)) throw new Error('No questions found for given categoryId.');
    const modifiedQuestionList = questions.map( q => {
        if( Number(q.id) === Number(questionId)) {
            // q.userAnswer = answer;
            q.isAnswered = (answer||"").toLowerCase() === q.answer.toLowerCase();
            // q.isUserAnswerCorrect = (answer||"").toLowerCase() === q.answer.toLowerCase();
            // q.isChosen = true;
        }
        return q;
    });
    let modifiedQnList = {
        ...allQuestions[categoryId],
        questions:modifiedQuestionList
    }
    setAllQuestions({...allQuestions,[categoryId]:modifiedQnList});
};

export const markChosen = (questionId,categoryId) => {
    if(!questionId) throw new Error('Invalid argument for "question" field in markAnswered function.');
    if(!categoryId) throw new Error('Invalid argument for "categoryId" field in markAnswered function.');
    const allQuestions = getAllCategories();
    const questions = (allQuestions[categoryId]||{}).questions;
    if(!questions || !Array.isArray(questions)) throw new Error('No questions found for given categoryId.');
    const modifiedQuestionList = questions.map( q => {
        if( Number(q.id) === Number(questionId)) q.isChosen = true;
        return q;
    });
    let modifiedQnList = {
        ...allQuestions[categoryId],
        questions:modifiedQuestionList
    }
    setAllQuestions({...allQuestions,[categoryId]:modifiedQnList});
}
export default {
    setAllQuestions,
    getAnsweredQuestions,
    updateAnswer:updateAnswer,
    markChosen
}
