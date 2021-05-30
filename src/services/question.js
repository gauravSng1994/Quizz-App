import _ from 'lodash';
// import LocalStorage from "./LocalStorage";
// import { JSON_DATA } from '../constants/index';
import FileClass from "./FileSystem/File";

export const getJsonData = async () => {
    // const jsonData = LocalStorage.getItem(JSON_DATA);
    const file = new FileClass();
    const jsonData = await file.readFile('quiz', 'jsonData.json');
    // const categories = await file.readFile('quiz', 'categories.json');
    // console.log('categories',categories);
    // let jsonData = {}
    // console.log('this is json data',jsonData);
    return jsonData;
    // return jsonData ? JSON.parse(jsonData) : {};
}

export const getAllCategories = async () => {
    const allQuestions = await getJsonData().categories;
    if(!allQuestions || _.isEmpty(allQuestions)) return null;
    return allQuestions;
}
export const getQuestion = async (categoryId,questionId) => {
    const allQuestions = await getAllCategories();
    if(!allQuestions || _.isEmpty(allQuestions)) return null;
    return allQuestions[categoryId].questions.find( el => Number(el.id) === Number(questionId));
}
export const getAnsweredQuestions = async (categoryId) => {
    const allQuestions = await getAllCategories();
    if(!allQuestions || _.isEmpty(allQuestions)) throw new Error('List of questions is empty.');
    const questions = (allQuestions[categoryId]||{}).questions;
    if(!questions || !Array.isArray(questions)) throw new Error('No question found for given questionId.');
    return questions.filter( q => q.isAnswered );
};

const setAllQuestions = async (question) => {
    let data = await getJsonData();
    data.categories = question;
    // LocalStorage.setItem(JSON_DATA,JSON.stringify(data));
};

export const updateAnswer = async (questionId, categoryId, answer) => {
    console.log('updating answer',questionId,categoryId,answer);
    if(!questionId ) throw new Error('Invalid argument for "question" field in markAnswered function.');
    if(!categoryId) throw new Error('Invalid argument for "categoryId" field in markAnswered function.');
    const allQuestions = await getAllCategories();
    console.log(allQuestions);
    if(!allQuestions || _.isEmpty(allQuestions)) throw new Error('List of questions is empty.');
    const questions = (allQuestions[categoryId]||{}).questions;
    if(!questions || !Array.isArray(questions)) throw new Error('No questions found for given categoryId.');
    const modifiedQuestionList = questions.map( q => {
        if( Number(q.id) === Number(questionId)) {
            q.isAnswered = true;
            q.userAnswer = answer;
            q.isUserAnswerCorrect = (answer||"").toLowerCase() === q.answer.toLowerCase();
            // q.isChosen = true;
        }
        return q;
    });
    let modifiedQnList = {
        ...allQuestions[categoryId],
        questions:modifiedQuestionList
    }
    await setAllQuestions({...allQuestions,[categoryId]:modifiedQnList});
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
