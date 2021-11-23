import React, { useState, useEffect, useContext } from "react";
import SettingsContext from "../../../contexts/settings.js";
import * as pokeFuncs from "../../pokeFuncs.js";
function Genus(props) {
    const [genus, setGenus] = useState("")
    const [settings] = useContext( SettingsContext );
    useEffect(() => {
	    if(props.species){
            setGenus(pokeFuncs.getPokeGenus(props.species, settings.language))
        }
    }, [props.species, settings.language]);
    return (
        <div className="genus">
            {genus}
        </div>
	);
}
export default Genus;
