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
        {settings && <div class={"modal fade " + styles.modal} id="settingsMenu" tabindex="-1" aria-labelledby="settingsModalLabel" aria-hidden="true">
            <div class="modal-lg modal-dialog">
                <div class={"modal-content " + styles.modalContent + " " + (isDark && " dark")}>
                    <div class="modal-header">
                        <h5 class="modal-title" id="settingsModalLabel">Settings</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <div class="form-check form-switch form-check-inline">
                                <input class="form-check-input" checked={isOfficialArt} onChange={toggleOfficialArt} type="checkbox" role="switch" id="OfficialArt" />
                                <label class="form-check-label" for="OfficialArt">Use Official Art</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" checked={settings.showArt} onChange={() => updateSetting('showArt', !settings.showArt)}  type="checkbox" role="switch" id="showArt" />
                                <label class="form-check-label" for="showArt">Show on menu bar?</label>
                            </div>
                        </div>
                        <div>
                            <div class="form-check form-switch form-check-inline">
                                <input class="form-check-input" checked={isShiny} onChange={toggleShiny} type="checkbox" role="switch" id="ShinySprites" />
                                <label class="form-check-label" for="ShinySprites">Shiny Sprites</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" checked={settings.showShiny} onChange={() => updateSetting('showShiny', !settings.showShiny)}  type="checkbox" role="switch" id="showShiny" />
                                <label class="form-check-label" for="showShiny">Show on menu bar?</label>
                            </div>
                        </div>
                        <div>
                            <div class="form-check form-switch form-check-inline">
                                <input class="form-check-input" checked={isDark} onChange={toggleDark} type="checkbox" role="switch" id="DarkMode" />
                                <label class="form-check-label" for="DarkMode">Dark Mode</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" checked={settings.showDark} onChange={() => updateSetting('showDark', !settings.showDark)}  type="checkbox" role="switch" id="showDark" />
                                <label class="form-check-label" for="showDark">Show on menu bar?</label>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>}</>
	);
}

export default SettingsMenu;
