import * as helpers from "../../helpers.js";
import * as pokeFuncs from "../../pokeFuncs";
import { useContext } from 'react';
import styles from "./forms.module.css";
import SettingsContext from "../../../contexts/settings.js";
function Forms(props) {
    const [settings] = useContext( SettingsContext );
	return (
		<>
			{props.currentForm && props.forms && (
                <div className="Forms d-flex flex-column align-items-center mb-2">
                    <div className={styles.imageContainer + " " + (settings.isDark && styles.dark)}>
                        <img 
                            className={styles.image}
                            src = {(settings.useArt 
                                ? props.currentForm.pokeObj.sprites.other["official-artwork"].front_default 
                                : (settings.isShiny 
                                    ? props.currentForm.pokeObj.sprites.other.home.front_shiny 
                                    : props.currentForm.pokeObj.sprites.other.home.front_default)
                                )}
                            alt={helpers.capitalize(props.currentForm.name) + " Sprite"}
                        />
                    </div>                        
                    {props.forms.length > 1 && <div className="d-flex flex-wrap flex-row mt-2">
                        {props.forms.map((poke) => 
                            <button className={styles.formButton + " " + (settings.isDark && styles.dark)} disabled={poke.name == props.currentForm.name ? true : false} onClick={() => props.setCurrentForm(poke)}><img src={pokeFuncs.getPokeIcon(poke)} /></button>
                        )}
                    </div>}
				</div>
			)}
		</>
	);
}
export default Forms;
