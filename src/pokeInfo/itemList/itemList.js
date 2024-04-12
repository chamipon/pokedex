import styles from "./itemList.module.scss";
import * as helpers from "/src/helpers";
import ItemListButtonItem from "./itemListButtonItem";
function ItemList(props) {
	return (
		<>
			<div className="list-group list-group-flush">
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
			</div>
		</>
	);
}
export default ItemList;
