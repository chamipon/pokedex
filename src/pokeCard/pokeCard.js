import React, { useContext } from "react";
import * as helpers from "./../helpers.js";
import LazyLoad from 'react-lazyload';
import SettingsContext from "../../contexts/settings.js";
import Link from 'next/link'
import styles from "./pokeCard.module.scss"
function PokeCard(props) {
    const [settings] = useContext(SettingsContext)
	return (
		<div className="col-12 col-sm-6 col-lg-4">
			<div className={styles.pokeCard + ` card w-100`}>
				{props.name && (
					<Link href={"/pokedex/" + props.name} role="button" >
						<a className={styles.cardHeader + ' card-header'}>
                            <LazyLoad className={styles.spriteLazy} scrollContainer=".scrollContainer" offset={150} height={96} once >
                                <div className={styles.pokeSprite}>
                                    {settings.fetched && <img 
                                        src = {(settings.useArt 
                                            ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+props.number+".png"
                                            : (settings.isShiny 
                                                ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/"+props.number+".png" 
                                                : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+props.number+".png")
                                            )}
                                        alt={helpers.capitalize(props.name) + "Sprite"}
                                    />}
                                </div>
                            </LazyLoad>
                            <span className={"m-auto"}>
                                #{props.number + " "}
                                {props.displayName}
                            </span>
                        </a>
					</Link>
				)}
			</div>
		</div>
	);	
	
}

export default PokeCard;
