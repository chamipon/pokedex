import React, { useState, useEffect } from "react";
import * as pokeFuncs from "./../../pokeFuncs.js";
import $ from "jquery";
import * as helpers from "./../../helpers.js";
function EvoChainArrow(props){
    const [EvoDetails, setEvoDetails] = useState(); //The evolution chain for the pokemon.
    useEffect(() => {
        getEvoDetails(props.evoDetails)
	}, []);
    return (
		<span className="text-center EvoChainArrow">
            {EvoDetails && EvoDetails.trigger && <i title={"Trigger: " + EvoDetails.trigger} className="fas fa-2x fa-long-arrow-alt-right"></i>}
            {EvoDetails && EvoDetails.min_level && <div>Lv. {EvoDetails.min_level}</div>}
            {EvoDetails && EvoDetails.item && <div>{EvoDetails.item}</div>}
            {EvoDetails && EvoDetails.location && <div title={"Location: " + EvoDetails.location}><i class="fas fa-map-marker-alt"></i> {EvoDetails.location}</div>}
            {EvoDetails && EvoDetails.min_happiness && <div title={"Minimum Happiness: " + EvoDetails.min_happiness}><i class="fas fa-heart"></i> {EvoDetails.min_happiness}</div>}
            {EvoDetails && EvoDetails.min_affection && <div title={"Minimum Pokemon-Amie Affection Level: " + EvoDetails.min_affection}><i class="fas fa-heart"></i> Level {EvoDetails.min_affection}</div>}
            {EvoDetails && EvoDetails.time_of_day && <div title={"Time of Day: " + EvoDetails.time_of_day}><i class="far fa-clock"></i> {EvoDetails.time_of_day}</div>}
            {EvoDetails && EvoDetails.known_move && <div title={"Known Move: " + EvoDetails.known_move}><i class="fas fa-compact-disc"></i> {EvoDetails.known_move}</div>}
            {EvoDetails && EvoDetails.known_move_type && <div title={"Known Move Type: " + EvoDetails.known_move_type}><i class="fas fa-compact-disc"></i> {EvoDetails.known_move_type}</div>}
            <br />
		</span>
	);

    	//Returns the relevant evolution details from the json data.
	function getEvoDetails(evoDetails){
		var deets={};
		for(var key in evoDetails) {
			var value = evoDetails[key];
			if(value){
				switch(key){
					case "min_level":
						deets.min_level = value;
						break;
					case "location":
						deets.location = helpers.capitalize(value.name.replaceAll("-"," "))
						break;
					case "item":
						deets.item = helpers.capitalize(value.name.replaceAll("-"," "))
						break;
					case "min_happiness":
						deets.min_happiness = value;
						break;
					case "min_affection": //Number of hearts in Poke Amie
                        deets.min_affection = value;
						break;
					case "time_of_day":
						deets.time_of_day = helpers.capitalize(value);
						break;
					case "trigger": //What event triggers the evolution
                        deets.trigger = helpers.capitalize(value.name.replaceAll("-"," "));
						break;
					case "known_move":
						deets.known_move = helpers.capitalize(value.name.replaceAll("-"," "));
						break;
                    case "gender":
                        deets.gender = value    ;
                        break;
                    case "known_move_type":
                        deets.known_move_type = helpers.capitalize(value.name.replaceAll("-"," "));
                        break;
					default: 
						console.log("NOT HANDLED: " + key)
						console.log(value)
						break;
				}
			} 
		}
		setEvoDetails(deets);
	}
}

export default EvoChainArrow;
