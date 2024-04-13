import styles from "./itemList.module.scss";
function ItemListButtonItem(props) {
	return (
		<>
			<button
				className={
					styles.itemList__listItem +
					" list-group-item list-group-item-action"
				}
				data-bs-toggle="modal"
				data-bs-target="#infoModal"
				onClick={() => props.onclick(props.item)}
			>
				<div className="d-flex w-100 justify-content-between">
					<h5 className={styles.itemList__listItem__header}>
						{props.title}
					</h5>
					{props.aside && <small>{props.aside}</small>}
				</div>

				<p className="mb-0">{props.body}</p>
			</button>
		</>
	);
}
export default ItemListButtonItem;
