import { deHyphenate } from "./helpers";
export const MAX_BASE_STAT = 255;
export const MAX_MAX_STAT = 714;
export const OFFICIAL_ART_BASE_URL =
	"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
export const SPRITE_BASE_URL =
	"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
//Takes in poke json object, returns formatted poke name
export function getPokeName(poke) {
	var name = poke.name;

	// Handle specific edge cases
	if (name.includes("nidoran-m")) return "Nidoran ♂";
	if (name.includes("nidoran-f")) return "Nidoran ♀";
	if (name.includes("ho-oh")) return "Ho-Oh";
	if (name.includes("type-null")) return "Type: Null";
	if (name.includes("mr-mime")) return "Mr. Mime";
	if (name.includes("mime-jr")) return "Mime Jr.";
	if (name.includes("mr-rime")) return "Mr. Rime";
	if (name.includes("kommo-o")) return "Kommo-o";
	if (name.includes("jangmo-o")) return "Jangmo-o";
	if (name.includes("hakamo-o")) return "Hakamo-o";
	if (name.includes("porygon-z")) return "Porygon-Z";
	if (name.includes("morpeko-full-belly")) return "Morpeko";
	if (name.includes("meloetta-aria")) return "Meloetta";
	if (name.includes("eiscue-ice")) return "Eiscue";
	if (name.includes("mimikyu-disguised")) return "Mimikyu";
	if (name.includes("wishiwashi-solo")) return "Wishiwashi";
	if (name.includes("standard")) name = name.replace("standard", ""); //This one is for darmanitan
	if (name.includes("ordinary")) name = name.replace("ordinary", ""); //This one is for keldeo
	//Move variant words to the start of the name instead of the end
	if (name.includes("galar")) name = "Galarian " + name.replace("galar", "");
	if (name.includes("alola")) name = "Alolan " + name.replace("alola", "");
	if (name.includes("hisui")) name = "Hisuian " + name.replace("hisui", "");
	if (name.includes("mega")) name = "Mega " + name.replace("mega", "");
	if (name.includes("gmax")) name = "Gigantamax " + name.replace("gmax", "");
	if (name.includes("eternamax"))
		name = "Eternamax " + name.replace("eternamax", "");
	//Replace all -'s with spaces, capitalize each word
	return deHyphenate(name);
}
export function defaultFormUrlExceptions(name) {
	if (name == "darmanitan") return "darmanitan-standard";
	if (name == "basculin") return "basculin-red-striped";
	if (name == "tornadus") return "tornadus-incarnate";
	if (name == "thundurus") return "thundurus-incarnate";
	if (name == "landorus") return "landorus-incarnate";
	if (name == "keldeo") return "keldeo-ordinary";
	if (name == "meloetta") return "meloetta-aria";
	if (name == "meowstic") return "meowstic-male";
	if (name == "urshifu") return "urshifu-single-strike";
	if (name == "morpeko") return "morpeko-full-belly";
	if (name == "indeedee") return "indeedee-male";
	if (name == "eiscue") return "eiscue-ice";
	if (name == "toxtricity") return "toxtricity-amped";
	if (name == "mimikyu") return "mimikyu-disguised";
	if (name == "minior") return "minior-red-meteor";
	if (name == "wishiwashi") return "wishiwashi-solo";
	if (name == "lycanroc") return "lycanroc-midday";
	if (name == "oricorio") return "oricorio-baile";
	if (name == "zygarde") return "zygarde-50";
	if (name == "gourgeist") return "gourgeist-average";
	if (name == "pumpkaboo") return "pumpkaboo-average";
	if (name == "aegislash") return "aegislash-shield";
	if (name == "shaymin") return "shaymin-land";
	if (name == "giratina") return "giratina-altered";
	if (name == "wormadam") return "wormadam-plant";
	if (name == "deoxys") return "deoxys-normal";

	return name;
}
//Takes in poke json, returns json of all base stats.
//If a specific stat is entered, it will return just that stat's value.
export function getPokeBaseStats(poke, stat) {
	var stats = poke.stats;
	var baseStats = {};
	var i;
	var maxstat = MAX_BASE_STAT;
	for (i = 0; i < stats.length; i++) {
		baseStats[stats[i].stat.name] = stats[i].base_stat;
	}
	baseStats["length"] = ++i;
	baseStats["max"] = maxstat;
	if (stat) return baseStats[stat];
	else return baseStats;
}
//Uses a poke's species url, splits the string to grab the species' number.
//Not a fan of this at all.
export function getPokeNumberBySpeciesUrl(url) {
	return url.split("/")[6].toString();
}
export function getPokeMaxStats(poke, stat) {
	var stats = poke.stats;
	var maxStats = {};
	var i;
	var maxstat = MAX_MAX_STAT;
	for (i = 0; i < stats.length; i++) {
		var currStat = calcPokeMaxStat(
			stats[i].base_stat,
			stats[i].stat.name == "hp"
		);
		maxStats[stats[i].stat.name] = currStat;
	}
	maxStats["length"] = ++i;
	maxStats["max"] = maxstat;
	if (stat) return maxStats[stat];
	else return maxStats;
}

