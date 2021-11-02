import React, { useState, useEffect } from "react";
import EvoChain from "./evoChain/evoChain";
function CardBody(props) {
	return (
		<div className="cardBody">            
            <EvoChain
						render={props.render}
						key={
							props.key
						}
						speciesUrl={props.speciesUrl}
						poke={props.poke}
						pokeList={props.pokeList}
						pokeListUpdater={props.pokeListUpdater}
						evoChainList={props.evoChainList}
						evoChainListUpdater={props.evoChainListUpdater}
						isShiny={props.isShiny}
					/>
		</div>
	);
}
export default CardBody;
