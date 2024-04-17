import InfoContainer from "/src/infoContainer/infoContainer.js";
import BodySection from "/src/pokeInfo/bodySection/bodySection";
import React, { useContext } from "react";
import SettingsContext from "/contexts/settings.js";
import * as pokeFuncs from "/src/pokeFuncs";
import * as helpers from "/src/helpers";
import ItemList from "../itemList/itemList";
function Abilities(props) {
	const [settings] = useContext(SettingsContext);
	return (
		<>
			<InfoContainer>
				<h2 className="h3">Abilities</h2>
				<ItemList className="gap">
					{props.abilities.map((ability) => {
						return (
							<ItemList.ButtonItem
								title={helpers.deHyphenate(ability.ability.name)}
								body={pokeFuncs.getAbilityFlavText(
									ability.ability,
									settings.language
								)}
								aside={ability.is_hidden ? "Hidden Ability" : ""}
								item={ability}
								onclick={props.AbilityClick}
							/>
						);
					})}
				</ItemList>
			</InfoContainer>
		</>
	);
}
export default Abilities;
