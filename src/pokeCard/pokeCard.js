import "./pokeCard.css";
import React, { useState, useEffect } from "react";
import $ from "jquery";
import * as pokeFuncs from "./../pokeFuncs.js";
import * as helpers from "./../helpers.js";
import CardBody from "./cardBody";

function PokeCard(props) {
	const [poke, setPoke] = useState(""); //The pokemon object.
	const [expanded, setExpanded] = useState(false);
	const Pokedex = require("pokeapi-js-wrapper");
	const P = new Pokedex.Pokedex({
		cacheImages: true,
		timeout: 5000,
	});
	useEffect(() => {
		async function fetchData() {
			var pokeObj = await pokeFuncs.getPokeObjByName(props.poke.name,props.pokeList,props.pokeListUpdater,P)
			setPoke(pokeObj);
		}
		fetchData();
	}, []);

	useEffect(() => {
		if(props.selected !== props.number){
			setExpanded(false);
		}
	},[props.selected])

	function expandCard(e){
		if(props.selected === props.number){
			setExpanded(false);
			props.setSelected("");
		}
		else{
			setExpanded(true);
			props.setSelected(props.number)
			var button = $(e.currentTarget).parents('.cardlazy')[0]; // The button clicked on
			var index = Array.from(button.parentNode.children).indexOf(button); // The button's current index in the list TODO: Better way to get this?
			var cardPerRow = 1; //The number of pokeCards per row, changes based on screen width.
			if(window.innerWidth >= 992) cardPerRow = 3;
			else if(window.innerWidth >= 576) cardPerRow = 2;
			
			var offset = index % cardPerRow; //The number of button widths the card-body needs to be shifted over. 
			$(button).find(".card-body").css('width', $('#PokeGrid').width() - 24) //Set the width of the card-body.
			$(button).find(".card-body").css('right', offset * ($(button).width() + 24)) //Shift the card-body based on the card's position in the row. 
		}
	}
	return (
			<div data-index={props.index} className={`card pokeCard w-100 ${expanded && "expanded"}`}>
				{poke && (<div onClick={(e) => expandCard(e)} role="button" className="card-header">
					<div className="pokeSprite">
						<img
							className="h-100"
							src={poke && props.isShiny ? poke.sprites.front_shiny : poke.sprites.front_default}
							alt={
								poke &&
								helpers.capitalize(
									pokeFuncs.getPokeName(poke)
								) + "Sprite"
							}
						/>
					</div>
					<span className="pokeName m-auto">
						#{props.number}{" "}
						{poke &&
							helpers.capitalize(pokeFuncs.getPokeName(poke))}
					</span>
				</div>
			)}
			{poke && (
				<div className="card-body">
					<CardBody
						render={expanded}
						key={
							poke &&
							helpers.capitalize(pokeFuncs.getPokeName(poke)) +
								"_evoChain"
						}
						speciesUrl={props.poke.url}
						poke={poke}
						pokeList={props.pokeList}
						pokeListUpdater={props.pokeListUpdater}
						evoChainList={props.evoChainList}
						evoChainListUpdater={props.evoChainListUpdater}
						isShiny={props.isShiny}
					/>
				</div>
			)}
			</div>
	);
}

export default PokeCard;
