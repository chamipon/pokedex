import React, { useState, useEffect } from "react";
import * as helpers from "./../../../helpers.js";
function EvoChainArrow(props) {
	const [EvoDetails, setEvoDetails] = useState(); //The evolution chain for the pokemon.
	useEffect(() => {
		getEvoDetails(props.evoDetails);
	}, []);
	return (
		<span className="text-center EvoChainArrow">
			{EvoDetails && EvoDetails.trigger && (
				<span>
					<i
						title={"Trigger: " + EvoDetails.trigger}
						className="d-none d-md-inline-block fas fa-2x fa-long-arrow-alt-right"
					></i>
					<i
						title={"Trigger: " + EvoDetails.trigger}
						className="d-inline-block d-md-none fas fa-2x fa-long-arrow-alt-down"
					></i>
				</span>
			)}
			{EvoDetails && EvoDetails.min_level && (
				<div>Lv. {EvoDetails.min_level}</div>
			)}
			{EvoDetails &&
				EvoDetails.trigger == "Trade" &&
				!EvoDetails.trade_species && (
					<i
						title="Trade"
						className="fas fa-lg d-block fa-people-arrows"
					></i>
				)}
			{EvoDetails &&
				EvoDetails.trigger == "Trade" &&
				EvoDetails.trade_species && (
					<div>
						<i
							title={"Trade for " + EvoDetails.trade_species}
							className="fas fa-lg d-block fa-people-arrows"
						></i>{" "}
						{EvoDetails.trade_species}
					</div>
				)}
			{EvoDetails && EvoDetails.item && <div>{EvoDetails.item}</div>}
			{EvoDetails && EvoDetails.held_item && (
				<div>{EvoDetails.held_item}</div>
			)}
			{EvoDetails && EvoDetails.location && (
				<div title={"Location: " + EvoDetails.location}>
					<i class="fas fa-map-marker-alt"></i> {EvoDetails.location}
				</div>
			)}
			{EvoDetails && EvoDetails.min_happiness && (
				<div title={"Minimum Happiness: " + EvoDetails.min_happiness}>
					<i class="fas fa-heart"></i> {EvoDetails.min_happiness}
				</div>
			)}
			{EvoDetails && EvoDetails.min_affection && (
				<div
					title={
						"Minimum Pokemon-Amie Affection Level: " +
						EvoDetails.min_affection
					}
				>
					<i class="fas fa-heart"></i> Level{" "}
					{EvoDetails.min_affection}
				</div>
			)}
			{EvoDetails && EvoDetails.time_of_day && (
				<div title={"Time of Day: " + EvoDetails.time_of_day}>
					<i class="far fa-clock"></i> {EvoDetails.time_of_day}
				</div>
			)}
			{EvoDetails && EvoDetails.known_move && (
				<div title={"Known Move: " + EvoDetails.known_move}>
					<i class="fas fa-compact-disc"></i> {EvoDetails.known_move}
				</div>
			)}
			{EvoDetails && EvoDetails.known_move_type && (
				<div title={"Known Move Type: " + EvoDetails.known_move_type}>
					<i class="fas fa-compact-disc"></i>{" "}
					{EvoDetails.known_move_type}
				</div>
			)}
			{EvoDetails && EvoDetails.needs_overworld_rain && (
				<div title="Overworld Rain or Fog">
					<i class="fas fa-tint"></i>
				</div>
			)}
			{EvoDetails && EvoDetails.gender == "Male" && (
				<div title="Male">
					<i class="fas fa-lg fa-mars"></i>
				</div>
			)}
			{EvoDetails && EvoDetails.gender == "Female" && (
				<div title="Female">
					<i class="fas fa-lg fa-venus"></i>
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
						deets.item = helpers.capitalize(
							value.name.replaceAll("-", " ")
						);
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
