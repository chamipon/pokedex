import React, { useState, useEffect } from "react";
import * as pokeFuncs from "../../../pokeFuncs.js";
import * as helpers from "../../../helpers.js";
import "./types.css";
function Types(props) {
    const [types, setTypes] = useState(); //The evolution chain for the pokemon.
    useEffect(() => {
        if(props.poke) setTypes(pokeFuncs.getPokeTypes(props.poke));
	}, [props.poke]);
	return ( 
            <>
                {types && 
                    <div className="types">
                        <span className={"badge " + types[0]}>{helpers.capitalize(types[0])}</span>
                        {types[1] && <span className={"badge " + types[1]}>{helpers.capitalize(types[1])}</span>}
                    </div>
                } 
            </>
	);
}
export default Types;
