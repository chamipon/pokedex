import React, { useState, useEffect } from "react";
import * as pokeFuncs from "./../../pokeFuncs.js";
import $ from "jquery";
import * as helpers from "./../../helpers.js";
import EvoChainArrow from "./evoChainArrow";
import PokeCard from "../pokeCard";
function EvoChainCol(props) {
	return (
		<div className="evoChainCol">            
			{props.chain && props.chain.map((poke, i) => (
				<div className="d-flex flex-md-row flex-column">
					<div className="d-flex m-auto">
						{poke.poke[0][poke.poke[0].length-1] && <EvoChainArrow evoDetails={poke.poke[0][poke.poke[0].length-1]}/>}
					</div>
					<div key={"sprite"+i} className="evoColImg">
						{poke.poke[1].sprites && <img title={helpers.capitalize(poke.poke[1].name)} alt={helpers.capitalize(poke.poke[1].name)} src={props.isShiny ? poke.poke[1].sprites.front_shiny : poke.poke[1].sprites.front_default} className="d-flex"/>}
					</div>
				</div>
			))}
		</div>
	);
}
export default EvoChainCol;
