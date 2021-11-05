import * as pokeFuncs from "../../../pokeFuncs.js";
function EggSteps(props) {
	return (
		<>
			{props.species && (
				<div className="eggSteps">
					{"Base Egg Steps: " +
						pokeFuncs.getPokeEggSteps(props.species)}
				</div>
			)}
		</>
	);
}
export default EggSteps;
