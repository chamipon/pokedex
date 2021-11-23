import React, { useState, useEffect, useContext } from "react";
import SettingsContext from "../../../../contexts/settings.js";
import * as pokeFuncs from "../../../pokeFuncs.js";
function FlavourText(props) {
	const [displayText, setDisplayText] = useState("")
    const [settings] = useContext( SettingsContext );
    useEffect(() => {
	    if(props.species){
            setDisplayText(pokeFuncs.getPokeFlavText(props.species, settings.language, settings.version))
        }
    }, []);
	return (
        <div class="flavourText">
            {displayText}
        </div>        
	);
}

export default FlavourText;
