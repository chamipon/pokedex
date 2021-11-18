import React, { useState, useEffect } from "react";
import * as pokeFuncs from "../../pokeFuncs.js";
import BodySection from "./../bodySection/bodySection";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import styles from "./gender.module.css";
function Gender(props) {
	const [gender, setGender] = useState(); //The evolution chain for the pokemon.
    const [maleBarPercentage, setMaleBarPercentage] = useState(50) // A The percentage of the gender bar that will be rendered as male
	useEffect(() => {
		if (props.species){
            var genderRates = pokeFuncs.getPokeGenderRates(props.species)
            setGender(genderRates);
            if(genderRates.mChance > genderRates.fChance){ 
                if(genderRates.mChance == 100) setMaleBarPercentage(100)
                else setMaleBarPercentage(67);
            }
            else if(genderRates.mChance < genderRates.fChance){ 
                if(genderRates.mChance == 0) setMaleBarPercentage(0)
                else setMaleBarPercentage(33);
            }
            else setMaleBarPercentage(50)
        }
	}, [props.species]);
	return (
		<>
			{gender &&
				<BodySection info={(
					(gender !== -1 ? 
						(
							<>
                                <div className={"progress " + styles.progress}>
                                    {maleBarPercentage > 0 && <div className={"progress-bar"} style={{width:maleBarPercentage + "%"}} aria-valuenow={gender.mChance} aria-valuemin="0" aria-valuemax="100"> 
                                        <span><FontAwesomeIcon title="Male Chance" icon={solid('mars')}/> {gender.mChance + "%"}</span>
                                    </div>}
                                    {maleBarPercentage < 100 && 
                                        <div className={"progress-bar bg-danger"} style={{width:100-maleBarPercentage+"%"}} aria-valuenow={gender.fChance} aria-valuemin="0" aria-valuemax="100">
                                            <span><FontAwesomeIcon title="Female Chance" icon={solid('venus')} /> {gender.fChance + "%"}</span>
                                        </div>
                                    }
                                </div>
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
