import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import styles from "./settingsMenu.module.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SettingsContext from "../../contexts/settings";
import SettingsRow from "./settingsRow/settingsRow";
import handler from "/src/KV.js";

function SettingsMenu(props) {
	const [settings, updateSetting, setSettings] = useContext(SettingsContext);
	const handleClose = () => props.setShowSettingsMenu(false);
	const handleShow = () => props.setShowSettingsMenu(true);
	useEffect(() => {
		// Add class to the body element to keep track of the theme
		if (settings.isDark) {
			document.body.classList.add("dark");
			document.body.classList.remove("light");
		} else {
			document.body.classList.add("light");
			document.body.classList.remove("dark");
		}
	}, [settings.isDark]);
	useEffect(() => {
		async function fetchSettingsIndexDB() {
			//Fetches the user's settings from indexedd
			const db = await idb.openDB("ultradex", 1, {
				upgrade(db) {
					db.createObjectStore("ultradex-settings");
				},
			});
			var isDark = await fetchSetting("isDark", true, db);
			var isShiny = await fetchSetting("isShiny", false, db);
			var showShiny = await fetchSetting("showShiny", true, db);
			var useArt = await fetchSetting("useArt", true, db);
			var showArt = await fetchSetting("showArt", true, db);
			var language = await fetchSetting("language", "en", db);
			var version = await fetchSetting("version", "sword", db);
			var versionGroup = await fetchSetting(
				"versionGroup",
				"sword-shield",
				db
			);
			var goLink = await fetchSetting("goLink", false, db);
			var showSpeciesInfo = await fetchSetting("showSpeciesInfo", true, db);
			var showStats = await fetchSetting("showStats", true, db);
			var showEvoChain = await fetchSetting("showEvoChain", true, db);
			var showAbilities = await fetchSetting("showAbilities", true, db);
			var showMoves = await fetchSetting("showMoves", true, db);
			var showForms = await fetchSetting("showForms", true, db);
			setSettings({
				isDark: isDark,
				isShiny: isShiny,
				showShiny: showShiny,
				useArt: useArt,
				showArt: showArt,
				language: language,
				version: version,
				versionGroup: versionGroup,
				goLink: goLink,
				showSpeciesInfo: showSpeciesInfo,
				showStats: showStats,
				showEvoChain: showEvoChain,
				showAbilities: showAbilities,
				showMoves: showMoves,
				showForms: showForms,
				fetched: true,
			});
		}
		async function fetchSettingsKV() {
			//Fetches the user's settings from Vercel KV
			console.log(handler());
		}
		fetchSettingsKV();
		fetchSettingsIndexDB();
	}, []);
	return (
		<>
			{settings && (
				<Modal
					show={props.showSettingsMenu}
					onHide={handleClose}
					size="md"
					id="settingsMenu"
					tabIndex="-1"
					aria-hidden="true"
					closeButton="true"
				>
					<Modal.Header className={styles.modalHeader}>
						<h5 className="modal-title" id="settingsModalLabel">
							Settings {props.showSettingsMenu}
						</h5>
						<Button
							variant="close"
							aria-label="Close"
							onClick={handleClose}
							className={styles.closeButton}
						>
							<FontAwesomeIcon icon={regular("xmark")} size="lg" />
						</Button>
					</Modal.Header>

					<Modal.Body className={styles.modalBody}>
						<SettingsRow
							settingVal={settings.isShiny}
							settingName="Shiny Sprites"
							settingKey="isShiny"
							quickSettingKey="showShiny"
							quickSetting={true}
							quickSettingVal={settings.showShiny}
							updateSetting={updateSetting}
						></SettingsRow>
						<SettingsRow
							settingVal={settings.useArt}
							settingName="Use Official Art"
							settingKey="useArt"
							quickSettingKey="showArt"
							quickSetting={true}
							quickSettingVal={settings.showArt}
							updateSetting={updateSetting}
						></SettingsRow>
						<SettingsRow
							settingVal={settings.isDark}
							settingName="Dark Mode"
							settingKey="isDark"
							updateSetting={updateSetting}
						></SettingsRow>
						<SettingsRow
							settingVal={settings.goLink}
							settingName="Pokemon Go Link"
							settingKey="goLink"
							updateSetting={updateSetting}
						></SettingsRow>
						<SettingsRow
							settingVal={settings.showSpeciesInfo}
							settingName="Show Species Info"
							settingKey="showSpeciesInfo"
							updateSetting={updateSetting}
						></SettingsRow>
						<SettingsRow
							settingVal={settings.showStats}
							settingName="Show Pokemon Stats"
							settingKey="showStats"
							updateSetting={updateSetting}
						></SettingsRow>
						<SettingsRow
							settingVal={settings.showEvoChain}
							settingName="Show Evolution Chain"
							settingKey="showEvoChain"
							updateSetting={updateSetting}
						></SettingsRow>
						<SettingsRow
							settingVal={settings.showForms}
							settingName="Show Forms"
							settingKey="showForms"
							updateSetting={updateSetting}
						></SettingsRow>
						<SettingsRow
							settingVal={settings.showAbilities}
							settingName="Show Abilities"
							settingKey="showAbilities"
							updateSetting={updateSetting}
						></SettingsRow>
						<SettingsRow
							settingVal={settings.showMoves}
							settingName="Show Moves"
							settingKey="showMoves"
							updateSetting={updateSetting}
						></SettingsRow>

						<div className={styles.settingRow}>
							<Form.Select
								onChange={(e) =>
									updateSetting("language", e.target.value)
								}
								value={settings.language}
								className={"me-1 " + styles.setting}
								aria-label="Language"
							>
								<option value="en">English</option>
								<option value="ja-Hrkt">日本語</option>
								<option value="ko">한국어</option>
								<option value="zh-Hant">Chinese</option>
								<option value="fr">Français</option>
								<option value="de">Deutsch</option>
								<option value="es">Español</option>
								<option value="it">Italian</option>
								<option value="ja">Japanese</option>
							</Form.Select>
							<Form.Select
								onChange={(e) =>
									updateSetting("version", e.target.value)
								}
								value={settings.version}
								className={"ms-1 " + styles.setting}
								aria-label="Game version"
							>
								<option value="red">Red</option>
								<option value="blue">Blue</option>
								<option value="yellow">Yellow</option>
								<option value="gold">Gold</option>
								<option value="silver">Silver</option>
								<option value="crystal">Crystal</option>
								<option value="ruby">Ruby</option>
								<option value="sapphire">Sapphire</option>
								<option value="emerald">Emerald</option>
								<option value="firered">FireRed</option>
								<option value="leafgreen">LeafGreen</option>
								<option value="diamond">Diamond</option>
								<option value="pearl">Pearl</option>
								<option value="platinum">Platinum</option>
								<option value="heartgold">HeartGold</option>
								<option value="soulsilver">SoulSilver</option>
								<option value="black-2">Black 2</option>
								<option value="white-2">White 2</option>
								<option value="x">X</option>
								<option value="y">Y</option>
								<option value="omega-ruby">Omega Ruby</option>
								<option value="alpha-sapphire">
									Alpha Sapphire
								</option>
								<option value="sun">Sun</option>
								<option value="moon">Moon</option>
								<option value="ultra-sun">Ultra Sun</option>
								<option value="ultra-moon">Ultra Moon</option>
								<option value="lets-go-pikachu">
									Let's Go, Pikachu!
								</option>
								<option value="lets-go-eevee">
									Let's Go, Eevee!
								</option>
								<option value="sword">Sword</option>
								<option value="shield">Shield</option>
							</Form.Select>
						</div>
					</Modal.Body>
					<Modal.Footer className={styles.modalFooter}>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			)}
		</>
	);
	async function fetchSetting(setting, defaultValue, db) {
		var _setting = await db.get("ultradex-settings", setting); //Pull the setting info from the db

		if (_setting == undefined) {
			//If this setting hasnt been initialized yet, initialize it with the default value
			await db.put("ultradex-settings", defaultValue, setting);
			_setting = defaultValue;
		}

		return _setting;
	}
}

export default SettingsMenu;
