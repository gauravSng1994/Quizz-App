import Download from "./FileSystem/Download";
// import FileClass from "./FileSystem/File";
import LocalStorage from "./LocalStorage";
import {JSON_DATA} from "../constants";

const ASSETS = {
    // music : ['background.mp3'],
    sound : ['background.mp3','back.mp3','clear.mp3',"correct.mp3","finish.mp3","letter_select.mp3","proceed.mp3","remove.mp3","select.mp3","wrong.mp3"],
    images : ['app_config.json','app_icon.png','back_button.svg','button_background.svg','dialog_background.svg','dialog_border.svg',
        'divider_background.svg','letterbox_background.svg','letterbox_border_correct.svg','letterbox_border_neutral.svg','letterbox_border_wrong.svg',
        'music_off.svg','music_on.svg','no_image_question.svg','question_background.svg','question_border.svg','question_icon_background.svg','question_icon_border.svg',
        'question_icon_questionmark.svg','question_icon_upcoming_background.svg','sound_off.svg','sound_on.svg','static_preloader.png','title_background.svg'
    ]
}

const downloadAndSave = async (url,fileDirPath,fileName) => {
    let download = new Download(url);
    download.download(fileDirPath,fileName).then((downloadResponse) => {
        console.log('res',downloadResponse);
    }).catch((downloadErrorResponse) => {
        console.log('res',downloadErrorResponse);
    });
}
export const downloadAdditionalResources = async (callback) => {
    try {
        console.log('downloadAdditionalResources... in');
        // const dataCached = LocalStorage.getItem(DATA_CACHED);
        // if( true || !dataCached){
        const jsonData = JSON.parse(LocalStorage.getItem(JSON_DATA));
        console.log('jsonData in downloadAdditionalResources',jsonData);
        /** Store jsonData file in mobile storage */
        // const blob1 = new Blob([JSON.stringify(jsonData)], {type: "text/plain;charset=utf-8"});
        // const file1 = new FileClass();
        // await file1.saveFile('quiz', 'jsonData.json', blob1);

        /** Store additional images/icons required by quiz in mobile storage */
        // let sortedCategories = jsonData.categories.sort( (a,b) => a.sequence - b.sequence);
        // let categories = {};
        await Promise.all(Object.keys(jsonData.categories).map( async key => {
            let category = jsonData.categories[key] || {};
            try {
                let images = ['background','not_chosen_icon','chosen_icon','question_answered_icon']
                images.map(async img => {
                    let name = `${img}.${category[img].split('.').pop()}`
                    await downloadAndSave(category[img],`quiz/images/${category.id}`,name);
                });
            }catch (e) {
                console.log(e);
            }
            // if(!categories[category.id]) categories[category.id] = category;
            for(let question of category.questions){
                if(question.type === 'image') {
                    try {
                        let name = `${question.id}.${question.questionImageURL.split('.').pop()}`
                        downloadAndSave(question.questionImageURL,`quiz/images/${category.id}`,name);
                    }catch (e) {
                        console.log('e',e);
                    }
                }
            }
            // const blob = new Blob([JSON.stringify(tmpJsonData)], {type: "text/plain;charset=utf-8"});
            // const file = new FileClass();
            // return await file.saveFile('quiz', `${category.id}.json`, blob);
        },{}));

        /** Downloading Assets */
        let { audioUrl, imageUrl } = jsonData;
            // appConfigUrl
        await Promise.all([...Object.keys(ASSETS.sound).map(async soundLabel => {
                await downloadAndSave(`${audioUrl}${soundLabel}`,`quiz/assets/sound}`,soundLabel);
            }),
            ...Object.keys(ASSETS.images).map( async imageLabel => {
                await downloadAndSave(`${imageUrl}${imageLabel}`,`quiz/assets}`,imageLabel);
            })
        ]);
        console.log('downloadAdditionalResources... out');
        callback(true);
    }catch (e) {
        console.log('Error',e);
        callback(false);
    }
}
