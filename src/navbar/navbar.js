import React, { useState, useEffect } from "react";
import $ from "jquery";
import Image from 'next/image'
import * as installable from "./../installable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'

import ultraPic from '../../public/ultraball.png'
import premierPic from '../../public/premier_ball.png'
import { useContext } from 'react';
import Link from 'next/link'
import SettingsContext from "../../contexts/settings";
import styles from "./navbar.module.scss";
function Navbar({showInstall, setShowInstall}) {
    const [settings, updateSetting] = useContext( SettingsContext );
	useEffect(() => {
		installable.installableSetup(setShowInstall)
	},[setShowInstall])
	return (
		<nav className={styles.navbar + " navbar fixed-bottom "}>
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
                    <Link href="/itemdex">
                        <button className={styles.navbaritem + " d-md-flex d-none"}>
                            <FontAwesomeIcon icon={solid('backpack')} size="lg" />
                        </button>
                    </Link>
                    <button data-bs-toggle="modal" data-bs-target="#settingsMenu" className={styles.navbaritem + " d-md-flex d-none"}>
                        <FontAwesomeIcon icon={solid('gear')} size="lg"/>
                    </button>
                </div>
                {/* Quick Settings */}
                {settings.fetched && 
                    <> 
                        {settings.showShiny && <button onClick={() => updateSetting('isShiny', !settings.isShiny)} className={styles.navbaritem + " d-flex"}>
                            {<FontAwesomeIcon icon={settings.isShiny ? solid('sparkles') : regular('sparkles')} size="lg"/>}
                        </button>}
                        {settings.showDark && <button onClick={() => updateSetting('isDark', !settings.isDark)} className={styles.navbaritem + " d-flex"}>
                            {<FontAwesomeIcon icon={settings.isDark ? solid('moon') : solid('sun')} size="lg" />}
                        </button>}
                        {settings.showArt && <button onClick={() => updateSetting('useArt', !settings.useArt)} className={styles.navbaritem + " d-flex"}>
                            {<FontAwesomeIcon icon={settings.useArt ? solid('toggle-on') : solid('toggle-off')} size="lg" />}
                        </button>}
                    </>
                }

            {showInstall && 
                <button onClick={() => installable.installButtonClick(setShowInstall)} id="installButton" className={styles.navbaritem + " d-flex"}>
                    <FontAwesomeIcon icon={solid('download')} size="lg"/>
                </button>
            }
            <button data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu" className={styles.navbaritem + " d-flex d-md-none"}>
                <FontAwesomeIcon icon={solid('bars')} size="lg"/>
            </button>
			</div>
		</nav>
	);
}

export default Navbar;
