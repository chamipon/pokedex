import React, { useState, useEffect } from "react";
import * as helpers from "./../../helpers.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import Image from 'next/image'
function EvoChainArrow(props) {
	const [EvoDetails, setEvoDetails] = useState(); //The evolution chain for the pokemon.
	useEffect(() => {
		getEvoDetails(props.evoDetails);
	}, []);
	return (
		<span className="text-center EvoChainArrow">
			{EvoDetails && EvoDetails.trigger && (
				<span>
					<FontAwesomeIcon
						className="d-none d-md-inline-block"
						title={"Trigger: " + EvoDetails.trigger}
						icon={solid("right-long")}
						size="2x"
					/>
					<FontAwesomeIcon
						className="d-md-none d-inline-block"
						title={"Trigger: " + EvoDetails.trigger}
						icon={solid("down-long")}
						size="2x"
					/>
				</span>
			)}
			{EvoDetails && EvoDetails.min_level && (
				<div>Lv. {EvoDetails.min_level}</div>
			)}
			{EvoDetails &&
				EvoDetails.trigger == "Trade" &&
				!EvoDetails.trade_species && (
					<FontAwesomeIcon
						className="d-block"
						title="Trade"
						icon={solid("people-arrows-left-right")}
						size="lg"
					/>
				)}
			{EvoDetails &&
				EvoDetails.trigger == "Trade" &&
				EvoDetails.trade_species && (
					<div>
						<FontAwesomeIcon
							className="d-block"
							title={"Trade for " + EvoDetails.trade_species}
							icon={solid("people-arrows-left-right")}
							size="lg"
						/>{" "}
						{EvoDetails.trade_species}
					</div>
				)}
			{EvoDetails && EvoDetails.item && 
                <>
                    {/* <div>{EvoDetails.item.name}</div> */}
                    <br/>
                    <Image alt={EvoDetails.item.name} title={EvoDetails.item.name} src={EvoDetails.item.sprite} height={30} width={30} />
                </>
            }
			{EvoDetails && EvoDetails.held_item && (
				<div>{EvoDetails.held_item}</div>
			)}
			{EvoDetails && EvoDetails.location && (
				<div title={"Location: " + EvoDetails.location}>
					<FontAwesomeIcon icon={solid("location-dot")} />
					{EvoDetails.location}
				</div>
			)}
			{EvoDetails && EvoDetails.min_happiness && (
				<div title={"Minimum Happiness: " + EvoDetails.min_happiness}>
					<FontAwesomeIcon icon={solid("heart")} />{" "}
					{EvoDetails.min_happiness}
				</div>
			)}
			{EvoDetails && EvoDetails.min_affection && (
				<div
					title={
						"Minimum Pokemon-Amie Affection Level: " +
						EvoDetails.min_affection
					}
				>
					<FontAwesomeIcon icon={solid("heart")} /> Level{" "}
					{EvoDetails.min_affection}
				</div>
			)}
			{EvoDetails && EvoDetails.time_of_day && (
				<div title={"Time of Day: " + EvoDetails.time_of_day}>
					<FontAwesomeIcon icon={regular("clock")} />{" "}
					{EvoDetails.time_of_day}
				</div>
			)}
			{EvoDetails && EvoDetails.known_move && (
				<div title={"Known Move: " + EvoDetails.known_move}>
					<FontAwesomeIcon icon={solid("compact-disc")} />{" "}
					{EvoDetails.known_move}
				</div>
			)}
			{EvoDetails && EvoDetails.known_move_type && (
				<div title={"Known Move Type: " + EvoDetails.known_move_type}>
					<FontAwesomeIcon icon={solid("compact-disc")} />{" "}
					{EvoDetails.known_move_type}
				</div>
			)}
			{EvoDetails && EvoDetails.needs_overworld_rain && (
				<div title="Overworld Rain or Fog">
					<FontAwesomeIcon icon={solid("cloud-fog")} />
				</div>
			)}
			{EvoDetails && EvoDetails.gender == "Male" && (
				<div title="Male">
					<FontAwesomeIcon icon={solid("mars")} />
				</div>
			)}
			{EvoDetails && EvoDetails.gender == "Female" && (
				<div title="Female">
					<FontAwesomeIcon icon={solid("venus")} />
				</div>
			)}
		</span>
	);

	//Returns the relevant evolution details from the json data.
	function getEvoDetails(evoDetails) {
		var deets = {};
		for (var key in evoDetails) {
			var value = evoDetails[key];
			if (value) {
				switch (key) {
					case "min_level":
						deets.min_level = value;
						break;
					case "location":
						deets.location = helpers.capitalize(
							value.name.replaceAll("-", " ")
						);
						break;
					case "item":
						deets.item = {
                            name: helpers.capitalize(value.name.replaceAll("-", " ")),
                            url: value.url,
                            sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/" + value.name + ".png"
                        }
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
						deets.trigger = helpers.capitalize(
							value.name.replaceAll("-", " ")
						);
						break;
					case "known_move":
						deets.known_move = helpers.capitalize(
							value.name.replaceAll("-", " ")
						);
						break;
					case "gender":
						if (value == 1) deets.gender = "Female";
						else if (value == 2) deets.gender = "Male";
						break;
					case "known_move_type":
						deets.known_move_type = helpers.capitalize(
							value.name.replaceAll("-", " ")
						);
						break;
					case "needs_overworld_rain":
						deets.needs_overworld_rain = value;
						break;
					case "held_item":
						deets.held_item = helpers.capitalize(
							value.name.replaceAll("-", " ")
						);
						break;
					case "trade_species":
						deets.trade_species = helpers.capitalize(
							value.name.replaceAll("-", " ")
						);
						break;
					default:
						console.log("NOT HANDLED: " + key);
						console.log(value);
						break;
				}
			}
		}
		setEvoDetails(deets);
	}
}

export default EvoChainArrow;
