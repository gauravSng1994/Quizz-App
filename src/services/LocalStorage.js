export default class LocalStorage{

    static setItem(key,value){
        if(!key) throw new Error('Key cannot be null value');
        localStorage.setItem(key,value);
    }

    static getItem(key){
        if(!key) throw new Error('Key cannot be null value');
        return localStorage.getItem(key);
    }
}
