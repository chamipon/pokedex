import ItemCard from "../src/itemCard/itemCard";
import {forceCheck} from 'react-lazyload';
import React, { useState, useEffect, useContext } from "react";
import InfiniteScroll  from "react-infinite-scroll-component";
import * as helpers from "../src/helpers.js";
import DarkContext from "../contexts/dark";
function Itemdex(props) {
	const [items, setItems] = useState(""); // Master list of every pokemon. Only contains name and url to species, fully populated at the start
	const [renderItems, setRenderItems] = useState(""); //List used to render the pokecard objects. Modified by search, filter, infinite scroll, etc..
	const [renderedAmount, setRenderedAmount] = useState(0) // The amount of pokeCards we are currently rendering. Increases as the user scrolls down. 
    
	const [colCount, setColCount] = useState(1) //The number of columns being displayed
	const [hasMore, setHasMore] = useState(true) // Tells the infinite scroll component whether there is more info to add.
	const [isDark] = useContext( DarkContext );
	useEffect(() => {
		var cols = helpers.getColCount()
		setColCount(cols)
		window.addEventListener('resize', () => { //Keep track of how many columns there are
			setColCount(helpers.getColCount())
			forceCheck()
		}) 
	}, []);

	useEffect(() => { //When searchparams is updated, force the lazy loaders to check if they should load.
		setItems(props.itemList.results)
		setRenderItems(props.itemList.results.slice(0, 20 * colCount))
		setRenderedAmount(20 * colCount);
	}, [props.itemList, colCount]);

	useEffect(() => { //When searchparams is updated, force the lazy loaders to check if they should load.
		forceCheck()
		if(items)setRenderItems(items.filter(el => el.name.includes(props.searchParams.toLowerCase()) || (el.url.split('/')[6]).toString().startsWith(props.searchParams)).slice(0, renderedAmount))
	}, [props.searchParams, renderedAmount, items]);
	return (

			<div id="scrollContainer" className={"scrollContainer " + (isDark && " dark")}>	
				<div id="PokeGrid" className="mx-auto container row">
				<InfiniteScroll
							className="row"
							dataLength={renderedAmount} // The length of the data that is CURRENTLY loaded. Not the length of all of the data available.
							next={() => { //The function that is called when we reach the bottom of the scroll
								var temp = renderedAmount + 20 * colCount; //Add 20 more rows of pokemon
								if (temp >= items.length){ // Once we've reached all of the pokemon, stop loading more
									temp = items.length;
									setHasMore(false)
								}
								setRenderedAmount(temp);
							}}
							hasMore={hasMore} //If there is more info to load
							loader={""} //Don't display a loader
							scrollableTarget="scrollContainer" //The element that is scrolling
						>
						
					{renderItems && renderItems.map((item,i) => (				
						<>
                            <ItemCard 
                                name={item.name}
                                displayName={helpers.deHyphenate(item.name)}
                            />
                        </>
					))}
				{(renderItems.length === 0  && items) && <span className="text-center">No matches found!</span>}
				</InfiniteScroll>
				</div>
			</div>

	);
}
export default Itemdex;

export async function getStaticProps(context) {
    const Pokedex = require("pokeapi-js-wrapper")
    const P = new Pokedex.Pokedex()

    const itemList = await P.getItemsList();

    if (!itemList) {
      return {
      notFound: true,
      }
    }
    return {
      props: { itemList }, // will be passed to the page component as props
    }
  }
