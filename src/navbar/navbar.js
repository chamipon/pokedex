import React, { useState, useEffect } from "react";
import $ from "jquery";
import Image from 'next/image'
import * as installable from "./../installable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import ultraPic from '../../public/ultraball.png'
import premierPic from '../../public/premier_ball.png'
import { useContext } from 'react';
import ShinyContext from '../../contexts/shiny'
import DarkContext from '../../contexts/dark'

function Navbar({setSearchParams, showInstall, setShowInstall}) {
	const [searchOpen, setSearchOpen] = useState(false)
    const [isShiny, toggleShiny] = useContext( ShinyContext );
    const [isDark, toggleDark] = useContext( DarkContext );
	useEffect(() => {
		installable.installableSetup(setShowInstall)
	},[setShowInstall])
	return (
		<nav className={"navbar fixed-bottom " + (isDark && 'dark')}>
			<div className="h-100 w-100 d-flex flex-row flex-md-column">
				<a style={{alignSelf:"center"}} href="/">
					<Image 
						width={40} layout="fixed" 
						height={40} 
						alt={isDark ? "ultra ball sprite" : "premier ball sprite"} src={isDark ? ultraPic : premierPic} 
					/>
				</a>
				
				<div className="d-flex flex-row">
					<button onClick={(e) => {setSearchOpen(!searchOpen); $("#searchbar").focus()}} className="navbaritem d-flex">
						{searchOpen ? <FontAwesomeIcon style={{marginLeft: "17px", marginRight:"17px" }} icon={regular('xmark')} size="xl"/> : <FontAwesomeIcon style={{marginLeft: "12px", marginRight:"12px" }} icon={solid('magnifying-glass')} size="xl"/> }
					</button>
					<input id="searchbar" onChange={(e) => {setSearchParams(e.target.value)}} className={(searchOpen ? '' : 'closed') + " form-control"} type="search" placeholder="Search" aria-label="Search" size="xl"/>
				</div>
				{/* <button className="navbaritem d-flex">
					<FontAwesomeIcon icon={solid('filter')} size="xl" />
				</button> */}
				<button onClick={toggleShiny} className="navbaritem d-flex mt-0 mt-md-auto">
					{<FontAwesomeIcon icon={isShiny ? solid('sparkles') : regular('sparkles')} size="xl"/>}
				</button>
				<button onClick={toggleDark} className="navbaritem d-flex">
					{<FontAwesomeIcon icon={isDark ? solid('moon') : solid('sun')} size="xl" />}
				</button>
				{showInstall && <button onClick={() => installable.installButtonClick(setShowInstall)} id="installButton" className="navbaritem d-flex">
					<FontAwesomeIcon icon={solid('download')} size="xl"/>
				</button>}
				{/* <button className="navbaritem d-flex">
					<span className="fas fa-user-circle fa-lg"/>
				</button>
				<button className="navbaritem d-flex">
					<span className="fas fa-mug-hot fa-lg"/>
				</button> */}
			</div>
		</nav>
	);
}

export default Navbar;
