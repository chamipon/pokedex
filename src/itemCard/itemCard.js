import React from "react";
import * as helpers from "./../helpers.js";
import LazyLoad from 'react-lazyload';
import Link from 'next/link'
import styles from "./itemCard.module.scss";
function ItemCard(props) {
	return (
		<div className="col-12 col-sm-6 col-lg-4">
			<div className={`card w-100 ` + styles.itemCard}>
				{props.name && (
					<Link href={"/itemdex/" + props.name} role="button" >
						<a className={"card-header " + styles.cardHeader}>
                            <LazyLoad className={styles.itemSprite} scrollContainer=".scrollContainer" offset={150} height={30} once >
                                <div class={styles.itemSprite}>
                                    <img 
                                        src={getItemSprite(props.name)}
                                        alt={helpers.capitalize(props.name) + "Sprite"}
                                    />
                                </div>
                            </LazyLoad>
                            <span className={"m-auto " + styles.cardTitle}>
                                 {props.displayName}
                            </span>
                        </a>
					</Link>
				)}
			</div>
		</div>
	);	
	
}
function getItemSprite(name){
    if (name.includes("data-card")) return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/data-card.png"
    if(name.match(/tm\d\d/) || name.includes("hm08")) return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png";
    else return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/"+name+".png"
}
export default ItemCard;