//Takes in a base stat, ev value, iv value, pokemon level, nature coeffecient, and a bool to depict if we are calculating hp or not.
//Returns the stat given the values entered.
export function calcPokeStat(base, ev, iv, level, natCoeff, hpFlag) {
	ev = Math.floor(ev / 4); // Every 4 ev point gives the poke 1 stat point
	if (hpFlag) return Math.floor((2 * base + iv + ev) * (level / 100) + level + 10);
	else
		return Math.floor(
			Math.floor(((2 * base + iv + ev) * level) / 100 + 5) * natCoeff
		);
}

//Takes in base stat and hp flag, returns the maximum stat possible for the stat.
export function calcPokeMaxStat(base, hpFlag) {
	return calcPokeStat(base, 255, 31, 100, 1.1, hpFlag);
}

//Takes in poke json, returns json of EVs rewarded when fainted.
//If a specific stat is entered, it will return just that ev's value.
export function getPokeEVs(poke, ev) {
	var stats = poke.stats;
	var evs = {};
	for (var i = 0; i < stats.length; i++) {
		evs[stats[i].stat.name] = stats[i].effort;
	}
	if (ev) return evs[ev];
	else return evs;
}

//Takes in a poke species json, returns the rate of it being male/female
//If poke is genderless, returns -1.
export function getPokeGenderRates(species) {
	if (species.gender_rate === -1) return -1;
	var femchance = (100 * species.gender_rate) / 8; //The gender rate is stored as a number of eighths.
	return { mChance: 100 - femchance, fChance: femchance };
}

//Takes in a species json, returns the number of steps needed to hatch an egg for the pokemon
export function getPokeEggSteps(species) {
	return 255 * (species.hatch_counter + 1);
}

//Takes in a poke json, returns the rate of it being male/female
export function getPokeTypes(poke) {
	var types = [];
	poke.types.forEach((type) => {
		types[type.slot - 1] = type.type.name;
	});
	return types;
}

//Takes in poke json object, generation(1-8) roman numerals, shinyFlag(t/f), frontFlag(t/f) and maleFlag(t/f)
//Returns sprite
export function getPokeSprite(poke, gen, shinyFlag, frontFlag, femaleFlag) {
	var spriteString = "";

	if (frontFlag) spriteString += "front";
	else spriteString += "back";

	//Gen 1 doesnt have shinies, but it has gray sprite versions
	if (shinyFlag && gen === "i") spriteString += "_gray";
	else if (shinyFlag) spriteString += "_shiny";

	if (femaleFlag) spriteString += "_female";

	if (!femaleFlag && !shinyFlag) spriteString += "_default";

	var genString = "generation-" + gen;
	try {
		var generationJson = poke["sprites"]["versions"][genString]; //we now have the json for the specific generation.
		var gameJson =
			generationJson[
				Object.keys(generationJson)[Object.keys(generationJson).length - 1]
			]; //We now have the json for one of the games, we dont care which, so we just take the last one in the array.
		return gameJson[spriteString]; //Return the desired sprite
	} catch {
		console.group("ERROR GETTING SPRITE");
		console.log("POKEMON: " + getPokeName(poke));
		console.log("SPRITE: " + spriteString);
		console.log("GENERATION: " + genString);
		console.groupEnd();
		return null;
	}
}
export function buildPokeSpriteUrl(pokeId, useArt, isShiny) {
	if (useArt) return OFFICIAL_ART_BASE_URL + pokeId + ".png";
	else {
		let spriteUrl = SPRITE_BASE_URL;
		if (isShiny) spriteUrl += "shiny/";
		return spriteUrl + pokeId + ".png";
	}
}
//Takes in a pokemon object, returns the gen 7 sprite if available, otherwise returns the gen 8 sprite.
export function getPokeIcon(poke) {
	if (poke.sprites.versions["generation-vii"].icons.front_default) {
		return poke.sprites.versions["generation-vii"].icons.front_default;
	} else return poke.sprites.versions["generation-viii"].icons.front_default;
}
/**
 * Used to grab the genus of a pokemon.
 * @param {speciesObj} species - The species object of the pokemon.
 * @param {string} lang - Optional, the language of genus you want returned. English is default.
 */
export function getPokeGenus(species, lang) {
	if (species.genera.length > 0) {
		var genusObj = species.genera.find((el) => el.language.name === lang);
		if (genusObj) return genusObj.genus;
		else return species.genera.find((el) => el.language.name === "en").genus;
	} else return "";
}

/**
 * Used to grab the flavour text of a pokemon.
 * @param {speciesObj} species - The species object of the pokemon.
 * @param {string} lang - Optional, the language of flavour text you want returned. English is default.
 * @param {string} version - Optional, the game version you want the flavour text from. The most recent version is the default.
 */
