import React, { useState, useEffect } from "react";
import * as pokeFuncs from "../../../pokeFuncs.js";
import "./gender.css";
function Gender(props) {
    const [gender, setGender] = useState(); //The evolution chain for the pokemon.
    useEffect(() => {
        if(props.species) setGender(pokeFuncs.getPokeGenderRates(props.species));
	}, [props.species]);
	return ( 
            <>
                {gender && 
                    (gender !== -1 ? <div className="gender">
                        {"Male: " + gender.mChance + "%"}
                        <br/>
                        {"Female: " + gender.fChance + "%"}    
                    </div>
                    :
                    <div>Genderless</div>)
                } 
            </>
	);
}
export default Gender;
