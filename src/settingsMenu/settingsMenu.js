import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import styles from "./settingsMenu.module.css";
import { useContext } from "react";
import Link from 'next/link'
import DarkContext from "../../contexts/dark";
import ShinyContext from "../../contexts/shiny";
import OfficialArtContext from "../../contexts/officialArt";
import SettingsContext from "../../contexts/settings";
function SettingsMenu() {
    const [isShiny, toggleShiny] = useContext( ShinyContext );
    const [isDark, toggleDark] = useContext( DarkContext );
    const [isOfficialArt, toggleOfficialArt] = useContext( OfficialArtContext );
    const [settings, updateSetting] = useContext( SettingsContext );
    return (
        <>
        {settings && <div className={"modal fade " + styles.modal} id="settingsMenu" tabindex="-1" aria-labelledby="settingsModalLabel" aria-hidden="true">
            <div className="modal-md modal-dialog">
                <div className={"modal-content " + styles.modalContent + " " + (isDark && " dark")}>
                    <div className={"modal-header " + styles.modalHeader}>
                        <h5 className="modal-title" id="settingsModalLabel">Settings</h5>
                        <button type="button" className={"btn-close "  + styles.closeButton} data-bs-dismiss="modal" aria-label="Close">
                            <FontAwesomeIcon icon={regular('xmark')} size="xl"/>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className={styles.settingRow}>
                            <div className={"form-check form-switch form-check-inline " + styles.setting}>
                                <input className="form-check-input" checked={isOfficialArt} onChange={toggleOfficialArt} type="checkbox" role="switch" id="OfficialArt" />
                                <label className="form-check-label" for="OfficialArt">Use Official Art</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" checked={settings.showArt} onChange={() => updateSetting('showArt', !settings.showArt)}  type="checkbox" role="switch" id="showArt" />
                                <label className="form-check-label" for="showArt">Quick Setting</label>
                            </div>
                        </div>
                        <div className={styles.settingRow}>
                            <div className={"form-check form-switch form-check-inline " + styles.setting}>
                                <input className="form-check-input" checked={isShiny} onChange={toggleShiny} type="checkbox" role="switch" id="ShinySprites" />
                                <label className="form-check-label" for="ShinySprites">Shiny Sprites</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" checked={settings.showShiny} onChange={() => updateSetting('showShiny', !settings.showShiny)}  type="checkbox" role="switch" id="showShiny" />
                                <label className="form-check-label" for="showShiny">Quick Setting</label>
                            </div>
                        </div>
                        <div className={styles.settingRow}>
                            <div className={"form-check form-switch form-check-inline " + styles.setting}>
                                <input className="form-check-input" checked={isDark} onChange={toggleDark} type="checkbox" role="switch" id="DarkMode" />
                                <label className="form-check-label" for="DarkMode">Dark Mode</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" checked={settings.showDark} onChange={() => updateSetting('showDark', !settings.showDark)}  type="checkbox" role="switch" id="showDark" />
                                <label className="form-check-label" for="showDark">Quick Setting</label>
                            </div>
                        </div>
                        <div className={styles.settingRow}>
                            <select onChange={(e) => updateSetting('language', e.target.value)} className={"form-select me-1 " + styles.setting} aria-label="Language">
                                <option value="en" selected>English</option>
                                <option value="ja-Hrkt">日本語</option>
                                <option value="ko">한국어</option>
                                <option value="zh-Hant">Chinese</option>
                                <option value="fr">Français</option>
                                <option value="de">Deutsch</option>
                                <option value="es">Español</option>
                                <option value="it">Italian</option>
                                <option value="ja">Japanese</option>
                            </select>
                            <select onChange={(e) => updateSetting('version', e.target.value)} className={"form-select ms-1 " + styles.setting} aria-label="Game version">
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
                                <option value="alpha-sapphire">Alpha Sapphire</option>
                                <option value="sun">Sun</option>
                                <option value="moon">Moon</option>
                                <option value="ultra-sun">Ultra Sun</option>
                                <option value="ultra-moon">Ultra Moon</option>
                                <option value="lets-go-pikachu">Let's Go, Pikachu!</option>
                                <option value="lets-go-eevee">Let's Go, Eevee!</option>
                                <option value="sword" selected>Sword</option>
                                <option value="shield">Shield</option>
                            </select>
                        </div>

                    </div>
                    <div className={"modal-footer " +  styles.modalFooter}>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>}</>
	);
}

export default SettingsMenu;
