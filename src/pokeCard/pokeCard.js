import "./pokeCard.css";
import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import * as pokeFuncs from "./../pokeFuncs.js";
import * as helpers from "./../helpers.js";
import CardBody from "./cardBody/cardBody";

function PokeCard(props) {
	const [poke, setPoke] = useState(""); //The pokemon object.
	const [expanded, setExpanded] = useState(false);
	const [width, setWidth] = useState(0)
	const [offset, setOffset] = useState(0)
	const Pokedex = require("pokeapi-js-wrapper");
	const pokeCard = useRef(null);
	const P = new Pokedex.Pokedex({
		cacheImages: true,
		timeout: 5000,
	});
	useEffect(() => {
		async function fetchData() {
			var pokeObj = await P.getPokemonByName(props.poke.name);
			setPoke(pokeObj);
		}
		fetchData();
	}, []);

	useEffect(() => {
		if(props.selected !== props.number){
			setExpanded(false);
		}
	},[props.number, props.selected])

	window.window.addEventListener('resize',() =>{
		if(expanded) setBodyWidth()
	})
	return (
			<div ref={pokeCard} className={`card pokeCard w-100 ${expanded && "expanded"}`}>
				{poke && (<div onClick={() => expandCard()} role="button" className="card-header">
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
			{poke && 
				<CardBody
					width={width}
					offset={offset}
					render={expanded}
					number={props.number}
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
			}
			</div>
	);	
	
	function expandCard(){
		if(props.selected === props.number){
			setExpanded(false);
			props.setSelected("");
		}
		else{
			setExpanded(true);
			props.setSelected(props.number)
			setBodyWidth()
		}
	}

	function setBodyWidth(){
		var button = $(pokeCard.current).parents('.cardlazy')[0]; // The button clicked on
		var index = Array.from(button.parentNode.children).indexOf(button); // The button's current index in the list TODO: Better way to get this?
		var cardPerRow = props.colCount //The number of pokeCards per row, changes based on screen width.
		var offset = index % cardPerRow; //The number of button widths the card-body needs to be shifted over. 
		console.log(props.colCount)
		setWidth($('#PokeGrid').width() - 24) //Set the width of the card-body.
		setOffset(offset * ($(button).width() + 24)) //Shift the card-body based on the card's position in the row. 
	}
}

export default PokeCard;
