//Takes in poke json object, returns poke name
//TODO: Capitalize after -'s
export function getPokeName(poke){
    if(poke.name.includes("nidoran")) return poke.name.replace("-m"," ♂").replace("-f", " ♀")
    else return poke.name
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

//Takes in poke name, list of pokeobjs, pokelistupdater and the pokedex object.
//Looks uses the poke name to look for the pokeobj in the list, if the obj isnt in the list yet, it gets it from the api and adds it to the list.
//Returns the poke obj
export async function getPokeObjByName(name,pokeList,pokeListUpdater,P){
    var info = pokeList.find((obj) => {
        return obj.name === name;
    });
    if (!info) {
        info = await P.getPokemonByName(
            name
        );
        var temp = pokeList;
        temp.push(info);
        pokeListUpdater(temp);
    }
    else{
        console.log("Reusing data for: " + name)
    }
    return info;
}

export async function getEvoChainObjById(id,evoChainList,evoChainListUpdater,P){
    var info = evoChainList.find((obj) => {
        return obj.id === id
    });
    if (!info) {
        info = await P.getEvolutionChainById(id);
        var temp = evoChainList;
        temp.push({'id': id, 'chain': info});
        evoChainListUpdater(temp);
    }
    else{
        console.log("Reusing data for evo chain: " + id)
        info = info.chain
    }
    return info;
}
