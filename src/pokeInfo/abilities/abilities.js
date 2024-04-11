import InfoContainer from "/src/infoContainer/infoContainer.js";
import BodySection from "/src/pokeInfo/bodySection/bodySection";
import React, { useContext } from "react";
import SettingsContext from "/contexts/settings.js";
import * as pokeFuncs from "/src/pokeFuncs";
import * as helpers from "/src/helpers";
function Abilities(props) {
	const [settings] = useContext(SettingsContext);
	return (
		<>
			<InfoContainer>
				<h2 className="h3">Abilities</h2>
				<div className="gap flex-row flex-wrap">
					{props.abilities.map((ability, i) => (
						<>
							<BodySection
								info={
									<>
										<p>
											{pokeFuncs.getAbilityFlavText(ability.ability,settings.language)}
										</p>
										<p className="mb-0">
                                        {pokeFuncs.getAbilityEffect(
												ability.ability,
												settings.language
											)}
                                        </p>
									</>
								}
								header={
                                    helpers.deHyphenate(ability.ability.name) + (ability.is_hidden ? " - Hidden" : "")
                                }
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
