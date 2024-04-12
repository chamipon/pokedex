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
				<div class="list-group list-group-flush">
					{props.setModalInfo && props.abilities.map((ability, i) => (
						<>
							<button
								class="list-group-item list-group-item-action "
								aria-current="true"
                                data-bs-toggle="modal" 
                                data-bs-target="#infoModal"
                                onClick={() => props.setModalInfo(ability)}
							>
								<div class="d-flex w-100 justify-content-between">
									<h5 class="mb-1">
										{helpers.deHyphenate(
											ability.ability.name
										)}
									</h5>
								</div>
								<p>
									{pokeFuncs.getAbilityFlavText(
										ability.ability,
										settings.language
									)}
								</p>
								{ability.is_hidden && (
									<small>Hidden Ability</small>
								)}
							</button>
						</>
					))}
				</div>
			</InfoContainer>
		</>
	);
}
export default Abilities;
