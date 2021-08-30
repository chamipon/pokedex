import "./pokeCard.css";
import React, { useState, useEffect } from "react";
import $ from "jquery";
function PokeCard(props) {
	const [evoChain, setEvoChain] = useState(""); //The evolution chain for the pokemon.
	const [species, setSpecies] = useState(""); //The species for the pokemon.
	async function expandCard(e){
		const Pokedex = require("pokeapi-js-wrapper");
		const P = new Pokedex.Pokedex({
			cacheImages: true,
			timeout: 5000,
		});
		var button = $(e.currentTarget).parent('.pokeCard'); // The button clicked on
		if(evoChain == ""){ // Set the species and evolution chain if we havent already
			var spec = await P.getPokemonSpeciesByName(props.number)
			setSpecies(spec)
			var chain = await P.resource(spec.evolution_chain.url)
			setEvoChain(chain)
		} 

		var cardPerRow = 1; //The number of pokeCards per row, changes based on screen width.
		if(window.innerWidth >= 992) cardPerRow = 3;
		else if(window.innerWidth >= 576) cardPerRow = 2;
		
		var offset = button.attr("data-index") % cardPerRow; //The number of button widths the card-body needs to be shifted over. 
		
		if($(button).hasClass('expanded')) $(button).removeClass("expanded") //if the card clicked on was the card that is open, close the card.
		else {//If the card clicked was a different card, close the current one, open the new one.
			$("#PokeGrid").find('.expanded').removeClass('expanded')
			$(button).addClass("expanded")
			$(button).find(".card-body").css('width', $('#PokeGrid').width() - 24) //Set the width of the card-body.
			$(button).find(".card-body").css('right', offset * ($(button).width() + 24)) //Shift the card-body based on the card's position in the row. 
		}
	}

	return (
		<div className="col-12 col-sm-6 col-lg-4">
			<div data-index={props.index} className="card pokeCard w-100">
				<div onClick={(e) => expandCard(e)} role="button" className="card-header">
					<div className="pokeSprite">
						<img className="h-100" src={props.sprite} alt={props.name + "Sprite"} />
					</div>
					<span className="pokeName m-auto">#{props.number} {props.name}</span>
				</div>
				<div className="card-body">

				</div>
			</div>
		</div>
	);
}

export default PokeCard;
