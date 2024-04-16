import styles from "./itemList.module.scss";
import * as helpers from "/src/helpers";
import ItemListButtonItem from "./itemListButtonItem";
import ListGroup from "react-bootstrap/ListGroup";
function ItemList(props) {
	return (
		<>
			<ListGroup variant="flush" className={styles.itemList + " gap"}>
				{props.onclick &&
					props.items.map((item) => (
						<>
							<ItemListButtonItem
								title={helpers.deHyphenate(item.title)}
								body={item.body}
								aside={item.aside}
								onclick={props.onclick}
								item={item.item}
							/>
						</>
					))}
			</ListGroup>
		</>
	);
}
export default ItemList;