export function getPokeFlavText(species, lang = "en", version) {
	try {
		var flavTextObj = species.flavor_text_entries.find(
			(el) => el.language.name == lang && el.version.name == version
		);
		if (flavTextObj) return flavTextObj.flavor_text.replace(/\f/g, "");
		else {
			var engObjs = species.flavor_text_entries.filter(
				(el) => el.language.name == "en"
			);
			return engObjs[engObjs.length - 1].flavor_text.replace(/\f/g, "");
		}
	} catch {
		return "";
	}
}

/**
 * Used to grab the flavour text of an item.
 * @param {itemObj} item - The item object.
 * @param {string} lang - Optional, the language of flavour text you want returned. English is default.
 * @param {string} versiongroup - Optional, the version group you want the flavour text from. The most recent version is the default.
 */
export function getItemFlavText(item, lang = "en", versiongroup) {
	try {
		var flavTextObj = item.flavor_text_entries.find(
			(el) => el.language.name == lang && el.version_group.name == versiongroup
		);
		if (flavTextObj) return flavTextObj.text.replace(/\f/g, "");
		else {
			var engObjs = item.flavor_text_entries.filter(
				(el) => el.language.name == "en"
			);
			return engObjs[engObjs.length - 1].text.replace(/\f/g, "");
		}
	} catch {
		return "";
	}
}

/**
 * Used to grab the flavour text of an ability.
 * @param {abilityObj} ability - The ability object.
 * @param {string} lang - Optional, the language of flavour text you want returned. English is default.
 * @param {string} versiongroup - Optional, the version group you want the flavour text from. The most recent version is the default.
 */
export function getAbilityFlavText(ability, lang = "en", versiongroup) {
	try {
		var flavTextObj = ability.flavor_text_entries.find(
			(el) => el.language.name == lang && el.version_group.name == versiongroup
		);
		if (flavTextObj) return flavTextObj.flavor_text.replace(/\f/g, "");
		else {
			var engObjs = ability.flavor_text_entries.filter(
				(el) => el.language.name == "en"
			);
			return engObjs[engObjs.length - 1].flavor_text.replace(/\f/g, "");
		}
	} catch {
		return "";
	}
}
/**
 * Used to grab the flavour text of an ability.
 * @param {moveObj} move - The ability object.
 * @param {string} lang - Optional, the language of flavour text you want returned. English is default.
 * @param {string} versiongroup - Optional, the version group you want the flavour text from. The most recent version is the default.
 */
export function getMoveFlavText(move, lang = "en", versiongroup) {
	try {
		var flavTextObj = move.flavor_text_entries.find(
			(el) => el.language.name == lang && el.version_group.name == versiongroup
		);
		if (flavTextObj) return flavTextObj.flavor_text.replace(/\f/g, "");
		else {
			var engObjs = move.flavor_text_entries.filter(
				(el) => el.language.name == "en"
			);
			return engObjs[engObjs.length - 1].flavor_text.replace(/\f/g, "");
		}
	} catch {
		return "";
	}
}
/**
 * Used to grab the flavour text of an ability.
 * @param {abilityObj} ability - The ability object.
 * @param {string} lang - Optional, the language of flavour text you want returned. English is default.
 * @param {bool} long - Optional, if true return full effect, if false return short effect.
 */
export function getAbilityEffect(ability, lang = "en", long = false) {
	try {
		var effectObj = ability.effect_entries.find(
			(el) => el.language.name == lang
		);
		if (effectObj) {
			if (long) return effectObj.effect.replace(/\f/g, "");
			else return effectObj.short_effect.replace(/\f/g, "");
		} else {
			var effectObjs = ability.effect_entries.filter(
				(el) => el.language.name == "en"
			);
			let effectObj = effectObjs[effectObjs.length - 1];
			if (long) return effectObj.effect.replace(/\f/g, "");
			else return effectObj.short_effect.replace(/\f/g, "");
		}
	} catch {
		return "";
	}
}
/**
 * Used to grab the flavour text of an ability.
 * @param {abilityObj} ability - The ability object.
 * @param {string} lang - Optional, the language of flavour text you want returned. English is default.
 * @param {bool} long - Optional, if true return full effect, if false return short effect.
 */
export function getMoveEffect(move, lang = "en", long = false) {
	return getEffectEntry(move.effect_entries, lang, long);
}
export function getEffectEntry(entries, lang, long) {
	try {
		var effectObj = entries.find((el) => el.language.name == lang);
		if (effectObj) {
			if (long) return effectObj.effect.replace(/\f/g, "");
			else return effectObj.short_effect.replace(/\f/g, "");
		} else {
			var effectObjs = entries.filter((el) => el.language.name == "en");
			let effectObj = effectObjs[effectObjs.length - 1];
			if (long) return effectObj.effect.replace(/\f/g, "");
			else return effectObj.short_effect.replace(/\f/g, "");
		}
	} catch {
		return "";
	}
}
//Takes in poke name, list of pokeobjs, pokelistupdater and the pokedex object.
//Uses the poke name to look for the pokeobj in the list, if the obj isnt in the list yet, it gets it from the api and adds it to the list.
//Returns the poke obj
export async function getPokeObjByName(name, P) {
	var info = await P.getPokemonByName(name);
	return info;
}
