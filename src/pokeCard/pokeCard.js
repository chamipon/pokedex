import React, { useContext } from "react";
import * as helpers from "./../helpers.js";
import * as pokeFuncs from "./../pokeFuncs.js";
import SettingsContext from "../../contexts/settings.js";
import Link from "next/link";
import Image from "next/image";
import styles from "./pokeCard.module.scss";
function PokeCard(props) {
	const [settings] = useContext(SettingsContext);
	return (
		<div style={props.style} className={styles.pokeCard + ` card`}>
			{props.name && (
				<Link href={"/pokedex/" + props.name} role="button">
					<a className={styles.cardHeader + " card-header"}>
						<div className={styles.pokeSprite}>
							{settings.fetched && (
								<img
									src={pokeFuncs.buildPokeSpriteUrl(
										props.number,
										settings.useArt,
										settings.isShiny
									)}
									height={96}
									width={96}
									alt={helpers.capitalize(props.name) + " Sprite"}
									onError={({ currentTarget }) => {
										currentTarget.onerror = null; // prevents looping
										currentTarget.src = "/missingno.png";
									}}
								/>
							)}
						</div>

						<span className={"m-auto"}>
							#{props.number + " "}
							{props.displayName}
						</span>
					</a>
				</Link>
			)}
		</div>
	);
}

export default PokeCard;
