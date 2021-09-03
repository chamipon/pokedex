import "./evoChain.css";
import React, { useState, useEffect } from "react";
import $ from "jquery";
import EvoChainCol from "./evoChainCol/evoChainCol";
function EvoChain(props) {
    function filterIt(arr, searchKey) {
        return arr.filter(function(obj) {
          return Object.keys(obj).some(function(key) {
            return obj[key].includes(searchKey);
          })
        });
      }
    useEffect(async () => {
        if(props.chain)
        {
            const Pokedex = require("pokeapi-js-wrapper");
            const P = new Pokedex.Pokedex({
                cacheImages: true,
                timeout: 5000,
            });
            var temp = await P.resource(props.chain)
            var chainArray = [];
            getEvoChain(chainArray,temp.chain,0)
            await Promise.all(chainArray.map(async(col,i) =>{
                await Promise.all(col.map(async (poke,j)=>{
                    var info = props.pokeList.find((obj) =>{
                        return obj.name === poke.poke.name
                    }) 
                    if(!info){
                        info = await P.getPokemonByName(poke.poke.name);
                        // props.pokeListUpdater(props.pokeList.push(info))
                    }
                    chainArray[i][j].poke = info
                }))
            }))
            setEvoChain(chainArray)
        }
	}, [props.chain]);
    const [evoChain, setEvoChain] = useState(); //The evolution chain for the pokemon.
    if(props.render)
        return (
            <div className="evoChain">
                {evoChain && evoChain.map((chain,i) => (
                        <EvoChainCol key={"col" + i} chain={chain}/>
                    )
                )}
            </div>
        );
    else return null;
    function getEvoChain(chainArray,chain,depth){
        depth++//Keep track of how deep in the evo tree we are
        for(var i=0; i < chain.evolves_to.length; i++){ //For each poke at this depth
            getEvoChain(chainArray,chain.evolves_to[i],depth) ; 
        } 

        if(!chainArray[depth -1]) chainArray[depth -1] = []; //If this is the first poke at this depth
        chainArray[depth-1].push({poke: chain.species, evoDetails: chain.evolution_details}) //Add the species and evolution details to the correct depth in the array
    }
}

export default EvoChain;
