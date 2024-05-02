import * as helpers from "../../src/helpers.js";
import { useContext, useEffect, useState } from "react";
import SettingsContext from "../../contexts/settings";
import FlavourText from "../../src/itemInfo/flavourText/flavourText.js";
import { NextSeo } from "next-seo";
import * as pokeFuncs from "../../src/pokeFuncs";
export default function Pokemon(props) {
	const [settings] = useContext(SettingsContext);
	return (
		<>
			<NextSeo
				title={helpers.deHyphenate(props.itemObj.name) + " - Ultradex"}
				description={pokeFuncs.getItemFlavText(
					props.itemObj,
					settings.language,
					"all"
				)}
			/>

			<div id="scrollContainer" className={"scrollContainer"}>
				{props.itemObj && (
					<div className={"mx-auto container"}>
						<h2 className="pokeTitle">
							{helpers.deHyphenate(props.itemObj.name)}
						</h2>
						<img
							style={{ width: "30px", height: "30px" }}
							alt={helpers.deHyphenate(props.itemObj.name) + " Sprite"}
							src={props.itemObj.sprites.default}
						/>
						<FlavourText itemObj={props.itemObj} />
					</div>
				)}
			</div>
		</>
	);
}
// This function gets called at build time
export async function getStaticProps({ params }) {
	var itemObj = await fetch(`https://pokeapi.co/api/v2/item/` + params.itemName);
	itemObj = await itemObj.json();

	if (!itemObj) {
		return {
			notFound: true,
		};
	}
	return {
		props: { itemObj }, // will be passed to the page component as props
	};
}

export async function getStaticPaths() {
	var itemList = await fetch(`https://pokeapi.co/api/v2/item/`);
	itemList = await itemList.json();

	// Get the paths we want to pre-render based on posts
	const paths = itemList.results.map((item) => ({
		params: { itemName: item.name },
	}));
	// We'll pre-render only these paths at build time.
	// { fallback: blocking } will server-render pages
	// on-demand if the path doesn't exist.
	return { paths, fallback: "blocking" };
}
