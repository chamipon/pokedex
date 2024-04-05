import PokeCard from "../src/pokeCard/pokeCard";
import SearchButton from "../src/searchButton/searchButton";
import React, { useState, useEffect, useContext, useRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import * as helpers from "../src/helpers.js";
import * as pokeFuncs from "../src/pokeFuncs.js";
import SettingsContext from "../contexts/settings";

function Pokedex(props) {
	const [pokes, setPokes] = useState(""); // Master list of every pokemon. Only contains name and url to species, fully populated at the start
	const [renderPokes, setRenderPokes] = useState(""); //List used to render the pokecard objects. Modified by search, filter, etc..
	const [colCount, setColCount] = useState(1); //The number of columns being displayed
    const [settings] = useContext(SettingsContext);
	const gridRef = useRef();
	const GUTTER_SIZE = 24;

	useEffect(() => {
		// Called on page load, keep track of how many columns are being displayed
		var cols = helpers.getColCount();
		setColCount(cols);
		window.addEventListener("resize", () => {
			setColCount(helpers.getColCount());
		});
	}, []);

	useEffect(() => {
        //Once we have our list of pokes, assign it to our states
		setPokes(props.pokeList.results);
		setRenderPokes(props.pokeList.results); 
	}, [props.pokeList]);

	useEffect(() => {
		//When searchparams are updated, filter the list of pokemon, and assign the filtered list to the renderPokes state
		if (pokes) {
			setRenderPokes(
				pokes.filter(
					(el) =>
						el.name.includes(props.searchParams.toLowerCase()) ||
						pokeFuncs.getPokeNumberBySpeciesUrl(el.url).includes(props.searchParams)		
				)
			);
		}
	}, [props.searchParams, pokes]);

	useEffect(() => { //Use the targetPoke state to scroll to where we were in the list of pokes
		if(gridRef.current && renderPokes){
            //Use the poke's name to find its position in the render pokes list.
            //This allows us to still accurately scroll even when searched/filtered
            let listposition = renderPokes.findIndex(x => x.name == props.targetPoke.toLowerCase());
            gridRef.current.scrollToItem({
				align: "center",
				columnIndex: 0,
				rowIndex: listposition/colCount,
			});
        }
			
	}, [gridRef.current, props.targetPoke, renderPokes]);
    
    const Cell = ({ columnIndex, rowIndex, style }) => {
		let i = columnIndex + colCount * rowIndex; //Calculate the index based on columns and rows
		if (renderPokes[i]) {
			return (
				<PokeCard
					key={renderPokes[i].name}
					number={renderPokes[i].url.split("/")[6]}
					name={renderPokes[i].name}
					displayName={pokeFuncs.getPokeName(renderPokes[i])}
					style={{
						...style,
						left: style.left + GUTTER_SIZE,
						top: style.top + GUTTER_SIZE,
						width: style.width - GUTTER_SIZE,
						height: style.height - GUTTER_SIZE,
					}}
				/>
			);
		} else {
			return <></>;
		}
	};
	
	return (
		<>
			<h1 className="sr-only">Ultradex</h1>
			<div id="PokeGrid">
				<AutoSizer className="autosizer">
					{({ height, width }) => (
						<Grid
							ref={gridRef}
							className="grid"
							height={height}
							width={width}
							columnCount={colCount}
							rowCount={renderPokes.length / colCount + 1} // +1 rounds the number up
							rowHeight={133}
							columnWidth={(width - 2 * GUTTER_SIZE) / colCount}
						>
							{Cell}
						</Grid>
					)}
				</AutoSizer>
			</div>
			<SearchButton
				searchParams={props.searchParams}
				setSearchParams={props.setSearchParams}
			></SearchButton>
		</>
	);
}

export async function getStaticProps(context) {
	var pokeList = await fetch(
		`https://pokeapi.co/api/v2/pokemon-species/?limit=2000`
	);
	pokeList = await pokeList.json();

	if (!pokeList) {
		return {
			notFound: true,
		};
	}
	return {
		props: { pokeList }, // will be passed to the page component as props
	};
}
export default Pokedex;
