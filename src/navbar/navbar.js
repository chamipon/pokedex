import React, { useState, useEffect } from "react";
import "./navbar.css";
import $ from "jquery";
import * as installable from "./../installable";
function Navbar({isDark, setIsDark, isShiny, setIsShiny, setSearchParams, showInstall, setShowInstall}) {
	const [searchOpen, setSearchOpen] = useState(false)
	useEffect(() => {
		installable.installableSetup(setShowInstall)
	},[setShowInstall])
	return (
		<nav className="navbar fixed-bottom">
			<div className="h-100 w-100 d-flex flex-row flex-md-column">
				<img id="brandLogo" class="me-auto" alt={isDark ? "ultra ball sprite" : "premier ball sprite"} src={isDark ? "./ultraball.png" : "./premier_ball.png"} />
				<div class="d-flex flex-row">
					<button onClick={(e) => {setSearchOpen(!searchOpen); $("#searchbar").focus()}} className="navbaritem d-flex">
						<span className={(searchOpen ? 'fa-times' : 'fa-search') + " fas fa-lg"}></span>
					</button>
					<input id="searchbar" onChange={(e) => {setSearchParams(e.target.value)}} className={(searchOpen ? '' : 'closed') + " form-control"} type="search" placeholder="Search" aria-label="Search" />
				</div>
				<button className="navbaritem d-flex">
					<span className="fas fa-filter fa-lg "></span>
				</button>
				<button onClick={() => setIsShiny(!isShiny)} className="navbaritem d-flex mt-0 mt-md-auto">
					{isShiny ? <span className="fas fa-dollar-sign fa-lg " /> : <span className="fas fa-euro-sign fa-lg "/> } {/* TODO: Give this proper icons, fa-sparkle from fa-pro? */}
				</button>
				<button onClick={() => setIsDark(!isDark)} className="navbaritem d-flex">
					{isDark ? <span className="fas fa-sun fa-lg " /> : <span className="fas fa-moon fa-lg "/>}
				</button>
				{showInstall && <button onClick={() => installable.installButtonClick(setShowInstall)} id="installButton" className="navbaritem d-flex">
					<span className="fas fa-download fa-lg"/>
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
