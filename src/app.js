import PokeCard from "./pokeCard/pokeCard";
import Navbar from "./navbar/navbar";
import LazyLoad, {forceCheck} from 'react-lazyload';
import React, { useState, useEffect } from "react";
import "./app.css";
import InfiniteScroll  from "react-infinite-scroll-component";
import * as helpers from "./helpers.js";

function App() {
	const [pokes, setPokes] = useState(""); // Master list of every pokemon. Only contains name and url to species, fully populated at the start
	const [renderPokes, setRenderPokes] = useState(""); //List used to render the pokecard objects. Modified by search, filter, infinite scroll, etc..
	const [renderedAmount, setRenderedAmount] = useState(0)

	const [pokeObjs, setPokeObjs] = useState([]) // All the pokemon objects that have been fetched. Populated as data is needed
	const [evoChainObjs, setEvoChainObjs] = useState([]) //All the evo chain objects that have been fetched. Populated as data is needed
	const [isDark, setIsDark] = useState(true); // The current theme of the app.
	const [isShiny, setIsShiny] = useState(false);
	const [searchParams, setSearchParams] = useState("");
	const [selected, setSelected] = useState(""); // The pokemon that is currently selected.
	const [showInstall, setShowInstall] = useState(false)
	
	const [colCount, setColCount] = useState(1)
	const [hasMore, setHasMore] = useState(true)
	useEffect(() => {
		const Pokedex = require("pokeapi-js-wrapper");
		const P = new Pokedex.Pokedex({
			cacheImages: true,
			timeout: 10000,
		});
		var cols = 1;
		if(window.innerWidth >= 992) cols = 3;
		else if(window.innerWidth >= 576) cols = 2;
		setColCount(cols)
		P.getPokemonSpeciesList().then((info) =>{ //Pulls the name and url to species for every pokemon.
			setPokes(info.results)
			setRenderPokes(info.results.slice(0, 20 * cols))
			setRenderedAmount(20 * cols);
		})
		window.addEventListener('resize', () => {
			setColCount(helpers.getColCount())
		}) 
	}, []);

	useEffect(() => { //When searchparams is updated, force the lazy loaders to check if they should load.
		forceCheck()
		if(pokes)setRenderPokes(pokes.filter(el => el.name.includes(searchParams) || (el.url.split('/')[6]).toString().startsWith(searchParams)).slice(0, renderedAmount))
	}, [searchParams, renderedAmount, pokes]);
	return (
		<div id="modeContainer" className={isDark && "dark"}>
			<div id="scrollContainer" className="scrollContainer">
				<h1 className="text-center">Ultradex {colCount}</h1>
				<div id="PokeGrid" className="mx-auto container row">
				<InfiniteScroll
							className="row"
							dataLength={renderedAmount} // The length of the data that is CURRENTLY loaded. Not the length of all of the data available.
							next={() => { //The function that is called when we reach the bottom of the scroll
								var temp = renderedAmount + 20 * colCount;
								if (temp >= 898){
									temp = 898;
									setHasMore(false)
								}
								setRenderedAmount(temp);
							}}
							hasMore={hasMore} //If there is more info to load
							loader={<h4>Loading...</h4>}
							scrollableTarget="scrollContainer" //The element that is scrolling
						>
					{renderPokes && renderPokes.map((poke,i) => (
						(poke.name.includes(searchParams) || (poke.url.split('/')[6]).toString().startsWith(searchParams)) &&					
						<LazyLoad className="cardlazy col-12 col-sm-6 col-lg-4" scrollContainer=".scrollContainer" offset={150} height={98} once >
							<PokeCard
								key={poke.name + i}
								number={poke.url.split('/')[6]}
								poke={poke}
								pokeList={pokeObjs}
								pokeListUpdater={setPokeObjs}
								evoChainList={evoChainObjs}
								evoChainListUpdater={setEvoChainObjs}
								selected={selected}
								setSelected={setSelected}
								isShiny={isShiny}
								colCount={colCount}
							/>
						</LazyLoad>)
				)}
				</InfiniteScroll>
				</div>
			</div>
			<Navbar showInstall={showInstall} setShowInstall={setShowInstall} isDark={isDark} setIsDark={setIsDark} isShiny={isShiny} setIsShiny={setIsShiny} setSearchParams={setSearchParams}/>
			<button id="installButton">Install</button>
		</div>
	);
}
export default App;
