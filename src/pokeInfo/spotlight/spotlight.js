import * as helpers from "../../helpers.js";
import * as pokeFuncs from "../../pokeFuncs.js";
import { useContext } from "react";
import styles from "./spotlight.module.scss";
import SettingsContext from "../../../contexts/settings.js";
function Spotlight(props) {
	const [settings] = useContext(SettingsContext);
	return (
		<>
			{props.currentForm && (
				<div className="spotlight d-flex flex-column align-items-center my-2">
					<div className={styles.imageContainer}>
						{settings.fetched && (
							<img
								fetchPriority="high"
								className={styles.image}
								src={
									settings.useArt
										? props.currentForm.sprites.other[
												"official-artwork"
										  ].front_default
										: settings.isShiny
										? props.currentForm.sprites.other.home
												.front_shiny
										: props.currentForm.sprites.other.home
												.front_default
								}
								alt={
									helpers.capitalize(props.currentForm.name) +
									" Sprite"
								}
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
}
export default Spotlight;
