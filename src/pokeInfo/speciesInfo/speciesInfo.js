// import styles from "./evoChain.module.css";
import React, { useState, useEffect } from "react";
import FlavourText from "./flavourText/flavourText";
function SpeciesInfo(props) {
	const [evoChain, setEvoChain] = useState(); //The evolution chain for the pokemon.
	useEffect(() => {
	}, []);
	return (
        <div className="speciesInfo">
            <FlavourText species={props.species}/>
        </div>
	);
}

export default SpeciesInfo;
