import "./evoChainCol.css";
import React, { useState, useEffect } from "react";
import * as pokeFuncs from "../../../pokeFuncs.js";
import $ from "jquery";
function EvoChainCol(props) {
	return (
		<div className="evoChainCol">
            
			{props.chain && props.chain.map((poke, i) => (
					<div key={"sprite"+i} className="evoColImg">
                        {poke.poke.sprites && <img src={poke.poke.sprites.front_default} className="d-flex"/>}
                    </div>
				))}
		</div>
	);
}
export default EvoChainCol;
