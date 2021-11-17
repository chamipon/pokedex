import { useRouter } from "next/router";
import EvoChain from "../../src/pokeInfo/evoChain/evoChain";
import Stats from "../../src/pokeInfo/stats/stats";
import Types from "../../src/pokeInfo/types/types";
import Gender from "../../src/pokeInfo/gender/gender";
import Genus from "../../src/pokeInfo/genus/genus";
import BodySection from "../../src/pokeInfo/bodySection/bodySection";
import Forms from "../../src/pokeInfo/forms/forms";
import * as helpers from "../../src/helpers.js";
import * as pokeFuncs from "../../src/pokeFuncs.js";
import { useContext, useEffect, useState } from 'react';
import ShinyContext from '../../contexts/shiny'
import DarkContext from "../../contexts/dark";


export default function Pokemon(props) {
	const router = useRouter();
	const { name } = router.query;
    const [isShiny] = useContext( ShinyContext );
    const [isDark] = useContext( DarkContext );

    const [currentForm, setCurrentForm] = useState();
    
    useEffect(() => {
        if(props.pokeObjs){
            console.log("here")
            setCurrentForm(props.pokeObjs.find(form => form.is_default == true))
        }
	}, [props.pokeObjs]);

	return (
        <div id="scrollContainer" className={"scrollContainer " + (isDark && 'dark')}>
            {currentForm &&
                <div className={"mx-auto container row"}>
                    <h2 className="pokeTitle">
                        #{props.specObj.id}{" "}
                        {currentForm.pokeObj &&
                            pokeFuncs.getPokeName(currentForm)}
                    </h2>
                    <Genus species={props.specObj} />
                    <Types poke={currentForm.pokeObj} />
                    <Forms defaultName={props.specObj.name} forms={props.pokeObjs} currentForm={currentForm} setCurrentForm={setCurrentForm}/>

                    <Stats poke={currentForm.pokeObj} />
                    <div className="d-flex flex-row flex-wrap">
                        <BodySection
                            info={props.specObj.capture_rate}
                            header={"Catch Rate"}
                        />
                        <BodySection
                            info={currentForm.pokeObj.height / 10 + "m"}
                            header={"Height"}
                        />
                        <BodySection
                            info={currentForm.pokeObj.weight / 10 + "kg"}
                            header={"Weight"}
                        />
                        <BodySection
                            info={pokeFuncs.getPokeEggSteps(props.specObj)}
                            header={"Egg Steps"}
                        />
                        <Gender species={props.specObj} />
                    </div>
                    <EvoChain
                        key={props.key}
                        specObj={props.specObj}
                        pokeObj={currentForm.pokeObj}
                        pokeList={props.pokeList}
                        pokeListUpdater={props.pokeListUpdater}
                        evoObj={props.evoObj}
                        isShiny={isShiny}
                    />
                </div>
            }
        </div>
	);
}
// This function gets called at build time
export async function getStaticProps({ params }) {
    const Pokedex = require("pokeapi-js-wrapper")
    const P = new Pokedex.Pokedex()

    const specObj = await P.getPokemonSpeciesByName(params.name); //Get the pokemon species object

	var pokeObjs = [];
	for (var form of specObj.varieties) {
		// Get the pokemon object for each form the pokemon species has
		var temp = await fetch(form.pokemon.url);
		var formPokeObj = await temp.json();

		pokeObjs.push({
			// Push each pokeObj to the array, with name and the default flag
			pokeObj: formPokeObj,
			name: form.pokemon.name,
			is_default: form.is_default,
		});
	}

    const evoRes = await fetch(specObj.evolution_chain.url)
    var evoObj = await evoRes.json()
	if (!pokeObjs) {
		return {
			notFound: true,
		};
	}
	return {
		props: { pokeObjs, specObj, evoObj }, // will be passed to the page component as props
	};
}

export async function getStaticPaths() {
    const Pokedex = require("pokeapi-js-wrapper")
    const P = new Pokedex.Pokedex()

    const pokeList = await P.getPokemonSpeciesList();
	// Get the paths we want to pre-render based on posts
	const paths = pokeList.results.map((poke) => ({
		params: { name: poke.name },
	}));
	// We'll pre-render only these paths at build time.
	// { fallback: blocking } will server-render pages
	// on-demand if the path doesn't exist.
	return { paths, fallback: "blocking" };
}
