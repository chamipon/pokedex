import React, { useState, useEffect } from "react";
import * as pokeFuncs from "../../../pokeFuncs.js";
import "./gender.css";
import BodySection from "./../bodySection/bodySection";
function Gender(props) {
	const [gender, setGender] = useState(); //The evolution chain for the pokemon.
	useEffect(() => {
		if (props.species)
			setGender(pokeFuncs.getPokeGenderRates(props.species));
	}, [props.species]);
	return (
		<>
			{gender &&
				<BodySection info={(
					(gender !== -1 ? 
						(
							<>
								<span className="me-2 text-nowrap"><span title="Male Chance" class="fas fa-mars"></span> {gender.mChance + "%"}</span>
								<span className="text-nowrap"><span title="Female Chance" class="fas fa-venus"></span> {gender.fChance + "%"}</span>
							</>
						)
						:
						(
							"Genderless"
						)
					)
				)} header={"Gender Ratio"}/>
				
			}
		</>
	);
}
export default Gender;
