import React, { useState, useEffect } from "react";
import * as pokeFuncs from "../../pokeFuncs.js";
import styles from "./stats.module.css";
import StatBar from "./statbar.js";
function Stats(props) {
    const [stats, setStats] = useState(); //The evolution chain for the pokemon.
    const [displayMax, setDisplayMax] = useState(false); //The evolution chain for the pokemon.
    useEffect(() => {
		setStats(pokeFuncs.getPokeBaseStats(props.poke));
	}, [props.poke]);
	return ( 
            <div className={styles.statsContainer}>  
                <h3>Stats</h3>
                {stats && 
                    <div className="stats d-flex flex-column">    
                        <StatBar stat={displayMax ? pokeFuncs.calcPokeMaxStat(stats.hp, true) : stats.hp} statRatio={stats.hp/stats.max.stat} label={"HP"} />
                        <StatBar stat={displayMax ? pokeFuncs.calcPokeMaxStat(stats.attack, false) :stats.attack} statRatio={stats.attack/stats.max.stat} label={"Atk"} /> 
                        <StatBar stat={displayMax ? pokeFuncs.calcPokeMaxStat(stats.defense, false) :stats.defense} statRatio={stats.defense/stats.max.stat} label={"Def"} /> 
                        <StatBar stat={displayMax ? pokeFuncs.calcPokeMaxStat(stats["special-attack"], false) :stats["special-attack"]} statRatio={stats["special-attack"]/stats.max.stat} label={"Sp. Atk"} /> 
                        <StatBar stat={displayMax ? pokeFuncs.calcPokeMaxStat(stats["special-defense"], false) :stats["special-defense"]} statRatio={stats["special-defense"]/stats.max.stat} label={"Sp. Def"} /> 
                        <StatBar stat={displayMax ? pokeFuncs.calcPokeMaxStat(stats.speed, false) :stats.speed} statRatio={stats.speed/stats.max.stat} label={"Spd"} />  
                    </div>  
                } 
                <div className="btn-group mt-2" role="group" aria-label="Basic example"> 
                    <input onClick={() => setDisplayMax(false)} type="radio" className="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked={!displayMax}/>
                    <label className="btn btn-outline-secondary" for="btnradio1">Base</label>

                    <input onClick={() => setDisplayMax(true)} type="radio" className="btn-check" name="btnradio" id="btnradio2" autocomplete="off" checked={displayMax}/>
                    <label className="btn btn-outline-secondary" for="btnradio2">Max</label>
                </div>
            </div>
	);
}
export default Stats;
