//Returns string with first character capitalized.
export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export function jsonPropAtIndex(json, i){
    var str='{"key":"'+Object.keys(json)[i]+'","value":"'+json[Object.keys(json)[i]]+'"}'
    console.log(str)
    return JSON.parse(str)
}