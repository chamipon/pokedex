import styles from "./itemList.module.scss";
import React from "react";
import { useContext, useEffect, useState } from "react";
import * as helpers from "/src/helpers";
import ItemListButtonItem from "./itemListButtonItem";
import ListGroup from "react-bootstrap/ListGroup";
function ItemList(props) {
	const [subComponents, setSubComponents] = useState(false); // Pokedex number of the poke we want to scroll to
	useEffect(() => {
		console.log("Children:");
		console.log(props.children);
		let subComponentList = Object.keys(ItemList);
		console.log(subComponentList);
		let _subComponents = subComponentList.map((key) => {
			return React.Children.map(props.children, (child) =>
				child.type.displayName === key ? child : null
			);
		});
		console.log("sub components set:");
		console.log(_subComponents);
		setSubComponents(_subComponents);
	}, [props.children]);

	return (
		<>
			{subComponents && <p>{subComponents.length}</p>}
			<ListGroup
				variant="flush"
				className={props.className}
				style={props.style}
			>
				{subComponents && subComponents.map((component) => component)}
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
SimpleItem.displayName = "SimpleItem";
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
ButtonItem.displayName = "ButtonItem";
ItemList.ButtonItem = ButtonItem;

export default ItemList;
