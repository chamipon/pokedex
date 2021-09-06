import * as pokeFuncs from "./pokeFuncs.js";
import * as helpers from "./helpers.js";
import PokeCard from "./pokeCard/pokeCard";
import React, { useState, useEffect } from "react";

function App(props) {
	const [pokes, setPokes] = useState(""); // All the pokemon data that has been fetched.
	const [displayPokes, setDisplayPokes] = useState(""); //The pokemon that are currently being displayed.
	useEffect(() => {
		
		const Pokedex = require("pokeapi-js-wrapper");
		const P = new Pokedex.Pokedex({
			cacheImages: true,
			timeout: 5000,
		});
		var monarray = []
		var i = 1;
		while(i<30) monarray.push(i++)
		monarray.push(265);
		monarray.push(280);
		monarray.push(439);
		monarray.push(470);
		monarray.push(471);
		// monarray.push(196);			
		// monarray.push(197);
		// monarray.push(700);
		monarray.push(850);
		P.getPokemonByName(monarray).then((info) => {
			setPokes(info);
			setDisplayPokes(info);
		});
	}, []);

	return (
		<div>
			<h1 className="text-center">NOT SHIT POKEDEX</h1>
			<div id="PokeGrid" className="mx-auto container row">{displayPokes && displayPokes.map((poke,i) => (
					<PokeCard
						key={poke.id}
						index={i}
						number={poke.id}
						name={helpers.capitalize(pokeFuncs.getPokeName(poke))}
						sprite={poke.sprites.front_default}
						poke={poke}
						pokeList={pokes}
						pokeListUpdater={setPokes}
					/>
				)
			)}</div>
			<button className="btn btn-secondary mx-auto">Load More</button>
		</div>
	);
}
export default App;
