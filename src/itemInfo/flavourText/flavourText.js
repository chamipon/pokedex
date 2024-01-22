import React, { useState, useEffect, useContext } from "react";
import * as pokeFuncs from "../../pokeFuncs.js";
import SettingsContext from "../../../contexts/settings"
function FlavourText(props) {
	const [displayText, setDisplayText] = useState("")
    const [settings] = useContext( SettingsContext );
    useEffect(() => {
	    if(props.itemObj){
            setDisplayText(pokeFuncs.getItemFlavText(props.itemObj, settings.language, "all"))
        }
    }, [settings.language, props.itemObj]);
	return (
        <div className="flavourText">
            {displayText}
        </div>        
	);
}

export default FlavourText;
