export function getFromLocalStorage(key){
    const value = localStorage.getItem(key);
    return JSON.parse(value);
}
export function setToLocalStorage(key,value){
    localStorage.setItem(key,JSON.stringify(value));
}