import React from "react";
import * as helpers from "./../helpers.js";
import LazyLoad from 'react-lazyload';
import Link from 'next/link'
function ItemCard(props) {
	return (
		<div className="col-12 col-sm-6 col-lg-4">
			<div className={`pokeCard card w-100`}>
				{props.name && (
					<Link href={"/itemdex/" + props.name} role="button" >
						<a className={'card-header'}>
                            <LazyLoad className={"spriteLazy"} scrollContainer=".scrollContainer" offset={150} height={96} once >
                                <div class={"pokeSprite"}>
                                    <img 
                                        src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/"+props.name+".png"}
                                        alt={helpers.capitalize(props.name) + "Sprite"}
                                    />
                                </div>
                            </LazyLoad>
                            <span className={"pokeTitle m-auto"}>
                                 {props.displayName}
                            </span>
                        </a>
					</Link>
				)}
			</div>
		</div>
	);	
	
}

export default ItemCard;
