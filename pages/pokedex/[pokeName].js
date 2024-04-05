import { useRouter } from "next/router";
import EvoChain from "../../src/pokeInfo/evoChain/evoChain";
import Stats from "../../src/pokeInfo/stats/stats";
import Types from "../../src/pokeInfo/types/types";
import Genus from "../../src/pokeInfo/genus/genus";
import Forms from "../../src/pokeInfo/forms/forms";
import Head from "next/head";
import * as pokeFuncs from "../../src/pokeFuncs.js";
import { useContext, useEffect, useState } from "react";
import SpeciesInfo from "../../src/pokeInfo/speciesInfo/speciesInfo";
import SettingsContext from "../../contexts/settings";
import { NextSeo } from "next-seo";

export default function Pokemon(props) {
	const router = useRouter();
	const [settings] = useContext(SettingsContext);
	const [currentForm, setCurrentForm] = useState();
	const [defaultForm, setDefaultForm] = useState();
	useEffect(() => {
		//On page load, set the currently rendered form to the default form.
		if (props.pokeObjs) {
			let defaultform = props.pokeObjs.find(
				(form) => form.is_default == true
			);
			setDefaultForm(defaultform);
			setCurrentForm(defaultform);
		}
	}, [props.pokeObjs]);

	useEffect(() => {
		if (defaultForm) {
			//When we visit a pokemon's page, set the target poke state so we can scroll back to where we were
            //Use default form becuase the list page only lists default forms
			props.setTargetPoke(pokeFuncs.getPokeName(defaultForm));
		}
	}, [defaultForm]);
	return (
		<>
			<NextSeo
				title={
					pokeFuncs.getPokeName(
						props.pokeObjs.find((form) => form.is_default == true)
					) + " - Ultradex"
				}
				description={pokeFuncs.getPokeFlavText(
					props.specObj,
					settings.language,
					settings.version
				)}
			/>
			<div>
				{currentForm && (
					<div className={"mx-auto container row"}>
						<h1 className="pokeTitle">
							#{props.specObj.id}{" "}
							{currentForm.pokeObj &&
								pokeFuncs.getPokeName(currentForm)}
						</h1>
						<Genus species={props.specObj} />
						<Types poke={currentForm.pokeObj} />
						{settings.goLink && (
							<a
								title={
									(currentForm.pokeObj &&
										pokeFuncs.getPokeName(currentForm)) +
									" - Pokemon Go"
								}
								href={
									"https://gamepress.gg/pokemongo/pokemon/" +
									props.specObj.id
								}
							>
								<img
									alt="Pokemon Go Icon"
									className={"pokeGoLink mt-2"}
									width={56}
									src="/pokemon-go-light.png"
								/>
							</a>
						)}

						<Forms
							defaultName={props.specObj.name}
							forms={props.pokeObjs}
							currentForm={currentForm}
							setCurrentForm={setCurrentForm}
						/>
						<SpeciesInfo
							poke={currentForm.pokeObj}
							species={props.specObj}
						/>
						<Stats poke={currentForm.pokeObj} />
						<EvoChain
							key={props.key}
							specObj={props.specObj}
							pokeObj={currentForm.pokeObj}
							pokeList={props.pokeList}
							pokeListUpdater={props.pokeListUpdater}
							evoObj={props.evoObj}
							isShiny={settings.isShiny}
						/>
					</div>
				)}
			</div>
		</>
	);
}
// This function gets called at build time
export async function getStaticProps({ params }) {
    var specObj = await fetch(`https://pokeapi.co/api/v2/pokemon-species/` + params.pokeName)
	specObj = await specObj.json()
    
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

    var evoObj = null;
    if(specObj.evolution_chain != null){
        const evoRes = await fetch(specObj.evolution_chain.url)
        evoObj = await evoRes.json()
    }

	if (!pokeObjs) {
		return {
			notFound: true,
		};
	}
	return {
		props: { pokeObjs, specObj, evoObj }, // will be passed to the page component as props
	};
}

//This is called at build time
export async function getStaticPaths() {

	//Get the list of poke species
	let pokeList = await fetch(`https://pokeapi.co/api/v2/pokemon-species/`)
	pokeList = await pokeList.json()
	// Get the paths we want to pre-render
	const paths = pokeList.results.map((poke) => ({
		params: { pokeName: poke.name },
	}));
	// We'll pre-render only these paths at build time.
	// { fallback: blocking } will server-render pages
	// on-demand if the path doesn't exist.
	return { paths, fallback: "blocking" };
}
