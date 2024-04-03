import PokeCard from "../src/pokeCard/pokeCard";
import SearchButton from "../src/searchButton/searchButton";
import { forceCheck } from "react-lazyload";
import React, { useState, useEffect, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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
	useEffect(() => {
		var cols = helpers.getColCount();
		setColCount(cols);
		window.addEventListener("resize", () => {
			//Keep track of how many columns there are
			setColCount(helpers.getColCount());
		});
	}, []);

	useEffect(() => {
		setPokes(props.pokeList.results);
		setRenderPokes(props.pokeList.results); //Every poke can be rendered by default
	}, [props.pokeList, colCount]);
        
	useEffect(() => {
		//When searchparams is updated, force the lazy loaders to check if they should load.
		if (pokes){
			setRenderPokes(
				pokes
					.filter(
						(el) =>
							el.name.includes(
								props.searchParams.toLowerCase()
							) ||
							el.url
								.split("/")[6]
								.toString()
								.startsWith(props.searchParams)
					)
					
			);
        }

	}, [props.searchParams, pokes]);
    const GUTTER_SIZE= 24;
	const Cell = ({ columnIndex, rowIndex, style }) => {
		let i = columnIndex + colCount * rowIndex; //Calculate the index based on columns and rows
        if(renderPokes[i]){
            return (
                <PokeCard
                    key={renderPokes[i].name}
                    number={renderPokes[i].url.split("/")[6]}
                    name={renderPokes[i].name}
                    displayName={pokeFuncs.getPokeName(
                        renderPokes[i]
                    )}
                    style={{
                        ...style,
                        left: style.left + GUTTER_SIZE,
                        top: style.top + GUTTER_SIZE,
                        width: style.width - GUTTER_SIZE,
                        height: style.height - GUTTER_SIZE,
                    }}
                />
            );
        }
        else{
            return <></>
        }

	};
	return (
		<div id="scrollContainer" className={"scrollContainer "}>
			<h1 className="sr-only">Ultradex</h1>
			<div id="PokeGrid" className="mx-auto container h-100 row">
				<AutoSizer>
					{({ height, width }) => (
						<Grid
							height={height}
							width={width}
							columnCount={colCount}
							rowCount={renderPokes.length / colCount}
							rowHeight={133}
							columnWidth={width / colCount}
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
		</div>
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
