import PokeCard from "./pokeCard/pokeCard";
import Navbar from "./navbar/navbar";
import {forceCheck} from 'react-lazyload';
import React, { useState, useEffect } from "react";
import InfiniteScroll  from "react-infinite-scroll-component";
import * as helpers from "./helpers.js";
import * as pokeFuncs from "./pokeFuncs.js";
function App(props) {
	const [pokes, setPokes] = useState(""); // Master list of every pokemon. Only contains name and url to species, fully populated at the start
	const [renderPokes, setRenderPokes] = useState(""); //List used to render the pokecard objects. Modified by search, filter, infinite scroll, etc..
	const [renderedAmount, setRenderedAmount] = useState(0) // The amount of pokeCards we are currently rendering. Increases as the user scrolls down. 
    
	const [colCount, setColCount] = useState(1) //The number of columns being displayed
	const [hasMore, setHasMore] = useState(true) // Tells the infinite scroll component whether there is more info to add.
	
	useEffect(() => {
		var cols = helpers.getColCount()
		setColCount(cols)
		window.addEventListener('resize', () => { //Keep track of how many columns there are
			setColCount(helpers.getColCount())
			forceCheck()
		}) 
	}, []);

	useEffect(() => { //When searchparams is updated, force the lazy loaders to check if they should load.
		setPokes(props.pokeList.results)
		setRenderPokes(props.pokeList.results.slice(0, 20 * colCount))
		setRenderedAmount(20 * colCount);
	}, [props.pokeList, colCount]);

	useEffect(() => { //When searchparams is updated, force the lazy loaders to check if they should load.
		forceCheck()
		if(pokes)setRenderPokes(pokes.filter(el => el.name.includes(props.searchParams.toLowerCase()) || (el.url.split('/')[6]).toString().startsWith(props.searchParams)).slice(0, renderedAmount))
	}, [props.searchParams, renderedAmount, pokes]);
	return (

			<div id="scrollContainer" className={"scrollContainer "}>	
				<h1 className="text-center">Ultradex</h1>
				<div id="PokeGrid" className="mx-auto container row">
				<InfiniteScroll
							className="row"
							dataLength={renderedAmount} // The length of the data that is CURRENTLY loaded. Not the length of all of the data available.
							next={() => { //The function that is called when we reach the bottom of the scroll
								var temp = renderedAmount + 20 * colCount; //Add 20 more rows of pokemon
								if (temp >= pokes.length){ // Once we've reached all of the pokemon, stop loading more
									temp = pokes.length;
									setHasMore(false)
								}
								setRenderedAmount(temp);
							}}
							hasMore={hasMore} //If there is more info to load
							loader={""} //Don't display a loader
							scrollableTarget="scrollContainer" //The element that is scrolling
						>
						
					{renderPokes && renderPokes.map((poke,i) => (				
						
					<PokeCard
						key={poke.name + i}
						number={poke.url.split('/')[6]}
						name={poke.name}
                        displayName={pokeFuncs.getPokeName(poke)}
						isShiny={props.isShiny}
					/>
					))}
				{(renderPokes.length === 0  && pokes) && <span className="text-center">No matches found!</span>}
				</InfiniteScroll>
				</div>
			</div>

	);
}
export default App;
