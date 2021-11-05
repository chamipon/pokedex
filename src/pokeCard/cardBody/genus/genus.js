import * as pokeFuncs from "../../../pokeFuncs.js";
function Genus(props) {
	return (
		<>
			{props.species && (
				<div className="genus">
					{pokeFuncs.getPokeGenus(props.species)}
				</div>
			)}
		</>
	);
}
export default Genus;
