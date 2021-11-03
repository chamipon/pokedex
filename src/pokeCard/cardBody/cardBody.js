import React, { useState, useEffect } from "react";
import EvoChain from "./evoChain/evoChain";
import Stats from "./stats/stats";
import Types from "./types/types";
import Gender from "./gender/gender";
import * as helpers from "../../helpers.js";
import * as pokeFuncs from "../../pokeFuncs.js";
function CardBody(props) {
	const [species, setSpecies] = useState(); //The evolution chain for the pokemon.
    useEffect(() => {
		async function fetchData() {
			if (props.render) {//Only call when the card body is being rendered
				const Pokedex = require("pokeapi-js-wrapper");
				const P = new Pokedex.Pokedex({
					cacheImages: true,
					timeout: 5000,
				});

				var spec = await P.resource(props.speciesUrl); //Get the pokemon species object
				setSpecies(spec);
			}
		}
        fetchData()
	}, [props.render]);
    return (           
        <div className="card-body">
            <h2>#{props.number}{" "}{props.poke && helpers.capitalize(pokeFuncs.getPokeName(props.poke))}</h2>
            {props.render && <>
                <Stats poke={props.poke}/>
                <Types poke={props.poke}/>
                <Gender species={species}/> 
                <EvoChain
                    key={props.key }
                    speciesUrl={props.speciesUrl}
                    poke={props.poke}
                    pokeList={props.pokeList}
                    pokeListUpdater={props.pokeListUpdater}
                    evoChainList={props.evoChainList}
                    evoChainListUpdater={props.evoChainListUpdater}
                    isShiny={props.isShiny}
                />
            </>}
        </div>
	);
}
export default CardBody;
