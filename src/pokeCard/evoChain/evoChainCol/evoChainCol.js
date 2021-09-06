import "./evoChainCol.css";
import React, { useState, useEffect } from "react";
import * as pokeFuncs from "../../../pokeFuncs.js";
import $ from "jquery";
import * as helpers from "../../../helpers.js";
function EvoChainCol(props) {
	const [evoChainCol, setEvoChainCol] = useState(); //The evolution chain for the pokemon.
	return (
		<div className="evoChainCol">            
			{props.chain && props.chain.map((poke, i) => (
				<div className="d-flex flex-row">
					<div className="d-flex m-auto">
							{/* {poke.poke[0][0].min_level && <span>Lv. {poke.poke[0][0].min_level}</span>} */}
							{poke.poke[0][0] && <span className="text-center evoArrow"> 
								<i className="fas fa-2x fa-long-arrow-alt-right"></i><br/>
								{}
							</span>}
						</div>
						<div key={"sprite"+i} className="evoColImg">
							{poke.poke[1].sprites && <img src={poke.poke[1].sprites.front_default} className="d-flex"/>}
						</div>
					</div>
				))}
		</div>
	);
	//Returns the relevant evolution details from the json data.
	function getEvoDetails(evoDetails){
		var deets=document.createElement("div");
		for(var key in evoDetails) {
			var value = evoDetails[key];
			if(value){
				switch(key){
					case "min_level":
						$(deets).add(<div>"Lv. " + value</div>)
						break;
					case "location":
						deets += value.name
						//fas fa-map-marker-alt
						break;
					case "item":
						$(deets).add(<span>value.name</span>)
						break;
					case "min_happiness":
						$(deets).add(<i className='fas fa-heart'></i>)
						$(deets).add(<span>value</span>)
						//fas fa-heart	
						break;
					case "min_affection": //Number of hearts in Poke Amie
						break;
					case "time_of_day":
						//far fa-clock
						deets += <i className='far fa-clock'></i> + value;
						break;
					case "trigger": //What event triggers the evolution
						//deets = <span>helpers.capitalize(value.name.replace("-"," ")) +"/"</span> + deets
						break;
					case "known_move":
						$(deets).add(value.name);
						break;
					default: 
						console.log("NOT HANDLED: " + key)
						console.log(value)
						break;
				}
			} 
		}
		console.log(deets)
		setEvoChainCol(deets);
	}
}
export default EvoChainCol;
