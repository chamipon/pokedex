import { useRouter } from "next/router";
import EvoChain from "../../src/pokeInfo/evoChain/evoChain";
import Stats from "../../src/pokeInfo/stats/stats";
import Types from "../../src/pokeInfo/types/types";
import Gender from "../../src/pokeInfo/gender/gender";
import Genus from "../../src/pokeInfo/genus/genus";
import BodySection from "../../src/pokeInfo/bodySection/bodySection";
import * as helpers from "../../src/helpers.js";
import * as pokeFuncs from "../../src/pokeFuncs.js";
import { useContext } from 'react';
import ShinyContext from '../../contexts/shiny'
import DarkContext from "../../contexts/dark";


export default function Pokemon(props) {
	const router = useRouter();
	const { name } = router.query;
    const [isShiny] = useContext( ShinyContext );
    const [isDark] = useContext( DarkContext );
	return (
        <div style={{minHeight:'100vh'}} className={isDark && 'dark'}>
            <div className={"mx-auto container row"}>
                {/* TODO: Need to handle the different forms 			
                {props.pokeObjs.map((pokeObj, i) => ( 
                            <p>poke : {pokeObj.name}</p>
                        ))} */}

                <h2 className="pokeTitle">
                    #{props.specObj.id}{" "}
                    {props.pokeObjs[0].pokeObj &&
                        helpers.capitalize(pokeFuncs.getPokeName(props.specObj))}
                </h2>
                <Genus species={props.specObj} />
                <Types poke={props.pokeObjs[0].pokeObj} />
                <EvoChain
                    key={props.key}
                    specObj={props.specObj}
                    pokeObj={props.pokeObjs[0].pokeObj}
                    pokeList={props.pokeList}
                    pokeListUpdater={props.pokeListUpdater}
                    evoObj={props.evoObj}
                    isShiny={isShiny}
                />
                <Stats poke={props.pokeObjs[0].pokeObj} />
                <div className="d-flex flex-row flex-wrap">
                    <BodySection
                        info={props.specObj.capture_rate}
                        header={"Catch Rate"}
                    />
                    <BodySection
                        info={props.pokeObjs[0].pokeObj.height / 10 + "m"}
                        header={"Height"}
                    />
                    <BodySection
                        info={props.pokeObjs[0].pokeObj.weight / 10 + "kg"}
                        header={"Weight"}
                    />
                    <BodySection
                        info={pokeFuncs.getPokeEggSteps(props.specObj)}
                        header={"Egg Steps"}
                    />
                    <Gender species={props.specObj} />
                </div>
            </div>
        </div>
	);
}
// This function gets called at build time
export async function getStaticProps({ params }) {
	const specRes = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + params.name); //Get the pokemon species object
	var specObj = await specRes.json();

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
	const res = await fetch(
		`https://pokeapi.co/api/v2/pokemon-species?&limit=898`
	);
	var pokeList = await res.json();
	// Get the paths we want to pre-render based on posts
	const paths = pokeList.results.map((poke) => ({
		params: { name: poke.name },
	}));
	// We'll pre-render only these paths at build time.
	// { fallback: blocking } will server-render pages
	// on-demand if the path doesn't exist.
	return { paths, fallback: "blocking" };
}
