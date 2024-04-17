import styles from "./itemList.module.scss";
import ListGroup from "react-bootstrap/ListGroup";
function ItemListButtonItem(props) {
	return (
		<>
			<ListGroup.Item
				action
				className={styles.listItem + " " + styles.complex}
				onClick={() => props.onclick(props.item)}
			>
				<div className="d-flex w-100 justify-content-between">
					<h5 className={styles.listItem__header}>{props.title}</h5>
					{props.aside && <small>{props.aside}</small>}
				</div>

				<p className="mb-0">{props.body}</p>
			</ListGroup.Item>
		</>
	);
}
export default ItemListButtonItem;
