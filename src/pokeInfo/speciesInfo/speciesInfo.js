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
            <div className="speciesInfo">
                <div className="d-flex flex-column flex-md-row">
                    <FlavourText species={props.species}/>
                    <Gender species={props.species}/>
                </div>
                <div className="d-flex flex-column flex-md-row ">
                    <div className="d-flex flex-row flex-fill">
                        <BodySection
                            info={props.poke.height / 10 + "m"}
                            header={"Height"}
                        />
                        <BodySection
                            info={props.poke.weight / 10 + "kg"}
                            header={"Weight"}
                        />
                    </div>
                    <div className="d-flex flex-row flex-fill">

                        <BodySection
                            info={props.species.capture_rate}
                            header={"Catch Rate"}
                        />
                        <BodySection
                            info={pokeFuncs.getPokeEggSteps(props.species)}
                            header={"Egg Steps"}
                        />
                    </div>
                </div>
            </div>
        </InfoContainer>
	);
}

export default SpeciesInfo;
