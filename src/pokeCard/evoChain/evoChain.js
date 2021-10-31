import "./evoChain.css";
import React, { useState, useEffect } from "react";
import EvoChainCol from "./evoChainCol";
import * as pokeFuncs from "./../../pokeFuncs.js";
function EvoChain(props) {
	useEffect(() => {
		async function fetchData() {
			if (props.render) {
				const Pokedex = require("pokeapi-js-wrapper");
				const P = new Pokedex.Pokedex({
					cacheImages: true,
					timeout: 5000,
				});
				var evoChainObj = await pokeFuncs.getEvoChainObjById(props.evoChainId,props.evoChainList,props.evoChainListUpdater,P); //Get the evo chain object
                var chainArray = []; //Used to store the evo chain in a more useful way, has the evolution details and pokeObj. ex: [bulb, ivy, vena]
				getEvoChain(chainArray, evoChainObj.chain, 0);
				await Promise.all(
					chainArray.map(async (col, i) => {
						await Promise.all(
							col.map(async (poke, j) => {
                                var info = await pokeFuncs.getPokeObjByName(poke.poke.name,props.pokeList,props.pokeListUpdater,P)
								chainArray[i][j].poke = [poke.evoDetails, info];
							})
						);
					})
				);
				setEvoChain({'id': props.evoChainId,'chain' : chainArray});
			}
		}
        fetchData()
	}, [props.render]);
	const [evoChain, setEvoChain] = useState(); //The evolution chain for the pokemon.
	if (props.render)
		return (
			<div className="evoChain">
				{evoChain &&
					evoChain.chain.map((chain, i) => (
						<EvoChainCol key={"col" + i} chain={chain} />
					))}
			</div>
		);
	else return null;
	function getEvoChain(chainArray, chain, depth) {
		depth++; //Keep track of how deep in the evo tree we are
		for (var i = 0; i < chain.evolves_to.length; i++) {
			//For each poke at this depth
			getEvoChain(chainArray, chain.evolves_to[i], depth);
		}

		if (!chainArray[depth - 1]) chainArray[depth - 1] = []; //If this is the first poke at this depth
		chainArray[depth - 1].push({
			poke: chain.species,
			evoDetails: chain.evolution_details,
		}); //Add the species and evolution details to the correct depth in the array
	}
}

export default EvoChain;
