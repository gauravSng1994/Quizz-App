import _ from 'lodash';
import LocalStorage from "./LocalStorage";
import { ALL_QUESTIONS } from '../constants/index';

export const getAllQuestions = () => {
    const allQuestions = LocalStorage.getItem(ALL_QUESTIONS);
    if(!allQuestions || _.isEmpty(allQuestions)) return null;
    return JSON.parse(allQuestions);
}
export const getQuestion = (categoryId,questionId) => {
    const allQuestions = LocalStorage.getItem(ALL_QUESTIONS);
    if(!allQuestions || _.isEmpty(allQuestions)) return null;
    let parsedQuestions = (JSON.parse(allQuestions)||{});
    console.log('parsed',parsedQuestions)
    return parsedQuestions[categoryId].questions.find( el => Number(el.id) === Number(questionId));
}
export const getAnsweredQuestions = (categoryId) => {
    const allQuestions = getAllQuestions();
    if(!allQuestions || _.isEmpty(allQuestions)) throw new Error('List of questions is empty.');
    const questions = (allQuestions[categoryId]||{}).questions;
    if(!questions || !Array.isArray(questions)) throw new Error('No question found for given questionId.');
    return questions.filter( q => q.isAnswered );
};

const setAllQuestions = (question) => {
    LocalStorage.setItem(ALL_QUESTIONS,JSON.stringify(question));
};

export const updateAnswer = (questionId, categoryId, answer) => {
    console.log('updating answer',questionId,categoryId,answer);
    if(!questionId ) throw new Error('Invalid argument for "question" field in markAnswered function.');
    if(!categoryId) throw new Error('Invalid argument for "categoryId" field in markAnswered function.');
    const allQuestions = getAllQuestions();
    console.log(allQuestions);
    if(!allQuestions || _.isEmpty(allQuestions)) throw new Error('List of questions is empty.');
    const questions = (allQuestions[categoryId]||{}).questions;
    console.log('questions',questions);
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
    setAllQuestions({...allQuestions,[categoryId]:modifiedQnList});
};

export const markChosen = (questionId,categoryId) => {
    if(!questionId) throw new Error('Invalid argument for "question" field in markAnswered function.');
    if(!categoryId) throw new Error('Invalid argument for "categoryId" field in markAnswered function.');
    const allQuestions = getAllQuestions();
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
