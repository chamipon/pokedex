//Takes in poke json object, returns poke name
export function getPokeName(poke){
    return poke.name.replace("-m"," ♂").replace("-f", " ♀")
}
//Takes in poke json, returns json of all base stats.
//If a specific stat is entered, it will return just that stat's value.
export function getPokeBaseStats(poke, stat){
    var stats = poke.stats;
    var baseStats={}
    var i;
    for (i = 0; i< stats.length;i++){
        baseStats[stats[i].stat.name] = stats[i].base_stat
    }   
    baseStats["length"] = ++i;
    if(stat) return baseStats[stat]
    else return baseStats
    
}

//Takes in poke json, returns json of EVs rewarded when fainted.
//If a specific stat is entered, it will return just that ev's value.
export function getPokeEVs(poke, ev){
    var stats = poke.stats;
    var evs={}
    for (var i = 0; i< stats.length;i++){
        evs[stats[i].stat.name] = stats[i].effort
    }
    if(ev) return evs[ev]   
    else return evs
}

//Takes in poke json object, generation(1-8) roman numerals, shinyFlag(t/f), frontFlag(t/f) and maleFlag(t/f)
//Returns sprite 
export function getPokeSprite(poke, gen, shinyFlag, frontFlag, femaleFlag){
    var spriteString="" 

    if(frontFlag) spriteString += "front";
    else spriteString += "back"
    
    //Gen 1 doesnt have shinies, but it has gray sprite versions
    if(shinyFlag && gen==="i") spriteString += "_gray"
    else if (shinyFlag) spriteString += "_shiny"

    if(femaleFlag) spriteString += "_female"

    if(!femaleFlag && !shinyFlag) spriteString += "_default"
        
    var genString = "generation-" + gen;
    try{
        var generationJson = poke["sprites"]["versions"][genString] //we now have the json for the specific generation.
        var gameJson = generationJson[Object.keys(generationJson)[Object.keys(generationJson).length-1]]; //We now have the json for one of the games, we dont care which, so we just take the last one in the array.
        return gameJson[spriteString]; //Return the desired sprite
    }
    catch{
        console.group("ERROR GETTING SPRITE")
        console.log("POKEMON: " + getPokeName(poke))
        console.log("SPRITE: " + spriteString)
        console.log("GENERATION: " + genString)
        console.groupEnd()
        return null;
    }

}
