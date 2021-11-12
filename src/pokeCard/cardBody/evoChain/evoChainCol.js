import * as helpers from "./../../../helpers.js";
import EvoChainArrow from "./evoChainArrow";
function EvoChainCol(props) {
	return (
		<div className="evoChainCol">            
			{props.chain && props.chain.map((poke, i) => (
				<div className="d-flex flex-md-row flex-column">
					<div className="d-flex m-auto">
						{poke && <EvoChainArrow evoDetails={poke.poke[0][poke.poke[0].length-1]}/>}
					</div>
					<div key={"sprite"+i} className="evoColImg">
						{poke.poke[1].sprites && <img title={helpers.capitalize(poke.poke[1].name)} alt={helpers.capitalize(poke.poke[1].name)} src={props.isShiny ? poke.poke[1].sprites.front_shiny : poke.poke[1].sprites.front_default} className="d-flex"/>}
					</div>
				</div>
			))}
		</div>
	);
}
export default EvoChainCol;
