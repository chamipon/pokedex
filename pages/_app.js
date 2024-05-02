import "../styles/app.css";
//import "../src/navbar/navbar.css"
import "../styles/_Variables.scss";
import "../styles/themes.css";
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
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
config.autoAddCss = false;

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	const [searchParams, setSearchParams] = useState(""); // The current search parameters
	const [showInstall, setShowInstall] = useState(false); //Used to control if the install button is being displayed
	const [targetPoke, setTargetPoke] = useState(""); // Pokedex number of the poke we want to scroll to
	const [showSettingsMenu, setShowSettingsMenu] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
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
				<SessionProvider session={session}>
					<ThemeProvider>
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
										images: [
											{
												url: "https://www.ultradex.ca/ultraball_1024.png",
												width: 1024,
												height: 1024,
												alt: "Ultraball",
											},
										],
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
									showSettingsMenu={showSettingsMenu}
									setShowSettingsMenu={setShowSettingsMenu}
									showMobileMenu={showMobileMenu}
									setShowMobileMenu={setShowMobileMenu}
								/>

								<SettingsMenu
									showSettingsMenu={showSettingsMenu}
									setShowSettingsMenu={setShowSettingsMenu}
								/>
								<MobileMenu
									show={showMobileMenu}
									setShow={setShowMobileMenu}
									showSettingsMenu={showSettingsMenu}
									setShowSettingsMenu={setShowSettingsMenu}
								/>
							</ContentContainer>
						</SettingsProvider>
					</ThemeProvider>
				</SessionProvider>
			</div>
		</>
	);
}
export default MyApp;
