import InfoContainer from "/src/infoContainer/infoContainer.js";
import BodySection from "/src/pokeInfo/bodySection/bodySection";
import React, { useContext } from "react";
import SettingsContext from "/contexts/settings.js";
import * as pokeFuncs from "/src/pokeFuncs";
import * as helpers from "/src/helpers";
import ItemList from "../itemList/itemList";
function Moves(props) {
	const [settings] = useContext(SettingsContext);
	return (
		<>
			<InfoContainer>
				<h2 className="h3">Moves</h2>
				<ItemList style={{ "--gap": "2px" }} className="gap">
					{props.moves.map((move) => {
						return (
							<ItemList.SimpleItem
								title={helpers.deHyphenate(move.move.name)}
								item={move}
								onclick={props.MoveClick}
							/>
						);
					})}
				</ItemList>
			</InfoContainer>
		</>
	);
}
export default Moves;
