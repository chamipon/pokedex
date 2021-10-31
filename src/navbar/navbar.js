import React, { useState, useEffect } from "react";
import "./navbar.css";
import $ from "jquery";
function Navbar(props) {
	const [mode, setMode] = useState("dark"); // All the pokemon data that has been fetched.
	function toggleMode(){
		if (mode == "dark"){
			setMode("light")
			$("#modeContainer").removeClass("dark")
		}
		else{
			setMode("dark")
			$("#modeContainer").addClass("dark")
		}
	}

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
				<button onClick={toggleMode} className="navbaritem d-flex mt-0 mt-md-auto">
					{mode == "light" && <span className="fas fa-sun fa-lg "></span>}
					{mode == "dark" && <span className="fas fa-moon fa-lg "></span>}
				</button>
			</div>
		</nav>
	);
}

export default Navbar;
