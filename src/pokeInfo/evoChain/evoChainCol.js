import * as helpers from "./../../helpers.js";
import * as pokeFuncs from "./../../pokeFuncs.js";
import EvoChainArrow from "./evoChainArrow";
import Link from 'next/link'
import { useContext } from 'react';
import styles from "./evoChain.module.scss";
import SettingsContext from "../../../contexts/settings.js";
import SpriteContainer from "../../spriteContainer/spriteContainer.js";
function EvoChainCol(props) {
    const [settings] = useContext( SettingsContext );
    
	return (
		<div className={styles.evoChainCol}>
			{props.stageChain &&
				props.stageChain.map((poke, i) => (
					<div key={"evochaincol" + i} className="d-flex flex-md-row flex-column gap">
						{poke.evoDetails[0] && 
                            <div className="d-flex m-auto">
                                <EvoChainArrow
                                    evoDetails={poke.evoDetails[0]} //TODO: Handle all of the evo details, not just the first.
                                />
                            </div>
                        }
                        <SpriteContainer
                            pokeId={poke.id}
                            pokeName={poke.name}
                        />
					</div>
				))}
		</div>
	);
}
export default EvoChainCol;
