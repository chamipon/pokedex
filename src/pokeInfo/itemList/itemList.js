import styles from "./itemList.module.scss";
import React from "react";
import * as helpers from "/src/helpers";
import ItemListButtonItem from "./itemListButtonItem";
import ListGroup from "react-bootstrap/ListGroup";
function ItemList(props) {
	let subComponentList = Object.keys(ItemList);

	let subComponents = subComponentList.map((key) => {
		return React.Children.map(props.children, (child) =>
			child.type.name === key ? child : null
		);
	});
	return (
		<>
			<ListGroup
				variant="flush"
				className={props.className}
				style={props.style}
			>
				{subComponents.map((component) => component)}
			</ListGroup>
		</>
	);
}

const SimpleItem = (props) => (
	<ListGroup.Item
		className={styles.listItem + " " + styles.simple}
		action
		onClick={() => props.onclick(props.item)}
	>
		<p className="mb-0">{props.title}</p>
	</ListGroup.Item>
);
ItemList.SimpleItem = SimpleItem;
const ButtonItem = (props) => (
	<ItemListButtonItem
		title={props.title}
		body={props.body}
		aside={props.aside}
		onclick={props.onclick}
		item={props.item}
		key={props.title}
	/>
);
ItemList.ButtonItem = ButtonItem;

export default ItemList;
