import { useRouter } from "next/router";
import * as pokeFuncs from "../../src/pokeFuncs.js";
import { useContext, useEffect, useState } from 'react';
import DarkContext from "../../contexts/dark";


export default function Pokemon(props) {
    const [isDark] = useContext( DarkContext );


	return (
        <div id="scrollContainer" className={"scrollContainer " + (isDark && 'dark')}>
            {props.itemObj &&
                <div className={"mx-auto container row"}>
                    <h2 className="pokeTitle">
                        {props.itemObj.name}
                        <img src={props.itemObj.sprites.default}/>
                    </h2>
                    
                </div>
            }
        </div>
	);
}
// This function gets called at build time
export async function getStaticProps({ params }) {
    const Pokedex = require("pokeapi-js-wrapper")
    const P = new Pokedex.Pokedex()

    const itemObj = await P.getItemByName(params.name); //Get the Item object
	
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
    const Pokedex = require("pokeapi-js-wrapper")
    const P = new Pokedex.Pokedex()

    const itemList = await P.getItemsList();
	// Get the paths we want to pre-render based on posts
	const paths = itemList.results.map((item) => ({
		params: { name: item.name },
	}));
	// We'll pre-render only these paths at build time.
	// { fallback: blocking } will server-render pages
	// on-demand if the path doesn't exist.
	return { paths, fallback: "blocking" };
}
