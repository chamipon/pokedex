//Returns string with first character capitalized.
export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export function jsonPropAtIndex(json, i){
    var str='{"key":"'+Object.keys(json)[i]+'","value":"'+json[Object.keys(json)[i]]+'"}'
    console.log(str)
    return JSON.parse(str)
}
export function getColCount(){
    if(window.innerWidth >= 992) return 3;
    else if(window.innerWidth >= 576) return 2;
    else return 1;
}