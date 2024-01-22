import React, { useState, useEffect } from "react";
import * as pokeFuncs from "../../pokeFuncs.js";
import styles from "./stats.module.scss";
import StatBar from "./statbar.js";
import InfoContainer from "../../infoContainer/infoContainer.js";
function Stats(props) {
    const [stats, setStats] = useState(); //The evolution chain for the pokemon.
    const [displayMax, setDisplayMax] = useState(false); //The evolution chain for the pokemon.
    useEffect(() => {
        var _stats = pokeFuncs.getPokeBaseStats(props.poke)
        if (!displayMax) setStats(_stats);
        else{setStats(pokeFuncs.getPokeMaxStats(props.poke))
        } 
	}, [props.poke, displayMax]);
	return ( 
            <InfoContainer> 
                <h3>Stats</h3>
                {stats && 
                    <div className="stats d-flex flex-column">    
                        <StatBar stat={stats.hp} statRatio={stats.hp/stats.max.stat} label={"HP"} />
                        <StatBar stat={stats.attack} statRatio={stats.attack/stats.max.stat} label={"Atk"} /> 
                        <StatBar stat={stats.defense} statRatio={stats.defense/stats.max.stat} label={"Def"} /> 
                        <StatBar stat={stats["special-attack"]} statRatio={stats["special-attack"]/stats.max.stat} label={"Sp. Atk"} /> 
                        <StatBar stat={stats["special-defense"]} statRatio={stats["special-defense"]/stats.max.stat} label={"Sp. Def"} /> 
                        <StatBar stat={stats.speed} statRatio={stats.speed/stats.max.stat} label={"Spd"} />  
                    </div>  
                } 
                <div className="btn-group mt-2" role="group" aria-label="Basic example"> 
                    <input onClick={() => setDisplayMax(false)} type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked={!displayMax}/>
                    <label className="btn btn-outline-secondary" for="btnradio1">Base</label>

                    <input onClick={() => setDisplayMax(true)} type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" defaultChecked={displayMax}/>
                    <label className="btn btn-outline-secondary" for="btnradio2">Max</label>
                </div>
            </InfoContainer>
	);
}
export default Stats;
