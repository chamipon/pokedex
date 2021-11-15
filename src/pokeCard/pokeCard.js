import React from "react";
import * as helpers from "./../helpers.js";
import LazyLoad from 'react-lazyload';
import Image from 'next/image'

function PokeCard(props) {
	return (
		<div className="col-12 col-sm-6 col-lg-4">
			<div className={`pokeCard card w-100`}>
				{props.name && (
					<a href={"/pokemon/" + props.name} role="button" className={'card-header'}>
						<LazyLoad className={"spriteLazy"} scrollContainer=".scrollContainer" offset={150} height={96} once >
							<div class={"pokeSprite"}>
								<Image 
									width={96} 
									src={props.isShiny ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/"+props.number+".png" : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+props.number+".png"}
									layout="fixed" 
									height={96} 
									alt={helpers.capitalize(props.name) + "Sprite"}
								/>
							</div>
						</LazyLoad>
						<span className={"pokeTitle m-auto"}>
							#{props.number + " "}
							{helpers.capitalize(props.name)}
						</span>
					</a>
				)}
			</div>
		</div>
	);	
	
}

export default PokeCard;
