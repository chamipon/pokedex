import "../styles/app.css";
//import "../src/navbar/navbar.css"
import "bootstrap/dist/css/bootstrap.css";
import "../src/pokeInfo/types/types.css";
import "../src/pokeCard/pokeCard.module.scss";
import { DefaultSeo } from "next-seo";
import "../src/navbar/navbar";
import { SettingsProvider } from "../contexts/settings";
import Head from "next/head";
import Navbar from "../src/navbar/navbar";
import SettingsMenu from "../src/settingsMenu/settingsMenu";
import MobileMenu from "../src/navbar/mobileMenu/mobileMenu";
import ContentContainer from "../src/contentContainer/contentContainer";
import React, { useState, useContext } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "../node_modules/@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/_Variables.scss";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
	const [searchParams, setSearchParams] = useState(""); // The current search parameters
	const [showInstall, setShowInstall] = useState(false); //Used to control if the install button is being displayed
	const [targetPoke, setTargetPoke] = useState(""); // Pokedex number of the poke we want to scroll to
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
					rel="stylesheet"
					integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
					crossOrigin="anonymous"
				/>
				<script
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"
					integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj"
					crossOrigin="anonymous"
				></script>
				<script src="https://cdn.jsdelivr.net/npm/idb@7/build/umd.js"></script>
				<link rel="icon" href="/favicon.png" />
				<link rel="apple-touch-icon" href="/app_touch_icon.png" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<div className="variableContainer">
				<SettingsProvider>
					<ContentContainer>
						<DefaultSeo
							themeColor="#222222"
							description="A Modern Pokedex App"
							defaultTitle="Ultradex"
							titleTemplate="%s | Ultradex"
							openGraph={{
								type: "website",
								locale: "en_US",
								url: "https://www.ultradex.ca",
								siteName: "Ultradex",
								images: ["/ultraball_1024.png"],
							}}
						/>
						<Component
							targetPoke={targetPoke}
							setTargetPoke={setTargetPoke}
							searchParams={searchParams}
							setSearchParams={setSearchParams}
							{...pageProps}
						/>
						<Navbar
							showInstall={showInstall}
							setShowInstall={setShowInstall}
						/>
						<SettingsMenu />
						<MobileMenu />
					</ContentContainer>
				</SettingsProvider>
			</div>
		</>
	);
}
export default MyApp;
