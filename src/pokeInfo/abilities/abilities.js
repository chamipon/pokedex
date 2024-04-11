import InfoContainer from "/src/infoContainer/infoContainer.js"
import React, { useContext } from "react";
import SettingsContext from "/contexts/settings.js";
import * as pokeFuncs from "/src/pokeFuncs"
function Abilities(props) {
    const [settings] = useContext( SettingsContext );
	return (
		<>  
                <InfoContainer>
                    <h3>Abilities</h3>
                    <div className="">
                    {props.abilities.map((ability,i)=>(
                        <>
                            <div>
                                {ability.ability.name}
                                <br></br>
                                {pokeFuncs.getAbilityFlavText(ability.ability, settings.language, settings.versionGroup)}
                            </div>
                        </>
                        
                        ))} 
                    </div>
                </InfoContainer>
            
		</>
	);
}
export default Abilities;
