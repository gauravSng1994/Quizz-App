

// import { JSON_DATA, SELECTED_QUESTION, SELECTED_CATEGORY, DATA_CACHED } from "../constants";
// import {  DATA_CACHED } from "../constants";
// import LocalStorage from "../services/LocalStorage";
import jsonData from '../data/quiz_config_v2_full.json';
// import {downloadImage} from "../services/image";
import Download from "../services/FileSystem/Download";
import FileClass from "../services/FileSystem/File";
// const initialState = {
//     selectedCategory : '',
//     selectedQuestion : {},
//     allQuestions: {
//         // categoryId:{
//         //     questions:{
//         //          qnId:
//         //     },
//         //     count:0
//         // },
//     },
// };
// const variant = {
//     music:['background.mp3'],
//     sound:['back.mp3','clear.mp3',"correct.mp3","finish.mp3","letter_select.mp3","proceed.mp3","remove.mp3","select.mp3","wrong.mp3"],
//     current:['app_config.json','app_icon.png','back_button.svg','button_background.svg','dialog_background.svg','dialog_border.svg',
//         'divider_background.svg','letterbox_background.svg','letterbox_border_correct.svg','letterbox_border_neutral.svg','letterbox_border_wrong.svg',
//         'music_off.svg','music_on.svg','no_image_question.svg','question_background.svg','question_border.svg','question_icon_background.svg','question_icon_border.svg',
//         'question_icon_questionmark.svg','question_icon_upcoming_background.svg','sound_off.svg','sound_on.svg','static_preloader.png','title_background.svg'
//     ]
//         // background:{
//         //     key:'background.mp3',
//         //     value: '',
//         // },
// }
const downloadAndSave = async (url,fileDirPath,fileName)=>{
    let download = new Download(url);
    download.download(fileDirPath,fileName).then((downloadResponse) => {
        console.log('res',downloadResponse);
    }).catch((downloadErrorResponse) => {
        console.log('res',downloadErrorResponse);
    });
}
const initialiseLocalStorage = async () => {
    // const dataCached = LocalStorage.getItem(DATA_CACHED);
    // if( true || !dataCached){
        const blob1 = new Blob([JSON.stringify(jsonData)], {type: "text/plain;charset=utf-8"});
        const file1 = new FileClass();
        await file1.saveFile('quiz', 'jsonData.json', blob1);
        let sortedCategories = jsonData.categories.sort( (a,b) => a.sequence - b.sequence);
        let categories = {};
        let genericImageName = `background.${jsonData.generic.background.split('.').pop()}`
        await downloadAndSave(jsonData.generic.background,'quiz/images/generic',genericImageName);
        await Promise.all(sortedCategories.map( async category => {
            try {
                let images = ['background','not_chosen_icon','chosen_icon','question_answered_icon']
                images.map(async img => {
                    let name = `${img}.${category[img].split('.').pop()}`
                    await downloadAndSave(category[img],`quiz/images/${category.id}`,name);
                });
            }catch (e) {
                console.log(e);
            }
            if(!categories[category.id]) categories[category.id] = category;
            for(let question of category.questions){
                if(question.type === 'image') {
                    try {
                        let name = `${question.id}.${question.questionImageURL.split('.').pop()}`
                        await downloadAndSave(question.questionImageURL,`quiz/images/${category.id}`,name);
                    }catch (e) {
                        console.log('e',e);
                    }
                }
            }
            // const blob = new Blob([JSON.stringify(tmpJsonData)], {type: "text/plain;charset=utf-8"});
            // const file = new FileClass();
            // return await file.saveFile('quiz', `${category.id}.json`, blob);
        },{}));
        // const genericBackground = await downloadImage(jsonData.generic.background);
        // let data = {
        //     title : jsonData.title,
        //     generic : jsonData.generic,
        //     categories : categories,
        // }
        // data.generic.backgroundBase64 = genericBackground;
    // var blob = new Blob([JSON.stringify(data)], {type: "text/plain;charset=utf-8"});
    // saveAs(blob, "data.json");

        // const blob = new Blob([JSON.stringify(data)], {type: "text/plain;charset=utf-8"});
        // const file = new FileClass();
        // return await file.saveFile('quiz', 'data.json', blob);
        // const file = new Blob([data],{type:'application/json','jsonData');
        /** Downloading Assets */

        // const { allQuestions, selectedQuestion, selectedCategory } = initialState;
        // LocalStorage.setItem(SELECTED_QUESTION, LocalStorage.getItem(SELECTED_QUESTION) || selectedQuestion);
        // LocalStorage.setItem(SELECTED_CATEGORY, LocalStorage.getItem(SELECTED_CATEGORY) || selectedCategory);
        // LocalStorage.setItem(JSON_DATA, LocalStorage.getItem(JSON_DATA) || JSON.stringify(data) || JSON.stringify(allQuestions));
        // LocalStorage.setItem(DATA_CACHED,"true");
    // }
}
document.addEventListener("deviceready", initialiseLocalStorage, false);
// initialiseLocalStorage();
