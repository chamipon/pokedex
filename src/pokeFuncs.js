import { deHyphenate } from "./helpers";

//Takes in poke json object, returns formatted poke name
export function getPokeName(poke){
    var name = poke.name;
    
    // Handle specific edge cases
    if(name.includes("nidoran-m")) return "Nidoran ♂"
    if(name.includes("nidoran-f")) return"Nidoran ♀"
    if(name.includes("ho-oh")) return "Ho-Oh"
    if(name.includes("type-null")) return "Type: Null"
    if(name.includes("mr-mime")) return "Mr. Mime"
    if(name.includes("mime-jr")) return "Mime Jr."
    if(name.includes("mr-rime")) return "Mr. Rime"
    if(name.includes("kommo-o")) return "Kommo-o"
    if(name.includes("jangmo-o")) return "Jangmo-o"
    if(name.includes("hakamo-o")) return "Hakamo-o"
    if(name.includes("porygon-z")) return "Porygon-Z"

    //Replace all -'s with spaces, capitalize each word. Replace Gmax with Gigantamax
    else return deHyphenate(name).replace("Gmax", "Gigantamax");
}
//Takes in poke json, returns json of all base stats.
//If a specific stat is entered, it will return just that stat's value.
export function getPokeBaseStats(poke, stat){
    var stats = poke.stats;
    var baseStats={}
    var i;
    var maxstat ={name: '', stat: 0};
    for (i = 0; i< stats.length;i++){
        baseStats[stats[i].stat.name] = stats[i].base_stat
        if(stats[i].base_stat > maxstat.stat) maxstat = {name: stats[i].stat.name, stat: stats[i].base_stat}
    }   
    baseStats["length"] = ++i;
    baseStats["max"] = maxstat;
    if(stat) return baseStats[stat]
    else return baseStats
    
}

//Takes in a base stat, ev value, iv value, pokemon level, nature coeffecient, and a bool to depict if we are calculating hp or not.
//Returns the stat given the values entered.
export function calcPokeStat(base, ev, iv, level, natCoeff, hpFlag){
   ev = Math.floor(ev/4) // Every 4 ev point gives the poke 1 stat point
   if (hpFlag) return Math.floor((2 * base + iv + ev) * (level / 100) + level + 10);
   else return Math.floor(Math.floor((2 * base + iv + ev) * level / 100 + 5) * natCoeff)
}

//Takes in base stat and hp flag, returns the maximum stat possible for the stat. 
export function calcPokeMaxStat(base, hpFlag){
    return calcPokeStat(base, 255, 31, 100, 1.1, hpFlag)
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

//Takes in a poke species json, returns the rate of it being male/female     
//If poke is genderless, returns -1.
export function getPokeGenderRates(species){
    if(species.gender_rate === -1) return -1;
    var femchance = 100 * species.gender_rate / 8 //The gender rate is stored as a number of eighths.
    return {mChance: 100 - femchance, fChance: femchance}
}

//Takes in a species json, returns the number of steps needed to hatch an egg for the pokemon
export function getPokeEggSteps(species){
    return 255 * (species.hatch_counter + 1)
}

//Takes in a poke json, returns the rate of it being male/female     
export function getPokeTypes(poke){
    var types=[];
    poke.types.forEach (type =>{
        types[type.slot-1] = type.type.name;
    })
    return types;
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

//Takes in a pokemon object, returns the gen 7 sprite if available, otherwise returns the gen 8 sprite.
export function getPokeIcon(poke){
    if(poke.pokeObj.sprites.versions['generation-vii'].icons.front_default){
        return poke.pokeObj.sprites.versions['generation-vii'].icons.front_default;
    }
    else return poke.pokeObj.sprites.versions['generation-viii'].icons.front_default
}
/**
 * Used to grab the genus of a pokemon.
 * @param {speciesObj} species - The species object of the pokemon.
 * @param {string} lang - Optional, the language of genus you want returned. English is default.
 */
export function getPokeGenus(species, lang){
    var genusObj = species.genera.find(el => el.language.name === lang)
    if (genusObj) return genusObj.genus
    else return species.genera.find(el => el.language.name === "en").genus
}

/**
 * Used to grab the flavour text of a pokemon.
 * @param {speciesObj} species - The species object of the pokemon.
 * @param {string} lang - Optional, the language of flavour text you want returned. English is default.
 * @param {string} version - Optional, the game version you want the flavour text from. Sword is default.
 */
 export function getPokeFlavText(species, lang, version){
    var flavTextObj = species.flavor_text_entries.find(el => el.language.name == lang && el.version.name == version)
    if (flavTextObj) return flavTextObj.flavor_text
    else return species.flavor_text_entries.find(el => el.language.name == "en" && el.version.name == "sword").flavor_text
}

//Takes in poke name, list of pokeobjs, pokelistupdater and the pokedex object.
//Uses the poke name to look for the pokeobj in the list, if the obj isnt in the list yet, it gets it from the api and adds it to the list.
//Returns the poke obj
export async function getPokeObjByName(name,P){
    var info = await P.getPokemonByName(
        name
    );
    return info;
}