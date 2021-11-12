import "./pokeCard.css";
import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import * as pokeFuncs from "./../pokeFuncs.js";
import * as helpers from "./../helpers.js";
import CardBody from "./cardBody/cardBody";
import LazyLoad, {forceCheck} from 'react-lazyload';

function PokeCard(props) {
	const [poke, setPoke] = useState(""); //The pokemon object.
	const [expanded, setExpanded] = useState(false);
	const [width, setWidth] = useState(0)
	const [offset, setOffset] = useState(0)
	const cardContainer = useRef(null); //Reference to pokeCard container object, used for the resizing of cardbody

	const Pokedex = require("pokeapi-js-wrapper");
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
		<div ref={cardContainer} className="col-12 col-sm-6 col-lg-4">
			<div className={`card pokeCard w-100 ${expanded && "expanded"}`}>
				{poke && (
				<div onClick={() => expandCard()} role="button" className="card-header">
					<LazyLoad className="spriteLazy" scrollContainer=".scrollContainer" offset={150} height={96} once >
						<div className="pokeSprite">
							<img
								className="h-100"
								src={props.isShiny ? poke.sprites.front_shiny : poke.sprites.front_default}
								alt={
									helpers.capitalize(
										pokeFuncs.getPokeName(poke)
									) + "Sprite"
								}
							/>
						</div>
					</LazyLoad>
					<span className="pokeName m-auto">
						#{props.number + " "}
						{helpers.capitalize(pokeFuncs.getPokeName(poke))}
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
		var button = cardContainer.current // The button clicked on
		var index = Array.from(button.parentNode.children).indexOf(button); // The button's current index in the list TODO: Better way to get this?
		var cardPerRow = props.colCount //The number of pokeCards per row, changes based on screen width.
		var offset = index % cardPerRow; //The number of button widths the card-body needs to be shifted over. 
		setWidth($('#PokeGrid').width() - 24) //Set the width of the card-body.
		setOffset(offset * ($(button).width() + 24)) //Shift the card-body based on the card's position in the row. 
	}
}

export default PokeCard;
