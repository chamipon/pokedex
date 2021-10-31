import "./pokeCard.css";
import React, { useState, useEffect} from "react";
import $ from "jquery";

import EvoChain from "./evoChain/evoChain";

function PokeCard(props) {
	const [evoChain, setEvoChain] = useState(""); //The evolution chain for the pokemon.
	const [species, setSpecies] = useState(""); //The species for the pokemon.
	const [expanded, setExpanded] = useState(false); //The species for the pokemon.
	const Pokedex = require("pokeapi-js-wrapper");
	const P = new Pokedex.Pokedex({
		cacheImages: true,
		timeout: 5000,
	});
	useEffect(() => {
		P.getPokemonSpeciesByName(props.number).then((info) => {
			setSpecies(info)
			setEvoChain(info.evolution_chain.url)
		})
		

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
			var button = $(e.currentTarget).parent('.pokeCard'); // The button clicked on
			var cardPerRow = 1; //The number of pokeCards per row, changes based on screen width.
			if(window.innerWidth >= 992) cardPerRow = 3;
			else if(window.innerWidth >= 576) cardPerRow = 2;
			
			var offset = props.index % cardPerRow; //The number of button widths the card-body needs to be shifted over. 
			$(button).find(".card-body").css('width', $('#PokeGrid').width() - 24) //Set the width of the card-body.
			$(button).find(".card-body").css('right', offset * ($(button).width() + 24)) //Shift the card-body based on the card's position in the row. 
		}
	}

	return (
		<div className="col-12 col-sm-6 col-lg-4">
			<div data-index={props.index} className={`card pokeCard w-100 ${expanded && "expanded"}`}>
				<div onClick={(e) => expandCard(e)} role="button" className="card-header">
					<div className="pokeSprite">
						<img className="h-100" src={props.sprite} alt={props.name + "Sprite"} />
					</div>
					<span className="pokeName m-auto">#{props.number} {props.name}</span>
				</div>
				<div className="card-body">
					<EvoChain render={expanded} key={props.name + "_evoChain"} poke={props.poke} pokeList={props.pokeList} pokeListUpdater={props.pokeListUpdater} chain={evoChain}/>
				</div>
			</div>
		</div>
	);
}

export default PokeCard;
