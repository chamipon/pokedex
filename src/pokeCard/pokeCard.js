import "./pokeCard.css";
function PokeCard(props) {
	return (
		<div className="col-12 col-sm-6 col-lg-4">
			<div role="button" className="pokeCard w-100">
				<div className="pokeSprite">
					<img className="h-100" src={props.sprite} alt={props.name + "Sprite"} />
				</div>
				<span className="pokeName m-auto">#{props.number} {props.name}</span>
			</div>
		</div>
	);
}

export default PokeCard;
