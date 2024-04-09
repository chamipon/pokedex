import styles from "./spriteContainer.module.scss";
import Link from 'next/link'
import { useContext } from 'react';
import * as helpers from "/src/helpers.js";
import * as pokeFuncs from "/src/pokeFuncs.js";
import SettingsContext from "/contexts/settings.js";

function spriteContainer(props) {
    const [settings] = useContext( SettingsContext );
	return (
		<>
        {props.pokeName && props.pokeId && (
			<div key={"sprite" + props.pokeId} className={styles.spriteContainer}>
				
					<Link scroll={true} href={"/pokedex/" + props.pokeName}>
						<a>
							<img
								title={
									"#" +
									props.pokeId +
									" " +
									helpers.capitalize(props.pokeName)
								}
								alt={helpers.capitalize(props.pokeName)}
								src={
									settings.useArt
										? pokeFuncs.OFFICIAL_ART_BASE_URL +
										  props.pokeId +
										  ".png"
										: settings.isShiny
										? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" +
										  props.pokeId +
										  ".png"
										: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
										  props.pokeId +
										  ".png"
								}
								className="d-flex w-100"
							/>
						</a>
					</Link>
				
			</div>
            )}
		</>
	);
}
export default spriteContainer;
