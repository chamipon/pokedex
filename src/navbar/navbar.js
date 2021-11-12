import React, { useState, useEffect } from "react";
import "./navbar.css";
import $ from "jquery";
import * as installable from "./../installable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

function Navbar({isDark, setIsDark, isShiny, setIsShiny, setSearchParams, showInstall, setShowInstall}) {
	const [searchOpen, setSearchOpen] = useState(false)
	useEffect(() => {
		installable.installableSetup(setShowInstall)
	},[setShowInstall])
	return (
		<nav className="navbar fixed-bottom">
			<div className="h-100 w-100 d-flex flex-row flex-md-column">
				<img onClick={() => {window.location.reload()}} id="brandLogo" class="me-auto" alt={isDark ? "ultra ball sprite" : "premier ball sprite"} src={isDark ? "./ultraball.png" : "./premier_ball.png"} />
				<div class="d-flex flex-row">
					<button onClick={(e) => {setSearchOpen(!searchOpen); $("#searchbar").focus()}} className="navbaritem d-flex">
						{/* xmark is a different size than the rest for some reason, need to explicitly define the margin otherwise the search bar would reduce it to 0. Need different margin for each. */}
						{searchOpen ? <FontAwesomeIcon style={{marginLeft: "17px", marginRight:"17px" }} icon={regular('xmark')} size="xl" /> : <FontAwesomeIcon style={{marginLeft: "12px", marginRight:"12px" }} icon={solid('magnifying-glass')} size="xl" /> }
					</button>
					<input id="searchbar" onChange={(e) => {setSearchParams(e.target.value)}} className={(searchOpen ? '' : 'closed') + " form-control"} type="search" placeholder="Search" aria-label="Search" />
				</div>
				{/* <button className="navbaritem d-flex">
					<FontAwesomeIcon icon={solid('filter')} size="xl" />
				</button> */}
				<button onClick={() => setIsShiny(!isShiny)} className="navbaritem d-flex mt-0 mt-md-auto">
					{<FontAwesomeIcon icon={isShiny ? solid('sparkles') : regular('sparkles')} size="xl" />}
				</button>
				<button onClick={() => setIsDark(!isDark)} className="navbaritem d-flex">
					{<FontAwesomeIcon icon={isDark ? solid('moon') : solid('sun')} size="xl" />}
				</button>
				{showInstall && <button onClick={() => installable.installButtonClick(setShowInstall)} id="installButton" className="navbaritem d-flex">
					<FontAwesomeIcon icon={solid('download')} size="xl" />
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
