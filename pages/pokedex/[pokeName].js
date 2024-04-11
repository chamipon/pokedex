import { useRouter } from "next/router";
import EvoChain from "/src/pokeInfo/evoChain/evoChain";
import Stats from "/src/pokeInfo/stats/stats";
import Types from "/src/pokeInfo/types/types";
import Forms from "/src/pokeInfo/forms/forms";
import Spotlight from "/src/pokeInfo/spotlight/spotlight";
import * as pokeFuncs from "/src/pokeFuncs.js";
import { useContext, useEffect } from "react";
import SpeciesInfo from "/src/pokeInfo/speciesInfo/speciesInfo";
import Abilities from "/src/pokeInfo/abilities/abilities";
import SettingsContext from "../../contexts/settings";
import { NextSeo } from "next-seo";

export default function Pokemon(props) {
	const router = useRouter();
	const [settings] = useContext(SettingsContext);
	useEffect(() => {
        console.log(props.abilitiesObj)
        //Store pspecies objects. set target poke.
        if(props.specObj){
            props.setTargetPoke(props.specObj.name);
        } 
	}, [props.specObj]);

	return (
		<>
			<NextSeo
				title={
					props.pokeObj && pokeFuncs.getPokeName(
					    props.pokeObj
					) + " - Ultradex"
				}
				description={pokeFuncs.getPokeFlavText(
					props.specObj,
					settings.language,
					settings.version
				)}
			/>
			<div>
				{props.pokeObj && (
					<div className={"mx-auto container row"}>
						<h1 className="pokeTitle">
							#{props.specObj.id}{" "}
							{props.pokeObj &&
								pokeFuncs.getPokeName(props.pokeObj)}
						</h1>
                        <div className="genus">
                            {pokeFuncs.getPokeGenus(props.specObj, settings.language)}
                        </div>
						<Types poke={props.pokeObj} />
						{settings.goLink && (
							<a
								title={
									(props.pokeObj &&
										pokeFuncs.getPokeName(props.pokeObj)) +
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

						<Spotlight
							currentForm={props.pokeObj}
						/>
                        {settings.showSpeciesInfo && 
						<SpeciesInfo
							poke={props.pokeObj}
							species={props.specObj}
						/>}
                        {settings.showStats &&
                            <Stats poke={props.pokeObj} />
                        }
						{settings.showEvoChain && 						
                        <EvoChain
							key={props.key}
							specObj={props.specObj}
							pokeObj={props.pokeObj}
							pokeList={props.pokeList}
							pokeListUpdater={props.pokeListUpdater}
							evoObj={props.evoObj}
							isShiny={settings.isShiny}
						/>}
                        <Forms
                            forms={props.specObj.varieties}
                        />
                        <Abilities
                            abilities={props.abilitiesObj}
                        />
					</div>
				)}
			</div>
		</>
	);
}
// This function gets called at build time
export async function getStaticProps({ params }) {

    //Pokemon object using url param
    var pokeObj = await fetch(`https://pokeapi.co/api/v2/pokemon/` + params.pokeName)
	pokeObj = await pokeObj.json()
    
    if (!pokeObj) {
		return {
			notFound: true,
		};
	}

    //Fetch the pokemon's species object
    var specObj = await fetch(pokeObj.species.url);
    specObj = await specObj.json()

    //If the species has an evolution chain, pull that info as well.
    var evoObj = null;
    if(specObj.evolution_chain != null){
        var evoObj = await fetch(specObj.evolution_chain.url)
        evoObj = await evoObj.json()
    }
    
    //Get ability info
    var abilitiesObj = [];
        for (var ability of pokeObj.abilities) {
		let temp = await fetch(ability.ability.url);
		temp = await temp.json();
        ability.ability = temp;
		abilitiesObj.push(
			ability
		);
	}    

	return {
		props: { pokeObj, specObj, evoObj, abilitiesObj }, // will be passed to the page component as props
	};
}

//This is called at build time
export async function getStaticPaths() {

	//Get the list of pokemon
	let pokeList = await fetch(`https://pokeapi.co/api/v2/pokemon/`)
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
