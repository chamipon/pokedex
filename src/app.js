import * as pokeFuncs from "./pokeFuncs.js";
import * as helpers from "./helpers.js";
import PokeCard from "./pokeCard/pokeCard";
import React, { useState, useEffect } from "react";

function App(props) {
	const [pokes, setPokes] = useState(""); // All the pokemon data that has been fetched
    const [currPoke, setCurrPoke] = useState(""); // The data on the specific pokemon being viewed
	useEffect(() => {
		
		const Pokedex = require("pokeapi-js-wrapper");
		const P = new Pokedex.Pokedex({
			cacheImages: true,
			timeout: 5000,
		});
		P.getPokemonByName([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]).then((info) => {
			setPokes(info);
			console.log(info)
		});
	}, []);

	return (
		<div>
			<h1 className="text-center">NOT SHIT POKEDEX</h1>
			<div id="PokeGrid" className="mx-auto container row">{pokes && pokes.map((poke,i) => (
					<PokeCard
						key={poke.id}
						index={i}
						number={poke.id}
						name={helpers.capitalize(pokeFuncs.getPokeName(poke))}
						sprite={pokeFuncs.getPokeSprite(
							poke,
							"iv",
							false,
							true,
							false
						)}
						poke={poke}
					/>
				)
			)}</div>
			<button className="btn btn-secondary mx-auto">Load More</button>
		</div>
	);
}
export default App;
