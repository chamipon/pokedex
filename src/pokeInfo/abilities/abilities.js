import InfoContainer from "/src/infoContainer/infoContainer.js"
import BodySection from "/src/pokeInfo/bodySection/bodySection";
import React, { useContext } from "react";
import SettingsContext from "/contexts/settings.js";
import * as pokeFuncs from "/src/pokeFuncs"
import * as helpers from "/src/helpers"
function Abilities(props) {
    const [settings] = useContext( SettingsContext );
	return (
		<>  
                <InfoContainer>
                    <h3>Abilities</h3>
                    <div className="gap flex-row flex-wrap">
                    {props.abilities.map((ability,i)=>(
                        <>
                            <BodySection
                                info={pokeFuncs.getAbilityEffect(ability.ability, settings.language)}
                                //info={pokeFuncs.getAbilityFlavText(ability.ability, settings.language, settings.versionGroup)}
                                header={helpers.deHyphenate(ability.ability.name)}
                                flexbasis={"45%"}
                            />
                        </>
                        
                        ))} 
                    </div>
                </InfoContainer>
            
		</>
	);
}
export default Abilities;
