import React, { useContext } from "react";
import * as helpers from "./../helpers.js";
import SettingsContext from "../../contexts/settings.js";
import Link from 'next/link'
import Image from 'next/image';
import styles from "./pokeCard.module.scss"
function PokeCard(props) {
    const [settings] = useContext(SettingsContext)
	return (
		
			<div style={props.style} className={styles.pokeCard + ` card`}>
				{props.name && (
					<Link href={"/pokedex/" + props.name} role="button" >
						<a className={styles.cardHeader + ' card-header'}>
                            
                                <div className={styles.pokeSprite}>
                                    {settings.fetched && 
                                        <Image 
                                            src = {(settings.useArt 
                                                ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+props.number+".png"
                                                : (settings.isShiny 
                                                    ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/"+props.number+".png" 
                                                    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+props.number+".png")
                                                )}
                                            height={96}
                                            width={96}
                                            alt={helpers.capitalize(props.name) + "Sprite"}
                                        />}
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
