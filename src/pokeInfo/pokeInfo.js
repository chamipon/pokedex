import "./pokeInfo.css";
function PokeInfo(props) {
	return (
		<div className="modal" tabindex="-1">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{props.name}</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<p>Modal body text goes here.</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PokeInfo;
