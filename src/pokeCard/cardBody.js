import React, { useState, useEffect } from "react";
import EvoChain from "./evoChain/evoChain";
import Stats from "./stats/stats";
import * as helpers from "./../helpers.js";
import * as pokeFuncs from "./../pokeFuncs.js";
function CardBody(props) {
	return (           
        <div className="card-body">
            <h2>#{props.number}{" "}{props.poke && helpers.capitalize(pokeFuncs.getPokeName(props.poke))}</h2>
            <Stats poke={props.poke}/>
            <EvoChain
                render={props.render}
                key={props.key }
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
