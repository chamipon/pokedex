import * as helpers from "./../../helpers.js";
import * as pokeFuncs from "./../../pokeFuncs.js";
import EvoChainArrow from "./evoChainArrow";
import Link from 'next/link'
import { useContext } from 'react';
import styles from "./evoChain.module.scss";
import SettingsContext from "../../../contexts/settings.js";
function EvoChainCol(props) {
    const [settings] = useContext( SettingsContext );
    
	return (
		<div className={styles.evoChainCol}>
			{props.stageChain &&
				props.stageChain.map((poke, i) => (
					<div key={"evochaincol" + i} className="d-flex flex-md-row flex-column m-1">
						<div className="d-flex m-auto">
							{poke && (
								<EvoChainArrow
									evoDetails={poke.evoDetails[0]} //TODO: Handle all of the evo details, not just the first.
								/>
							)}
						</div>
						<div key={"sprite" + i} className={styles.evoColImg}>
							{poke && (
								<Link scroll={true} href={"/pokedex/" + poke.name}>
                                    <a>
                                        <img
                                            title={"#" + poke.id + " " + helpers.capitalize(poke.name)}
                                            alt={helpers.capitalize(poke.name)}
                                            src = {(settings.useArt 
                                                ? pokeFuncs.OFFICIAL_ART_BASE_URL +poke.id+".png"
                                                : (settings.isShiny 
                                                    ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/"+poke.id+".png" 
                                                    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+poke.id+".png")
                                                )}
                                            className="d-flex w-100"
                                        />
                                    </a>
                                </Link>

							)}
						</div>
					</div>
				))}
		</div>
	);
}
export default EvoChainCol;
