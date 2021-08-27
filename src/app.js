import * as pokeFuncs from "./pokeFuncs.js";
import * as helpers from "./helpers.js";
import PokeCard from "./pokeCard/pokeCard";
import PokeInfo from "./pokeInfo/pokeInfo";
import React, { useState, useEffect } from "react";

function App(props) {
	const [pokes, setPokes] = useState("");
    const [currPoke, setCurrPoke] = useState("");
	useEffect(() => {
		const Pokedex = require("pokeapi-js-wrapper");
		const P = new Pokedex.Pokedex({
			cacheImages: true,
			timeout: 5000,
		});
		P.getPokemonByName([1, 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]).then((info) => {
			setPokes(info);
		});
	}, []);

	return (
		<div>
			<h1 className="text-center">NOT SHIT POKEDEX</h1>
			<div className="mx-auto container row">{pokes && pokes.map((poke) => {
				return (
					<PokeCard
						key={poke.id}
						number={poke.id}
						name={helpers.capitalize(pokeFuncs.getPokeName(poke))}
						sprite={pokeFuncs.getPokeSprite(
							poke,
							"iii",
							false,
							true,
							false
						)}
					/>
				);
			})}</div>}
			<PokeInfo></PokeInfo>
		</div>
	);
}
export default App;
