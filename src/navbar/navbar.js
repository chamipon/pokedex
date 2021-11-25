import React, { useState, useEffect } from "react";
import $ from "jquery";
import Image from 'next/image'
import * as installable from "./../installable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import ultraPic from '../../public/ultraball.png'
import premierPic from '../../public/premier_ball.png'
import { useContext } from 'react';
import Link from 'next/link'
import SettingsContext from "../../contexts/settings";
function Navbar({setSearchParams, showInstall, setShowInstall}) {
	const [searchOpen, setSearchOpen] = useState(false)
    const [settings, updateSetting] = useContext( SettingsContext );
	useEffect(() => {
		installable.installableSetup(setShowInstall)
	},[setShowInstall])
	return (
		<nav className={"navbar fixed-bottom " + (settings.isDark && 'dark')}>
			<div className="h-100 w-100 d-flex flex-row flex-md-column">
				<div className="mb-md-auto me-auto me-md-0 d-flex flex-row flex-md-column">
                    <div className="ms-md-auto d-flex me-2 me-md-auto">
                        <Link style={{alignSelf:"center", margin: 'auto'}} href="/pokedex" scroll={false}>
                            <a>
                                <Image 
                                    width={40} layout="fixed" 
                                    height={40} 
                                    alt={settings.isDark ? "ultra ball sprite" : "premier ball sprite"} src={settings.isDark ? ultraPic : premierPic} 
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
                </div>
                {settings.fetched && 
                <>
                    {settings.showShiny && <button onClick={() => updateSetting('isShiny', !settings.isShiny)} className="navbaritem d-flex">
                        {<FontAwesomeIcon icon={settings.isShiny ? solid('sparkles') : regular('sparkles')} size="xl"/>}
                    </button>}
                    {settings.showDark && <button onClick={() => updateSetting('isDark', !settings.isDark)} className="navbaritem d-flex">
                        {<FontAwesomeIcon icon={settings.isDark ? solid('moon') : solid('sun')} size="xl" />}
                    </button>}
                    {settings.showArt && <button onClick={() => updateSetting('useArt', !settings.useArt)} className="navbaritem d-flex">
                        {<FontAwesomeIcon icon={settings.useArt ? solid('toggle-on') : solid('toggle-off')} size="xl" />}
                    </button>}
                </>
                }

            {showInstall && 
                <button onClick={() => installable.installButtonClick(setShowInstall)} id="installButton" className="navbaritem d-flex">
                    <FontAwesomeIcon icon={solid('download')} size="xl"/>
                </button>
            }
            <button data-bs-toggle="modal" data-bs-target="#settingsMenu" className="navbaritem d-flex">
                <FontAwesomeIcon icon={solid('gear')} size="xl"/>
            </button>
			</div>
		</nav>
	);
}

export default Navbar;
