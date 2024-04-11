// import styles from "./evoChain.module.css";
import React, { useState, useEffect } from "react";
import FlavourText from "./flavourText/flavourText";
import InfoContainer from "../../infoContainer/infoContainer";
import Gender from "../gender/gender";
import BodySection from "../bodySection/bodySection";
import * as pokeFuncs from "../../../src/pokeFuncs.js";
function SpeciesInfo(props) {
	useEffect(() => {
	}, []);
	return (
        <InfoContainer>
            <>
                <div className="gap flex-md-row">
                    <FlavourText species={props.species}/>
                    <Gender species={props.species}/>
                </div>
                <div className="gap flex-row flex-wrap">
                    
                        <BodySection
                            info={props.poke.height / 10 + "m"}
                            header={"Height"}
                            flexbasis={"45%"}
                        />
                        <BodySection
                            info={props.poke.weight / 10 + "kg"}
                            header={"Weight"}
                            flexbasis={"45%"}
                        />

                        <BodySection
                            info={props.species.capture_rate}
                            header={"Catch Rate"}
                            flexbasis={"45%"}
                        />
                        <BodySection
                            info={pokeFuncs.getPokeEggSteps(props.species)}
                            header={"Egg Steps"}
                            flexbasis={"45%"}
                        />
                   
                </div>
            </>
        </InfoContainer>
	);
}

export default SpeciesInfo;
