import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as pokeFuncs from "./pokeFuncs.js";
import * as helpers from "./helpers.js";
import PokeCard from "./pokeCard/pokeCard";
import PokeInfo from "./pokeInfo/pokeInfo";

const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex({
	cacheImages: true,
	timeout: 5000,
});
console.log("test")
(async () => {
	const pokes = await P.getPokemonByName([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]);
	const pokeItems = pokes.map((poke) => {
    return (
			<PokeCard key={poke.id} number={poke.id} name={helpers.capitalize(pokeFuncs.getPokeName(poke))} sprite={pokeFuncs.getPokeSprite(poke, "iii",false,true,false)} />
		);
	});
	ReactDOM.render(
		<React.StrictMode>
			<h1 className="text-center">NOT SHIT POKEDEX</h1>
			<div className="mx-auto container row">{pokeItems}</div>
			<PokeInfo></PokeInfo>
		</React.StrictMode>,
		document.getElementById("root")
	);
})();
