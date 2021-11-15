import React, { useState, useEffect } from "react";
import * as pokeFuncs from "../../pokeFuncs.js";
import BodySection from "./../bodySection/bodySection";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
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
								<span className="me-2 text-nowrap"><FontAwesomeIcon title="Male Chance" icon={solid('mars')} size="sm"/> {gender.mChance + "%"}</span>
								<span className="text-nowrap"><FontAwesomeIcon title="Female Chance" icon={solid('venus')} /> {gender.fChance + "%"}</span>
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
