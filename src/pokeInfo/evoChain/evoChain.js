// import styles from "./evoChain.module.css";
import React, { useState, useEffect } from "react";
import EvoChainCol from "./evoChainCol";
import styles from "./evoChain.module.css";
function EvoChain(props) {
	const [evoChain, setEvoChain] = useState(); //The evolution chain for the pokemon.
	useEffect(() => {
		async function fetchData() {
			var chainArray = []; //Used to store the evo chain in a more useful way, has the evolution details and pokeObj. ex: [bulb, ivy, vena]
			getEvoChain(chainArray, props.evoObj.chain, 0);
            setEvoChain(chainArray);

		}
		fetchData();
	}, []);
	return (
        <>
		{(evoChain && evoChain.length>1) && <div className={styles.evoChain}>
			
				{evoChain.map((chain, i) => (
					<EvoChainCol
						isShiny={props.isShiny}
						key={"col" + i}
						stageChain={chain}
					/>
				))}
		</div>
        }
        </>
	);
	function getEvoChain(chainArray, chain, depth) {
		depth++; //Keep track of how deep in the evo tree we are
		for (var i = 0; i < chain.evolves_to.length; i++) {
			getEvoChain(chainArray, chain.evolves_to[i], depth); //For each poke at this depth
		}
		if (!chainArray[depth - 1]) chainArray[depth - 1] = []; //If this is the first poke at this depth
        chainArray[depth - 1].push({
			name: chain.species.name,
            id: chain.species.url.split("/")[6],
			evoDetails: chain.evolution_details
		}); //Add the species and evolution details to the correct depth in the array
	}
}

export default EvoChain;
