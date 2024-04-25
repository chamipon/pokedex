import React, { useContext, useEffect } from "react";
import Image from "next/image";
import * as installable from "./../installable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import ReactNavbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ultraPic from "../../public/ultraball.png";
import premierPic from "../../public/premier_ball.png";
import SettingsContext from "../../contexts/settings";
import styles from "./navbar.module.scss";
function Navbar({
	showInstall,
	setShowInstall,
	showSettingsMenu,
	setShowSettingsMenu,
	showMobileMenu,
	setShowMobileMenu,
}) {
	const [settings, updateSetting] = useContext(SettingsContext);
	useEffect(() => {
		installable.installableSetup(setShowInstall);
	}, [setShowInstall]);
	return (
		<ReactNavbar className={styles.navbar + " fixed-bottom "}>
			<div className="h-100 w-100 d-flex flex-row flex-md-column">
				<div className="mb-md-auto me-auto me-md-0 d-flex flex-row flex-md-column">
					<ReactNavbar.Brand
						href="/pokedex"
						className="ms-md-auto d-flex me-2 me-md-auto"
						aria-label="Ultradex Home"
					>
						<Image
							width={40}
							layout="fixed"
							height={40}
							alt={
								settings.isDark
									? "ultra ball sprite"
									: "premier ball sprite"
							}
							src={settings.isDark ? ultraPic : premierPic}
						/>
					</ReactNavbar.Brand>
					{/* <Link href="/itemdex">
						<button className={styles.navbaritem + " d-md-flex d-none"}>
							<FontAwesomeIcon icon={solid("backpack")} size="lg" />
						</button>
					</Link> */}
					<Nav.Link
						onClick={() => {
							setShowSettingsMenu(!showSettingsMenu);
						}}
						className={styles.navbaritem + " d-md-flex d-none"}
						aria-label="Open Settings Menu"
					>
						<FontAwesomeIcon icon={solid("gear")} size="lg" />
					</Nav.Link>
				</div>
				{/* Quick Settings */}
				{settings.fetched && (
					<>
						{settings.showShiny && (
							<Nav.Link
								onClick={() =>
									updateSetting("isShiny", !settings.isShiny)
								}
								className={styles.navbaritem + " d-flex"}
								aria-label="Use Shiny Sprites"
							>
								<FontAwesomeIcon
									icon={
										settings.isShiny
											? solid("sparkles")
											: regular("sparkles")
									}
									size="lg"
								/>
							</Nav.Link>
						)}
						{settings.showArt && (
							<Nav.Link
								onClick={() =>
									updateSetting("useArt", !settings.useArt)
								}
								className={styles.navbaritem + " d-flex"}
								aria-label="Use Offical Art"
							>
								{
									<FontAwesomeIcon
										icon={
											settings.useArt
												? solid("toggle-on")
												: solid("toggle-off")
										}
										size="lg"
									/>
								}
							</Nav.Link>
						)}
					</>
				)}

				{showInstall && (
					<Nav.Link
						onClick={() =>
							installable.installButtonClick(setShowInstall)
						}
						id="installButton"
						className={styles.navbaritem + " d-flex"}
						aria-label="Install Ultradex"
					>
						<FontAwesomeIcon icon={solid("download")} size="lg" />
					</Nav.Link>
				)}
				<Nav.Link
					onClick={() => {
						setShowMobileMenu(!showMobileMenu);
					}}
					className={styles.navbaritem + " d-flex d-md-none"}
					aria-label="Open Mobile Menu"
				>
					<FontAwesomeIcon icon={solid("bars")} size="lg" />
				</Nav.Link>
			</div>
		</ReactNavbar>
	);
}

export default Navbar;
