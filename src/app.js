import PokeCard from "./pokeCard/pokeCard";
import Navbar from "./navbar/navbar";
import LazyLoad from 'react-lazyload';
import React, { useState, useEffect } from "react";
import "./app.css";
function App(props) {
	const [pokes, setPokes] = useState(""); // Master list of every pokemon. Only contains name and url to species, fully populated at the start
	const [pokeObjs, setPokeObjs] = useState([]) // All the pokemon objects that have been fetched. Populated as data is needed
	const [evoChainObjs, setEvoChainObjs] = useState([]) //All the evo chain objects that have been fetched. Populated as data is needed
	const [isDark, setIsDark] = useState(true); // The current theme of the app.
	const [selected, setSelected] = useState(""); // The pokemon that is currently selected.
	useEffect(() => {
		
		const Pokedex = require("pokeapi-js-wrapper");
		const P = new Pokedex.Pokedex({
			cacheImages: true,
			timeout: 10000,
		});
		P.getPokemonSpeciesList().then((info) =>{ //Pulls the name and url to species for every pokemon.
			setPokes(info.results)
		})
	}, []);

	return (
		<div id="modeContainer" className={isDark && "dark"}>
			<div className="scrollContainer">
				<h1 className="text-center">Ultradex</h1>
				<div id="PokeGrid" className="mx-auto container row">{pokes && pokes.map((poke,i) => (
						<LazyLoad className="col-12 col-sm-6 col-lg-4" scrollContainer=".scrollContainer" height={98} once >
							<PokeCard
								key={i}
								number={i+1}
								index={i}
								poke={poke}
								pokeList={pokeObjs}
								pokeListUpdater={setPokeObjs}
								evoChainList={evoChainObjs}
								evoChainListUpdater={setEvoChainObjs}
								selected={selected}
								setSelected={setSelected}
							/>
						</LazyLoad>

					)
				)}</div>
				<button className="btn btn-secondary mx-auto">Load More</button>
			</div>
			<Navbar isDark={isDark} setIsDark={setIsDark}/>
		</div>
	);
}
export default App;
