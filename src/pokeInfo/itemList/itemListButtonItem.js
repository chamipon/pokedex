import styles from "./itemList.module.scss";
function ItemListButtonItem(props) {
	return (
		<>
			<button
				className="list-group-item list-group-item-action "
				data-bs-toggle="modal"
				data-bs-target="#infoModal"
				onClick={() => props.onclick(props.item)}
			>
				<div class="d-flex w-100 justify-content-between">
					<h5 class="mb-1">{props.title}</h5>
				</div>
				{props.body}

				{props.aside && <small>{props.aside}</small>}
			</button>
		</>
	);
}
export default ItemListButtonItem;
