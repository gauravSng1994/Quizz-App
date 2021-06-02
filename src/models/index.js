import { JSON_DATA } from "../constants";
import LocalStorage from "../services/LocalStorage";
import {GET} from "../services/image";

const initialState = {
    selectedCategory : '',
    selectedQuestion : {},
    allQuestions: {},
};

export const initialiseLocalStorage = async (json_url) => {
    console.log('Initialising localStorage');
    const storedJsonUrl = LocalStorage.getItem('JSON_URL');
    if(storedJsonUrl === json_url) return;
    let jsonData = await GET(json_url);
    LocalStorage.setItem('JSON_URL',json_url);
    let sortedCategories = jsonData.categories.sort( (a,b) => a.sequence - b.sequence);
    let categories = {};
    sortedCategories.map( category =>  categories[category.id] = category );
    let data = {
        title : jsonData.title,
        generic : jsonData.generic,
        categories : categories,
        audioUrl: jsonData.audio_assets,
        imageUrl: jsonData.image_assets,
        appConfigUrl: jsonData.app_config
    }
    const { allQuestions } = initialState;
    // LocalStorage.setItem(SELECTED_QUESTION, LocalStorage.getItem(SELECTED_QUESTION) || selectedQuestion);
    // LocalStorage.setItem(SELECTED_CATEGORY, LocalStorage.getItem(SELECTED_CATEGORY) || selectedCategory);
    // LocalStorage.setItem(JSON_DATA, LocalStorage.getItem(JSON_DATA) || JSON.stringify(data) || JSON.stringify(allQuestions));
    LocalStorage.setItem(JSON_DATA, JSON.stringify(data) || JSON.stringify(allQuestions));
}

// initialiseLocalStorage();


