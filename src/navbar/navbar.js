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
import OfficialArtContext from '../../contexts/officialArt'
import Link from 'next/link'
import SettingsContext from "../../contexts/settings";
function Navbar({setSearchParams, showInstall, setShowInstall}) {
	const [searchOpen, setSearchOpen] = useState(false)
    const [isShiny, toggleShiny] = useContext( ShinyContext );
    const [isDark, toggleDark] = useContext( DarkContext );
    const [isOfficialArt, toggleOfficialArt] = useContext( OfficialArtContext );
    const [settings] = useContext( SettingsContext );
	useEffect(() => {
		installable.installableSetup(setShowInstall)
	},[setShowInstall])
	return (
		<nav className={"navbar fixed-bottom " + (isDark && 'dark')}>
			<div className="h-100 w-100 d-flex flex-row flex-md-column">
				<div className="ms-md-auto me-auto d-flex">
                    <Link style={{alignSelf:"center", marginLeft: 'auto'}} href="/pokedex">
                        <a>
                            <Image 
                                width={40} layout="fixed" 
                                height={40} 
                                alt={isDark ? "ultra ball sprite" : "premier ball sprite"} src={isDark ? ultraPic : premierPic} 
                            />
                        </a>
                    </Link>
				</div>
				<div className="d-flex flex-row">
					<button onClick={(e) => {setSearchOpen(!searchOpen); $("#searchbar").focus()}} className="navbaritem d-flex">
						{searchOpen ? <FontAwesomeIcon style={{marginLeft: "14px", marginRight:"14px" }} icon={regular('xmark')} size="lg"/> : <FontAwesomeIcon style={{marginLeft: "12px", marginRight:"12px" }} icon={solid('magnifying-glass')} size="lg"/> }
					</button>
					<input id="searchbar" onChange={(e) => {setSearchParams(e.target.value)}} className={(searchOpen ? '' : 'closed') + " form-control"} type="search" placeholder="Search" aria-label="Search" size="xl"/>
				</div>
                <Link href="/itemdex">
                    <button className="navbaritem d-flex">
                        <FontAwesomeIcon icon={solid('backpack')} size="xl" />
                    </button>
                </Link>
				{settings.showShiny && <button onClick={toggleShiny} className="navbaritem d-flex mt-0 mt-md-auto">
					{<FontAwesomeIcon icon={isShiny ? solid('sparkles') : regular('sparkles')} size="xl"/>}
				</button>}
				{settings.showDark && <button onClick={toggleDark} className="navbaritem d-flex">
					{<FontAwesomeIcon icon={isDark ? solid('moon') : solid('sun')} size="xl" />}
				</button>}
                {settings.showArt && <button onClick={toggleOfficialArt} className="navbaritem d-flex">
					{<FontAwesomeIcon icon={isOfficialArt ? solid('toggle-on') : solid('toggle-off')} size="xl" />}
				</button>}
                <button data-bs-toggle="modal" data-bs-target="#settingsMenu" className="navbaritem d-flex">
					<FontAwesomeIcon icon={solid('gear')} size="xl"/>
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
