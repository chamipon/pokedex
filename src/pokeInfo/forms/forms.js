import { useContext } from "react";
import * as pokeFuncs from "../../../src/pokeFuncs.js";
import SettingsContext from "../../../contexts/settings.js";
import InfoContainer from "../../infoContainer/infoContainer"
import SpriteContainer from "/src/spriteContainer/spriteContainer"
function Forms(props) {
	const [settings] = useContext(SettingsContext);
	return (
		<>  
            {props.forms.length > 1 &&
                <InfoContainer>
                    <h2 className="h3">Forms</h2>
                    <div className="d-flex flex-row flex-wrap gap justify-content-center">
                        {props.forms.map((form,i)=>(
                            <SpriteContainer  
                                key={"sprite " + form.pokemon.name}  
                                pokeId={pokeFuncs.getPokeNumberBySpeciesUrl(form.pokemon.url)}
                                pokeName={form.pokemon.name}
                            />
                        ))} 
                    </div>
                </InfoContainer>
            }
		</>
	);
}
export default Forms;
