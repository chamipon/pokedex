import React, { useState, useEffect, useContext } from "react";
import * as pokeFuncs from "/src/pokeFuncs"

function AbilityModalBody(props) {
    return (
        <>
            <p>
                Short Effect: {pokeFuncs.getAbilityEffect(props.ability.ability,"en")}
            </p>
            <p>
                Effect: {pokeFuncs.getAbilityEffect(props.ability.ability,"en",true)}
            </p>
            
        </>
	);
}

export default AbilityModalBody;
