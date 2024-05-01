import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import styles from "./settingsMenu.module.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SettingsContext from "../../contexts/settings";
import SettingsRow from "./settingsRow/settingsRow";
import { useSession } from "next-auth/react";
function SettingsMenu(props) {
	const [settings, updateSetting] = useContext(SettingsContext);
	const handleClose = () => props.setShowSettingsMenu(false);
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
}

export default SettingsMenu;
