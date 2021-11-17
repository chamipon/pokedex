import * as helpers from "../../helpers.js";
import * as pokeFuncs from "../../pokeFuncs";
import { useContext, useEffect } from 'react';
import ShinyContext from '../../../contexts/shiny'
import DarkContext from '../../../contexts/dark'
import styles from "./forms.module.css";
function Forms(props) {
    const [isShiny] = useContext( ShinyContext );
    const [isDark] = useContext( DarkContext );
	return (
		<>
			{props.currentForm && props.forms && (
                <div className="Forms d-flex flex-column align-items-center">
                    <div className={styles.imageContainer + " " + (isDark && styles.dark)}>
                        <img 
                            className={styles.image}
                            src={isShiny ? props.currentForm.pokeObj.sprites.other.home.front_shiny : props.currentForm.pokeObj.sprites.other.home.front_default}
                            alt={helpers.capitalize(props.currentForm.name) + " Sprite"}
                        />
                    </div>                        
                    {props.forms.length > 1 && <div className="d-flex flex-wrap flex-row mt-2">
                        {props.forms.map((poke) => 
                            <button className={styles.formButton + " " + (isDark && styles.dark)} disabled={poke.name == props.currentForm.name ? true : false} onClick={() => props.setCurrentForm(poke)}><img src={pokeFuncs.getPokeIcon(poke)} /></button>
                        )}
                    </div>}
				</div>
			)}
		</>
	);
}
export default Forms;
