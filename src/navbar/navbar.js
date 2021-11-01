import React, { useState, useEffect } from "react";
import "./navbar.css";

function Navbar({isDark, setIsDark, isShiny, setIsShiny}) {
	return (
		<nav className="navbar fixed-bottom">
			<div className="h-100 w-100 d-flex flex-row flex-md-column">
				<img id="brandLogo" class="me-auto" alt="ultraball" src="./ultraball.png" />
				<div className="navbaritem d-flex">
					<span className="fas fa-search fa-lg "></span>
				</div>
				<div className="navbaritem d-flex">
					<span className="fas fa-bars fa-lg "></span>
				</div>
				<button onClick={() => setIsShiny(!isShiny)} className="navbaritem d-flex mt-0 mt-md-auto">
					{isShiny ? <span className="fas fa-dollar-sign fa-lg " /> : <span className="fas fa-euro-sign fa-lg "/>}
				</button>
				<button onClick={() => setIsDark(!isDark)} className="navbaritem d-flex">
					{isDark ? <span className="fas fa-sun fa-lg " /> : <span className="fas fa-moon fa-lg "/>}
				</button>
			</div>
		</nav>
	);
}

export default Navbar;
