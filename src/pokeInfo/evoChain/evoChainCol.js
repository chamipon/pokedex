import * as helpers from "./../../helpers.js";
import EvoChainArrow from "./evoChainArrow";
import Link from 'next/link'
import OfficialArtContext from "../../../contexts/officialArt.js";
import ShinyContext from "../../../contexts/shiny.js";
import { useContext } from 'react';
import styles from "./evoChain.module.css";
function EvoChainCol(props) {
    const [isShiny] = useContext( ShinyContext );
    const [isOfficialArt] = useContext( OfficialArtContext );
	return (
		<div className={styles.evoChainCol}>
			{props.stageChain &&
				props.stageChain.map((poke, i) => (
					<div className="d-flex flex-md-row flex-column m-1">
						<div className="d-flex m-auto">
							{poke && (
								<EvoChainArrow
									evoDetails={poke.evoDetails[0]} //TODO: Handle all of the evo details, not just the first.
								/>
							)}
						</div>
						<div key={"sprite" + i} className={styles.evoColImg}>
							{poke && (
								<Link href={"/pokedex/" + poke.name}>
                                    <a>
                                        <img
                                            title={"#" + poke.id + " " + helpers.capitalize(poke.name)}
                                            alt={helpers.capitalize(poke.name)}
                                            src = {(isOfficialArt 
                                                ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+poke.id+".png"
                                                : (isShiny 
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
