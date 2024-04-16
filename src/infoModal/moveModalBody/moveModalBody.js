import React, { useState, useEffect, useContext } from "react";
import * as pokeFuncs from "/src/pokeFuncs";

function MoveModalBody(props) {
	return (
		<>
			<p>Power: {props.move.power}</p>
			<p>PP: {props.move.pp}</p>
			<p>Type: {props.move.type.name}</p>
			<p>
				Short Effect:
				{pokeFuncs.getMoveEffect(props.move, "en")}
			</p>
			<p>
				Effect:
				{pokeFuncs.getMoveEffect(props.move, "en", true)}
			</p>
		</>
	);
}

export default MoveModalBody;
