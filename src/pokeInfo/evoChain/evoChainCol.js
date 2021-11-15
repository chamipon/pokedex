import * as helpers from "./../../helpers.js";
import EvoChainArrow from "./evoChainArrow";
function EvoChainCol(props) {
	return (
		<div className="evoChainCol">
			{props.stageChain &&
				props.stageChain.map((poke, i) => (
					<div className="d-flex flex-md-row flex-column">
						<div className="d-flex m-auto">
							{poke && (
								<EvoChainArrow
									evoDetails={poke.evoDetails[0]} //TODO: Handle all of the evo details, not just the first.
								/>
							)}
						</div>
						<div key={"sprite" + i} className="evoColImg">
							{poke && (
								<img
									title={helpers.capitalize(poke.name)}
									alt={helpers.capitalize(poke.name)}
									src={props.isShiny ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/"+poke.id+".png" : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+poke.id+".png"}
									className="d-flex"
								/>
							)}
						</div>
					</div>
				))}
		</div>
	);
}
export default EvoChainCol;
