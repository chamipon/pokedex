import React, { useState, useEffect } from "react";
import * as pokeFuncs from "../../pokeFuncs.js";
import "./stats.css";
function Stats(props) {
    const [stats, setStats] = useState(); //The evolution chain for the pokemon.
    useEffect(() => {
		setStats(pokeFuncs.getPokeBaseStats(props.poke));
	}, [props.poke]);
	return ( 
            <>
                {stats && 
                <div className="stats d-flex flex-column">    
                    <div className="row">
                        <div className="statsCell"></div>
                        <div className="statsCell">HP</div>
                        <div className="statsCell">Atk</div>
                        <div className="statsCell">Def</div>
                        <div className="statsCell">Sp. Def</div>
                        <div className="statsCell">Sp. Atk</div>
                        <div className="statsCell">Spd</div>
                    </div>
                    <div className="row">
                        <div className="statsCell w-100 w-sm-auto">Base</div>
                        <div className="statsCell">{stats.hp}</div>
                        <div className="statsCell">{stats.attack}</div>
                        <div className="statsCell">{stats.defense}</div>
                        <div className="statsCell">{stats["special-attack"]}</div>
                        <div className="statsCell">{stats["special-defense"]}</div>
                        <div className="statsCell">{stats.speed}</div>
                    </div>
                    <div className="row">
                        <div className="statsCell">Max</div>
                        <div className="statsCell">{pokeFuncs.calcPokeMaxStat(stats.hp, 255, 31, 100, 1.1, true)}</div>
                        <div className="statsCell">{pokeFuncs.calcPokeMaxStat(stats.attack, 255, 31, 100, 1.1, false)}</div>
                        <div className="statsCell">{pokeFuncs.calcPokeMaxStat(stats.defense, 255, 31, 100, 1.1, false)}</div>
                        <div className="statsCell">{pokeFuncs.calcPokeMaxStat(stats["special-attack"], 255, 31, 100, 1.1, false)}</div>
                        <div className="statsCell">{pokeFuncs.calcPokeMaxStat(stats["special-defense"], 255, 31, 100, 1.1, false)}</div>
                        <div className="statsCell">{pokeFuncs.calcPokeMaxStat(stats.speed, 255, 31, 100, 1.1, false)}</div>
                    </div>
                </div>
                } 
            </>
	);
}
export default Stats;
