import React from "react";
import ReactDOM from "react-dom";
import Pokedex from "./pokedex";
import "/styles/_Variables.scss";
import reportWebVitals from "../src/reportWebVitals";

export default function Home({ searchParams }) {
	return (
		<React.StrictMode>
			<Pokedex searchParams={searchParams} />
		</React.StrictMode>
	);
}

// reportWebVitals();
