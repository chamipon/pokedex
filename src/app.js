import * as pokeFuncs from "./pokeFuncs.js";
import * as helpers from "./helpers.js";
import PokeCard from "./pokeCard/pokeCard";
import Navbar from "./navbar/navbar";
import React, { useState, useEffect } from "react";
import "./app.css";
function App(props) {
	const [pokes, setPokes] = useState(""); // All the pokemon data that has been fetched.
	const [displayPokes, setDisplayPokes] = useState(""); //The pokemon that are currently being displayed.
	useEffect(() => {
		
		const Pokedex = require("pokeapi-js-wrapper");
		const P = new Pokedex.Pokedex({
			cacheImages: true,
			timeout: 10000,
		});
		var monarray = []
		var i = 1;
		while(i<30) monarray.push(i++)
		console.log(monarray)
		monarray.push(143);
		// monarray.push(265);
		monarray.push(280);
		// monarray.push(439);
		monarray.push(415);
		// monarray.push(470);
		// monarray.push(471);
		// monarray.push(196);			
		// monarray.push(197);
		monarray.push(133);
		monarray.push(616);
		// monarray.push(850);
		P.getPokemonByName(monarray).then((info) => {
			setPokes(info);
			setDisplayPokes(info);
		});
	}, []);

	return (
		<div id="modeContainer" className="dark">
			<div className="scrollContainer">
				<h1 className="text-center">Ultradex</h1>
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
			<Navbar/>
		</div>
	);
}
export default App;
