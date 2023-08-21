import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import styles from "./settingsMenu.module.scss";
import Link from 'next/link'
import SettingsContext from "../../contexts/settings";
function SettingsMenu() {
    const [settings, updateSetting, setSettings] = useContext( SettingsContext );
    useEffect(() => {
        async function fetchSettings(){ //Fetches the user's settings from indexedd
            const db = await idb.openDB('ultradex', 1, {
                upgrade(db) {
                db.createObjectStore('ultradex-settings');
                },
            });
            var isDark = await fetchSetting("isDark", true, db)
            var showDark = await fetchSetting("showDark", false, db)
            var isShiny = await fetchSetting("isShiny", false, db)
            var showShiny = await fetchSetting("showShiny", true, db)
            var useArt = await fetchSetting("useArt", true, db)
            var showArt = await fetchSetting("showArt", true, db)
            var language = await fetchSetting("language", "en", db)
            var version = await fetchSetting("version", "sword", db)
            setSettings({
                isDark: isDark,
                showDark: showDark,
                isShiny: isShiny,
                showShiny: showShiny,
                useArt: useArt,
                showArt: showArt,
                language: language,
                version: version,
                fetched: true
            })
        }
        fetchSettings()
	},[]) 
    return (
        <>
        {settings && <div className={"modal fade"} id="settingsMenu" tabindex="-1" aria-labelledby="settingsModalLabel" aria-hidden="true">
            <div className="modal-md modal-dialog">
                <div className={"modal-content " + styles.modalContent + " " + (settings.isDark && " dark")}>
                    <div className={"modal-header " + styles.modalHeader}>
                        <h5 className="modal-title" id="settingsModalLabel">Settings</h5>
                        <button type="button" className={"btn-close "  + styles.closeButton} data-bs-dismiss="modal" aria-label="Close">
                            <FontAwesomeIcon icon={regular('xmark')} size="xl"/>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className={styles.settingRow}>
                            <div className={"form-check form-switch form-check-inline " + styles.setting}>
                                <input className="form-check-input" checked={settings.useArt}  onChange={() => updateSetting('useArt', !settings.useArt)} type="checkbox" role="switch" id="OfficialArt" />
                                <label className="form-check-label" for="OfficialArt">Use Official Art</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" checked={settings.showArt} onChange={() => updateSetting('showArt', !settings.showArt)}  type="checkbox" role="switch" id="showArt" />
                                <label className="form-check-label" for="showArt">Quick Setting</label>
                            </div>
                        </div>
                        <div className={styles.settingRow}>
                            <div className={"form-check form-switch form-check-inline " + styles.setting}>
                                <input className="form-check-input" checked={settings.isShiny}  onChange={() => updateSetting('isShiny', !settings.isShiny)} type="checkbox" role="switch" id="ShinySprites" />
                                <label className="form-check-label" for="ShinySprites">Shiny Sprites</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" checked={settings.showShiny} onChange={() => updateSetting('showShiny', !settings.showShiny)}  type="checkbox" role="switch" id="showShiny" />
                                <label className="form-check-label" for="showShiny">Quick Setting</label>
                            </div>
                        </div>
                        <div className={styles.settingRow}>
                            <div className={"form-check form-switch form-check-inline " + styles.setting}>
                                <input className="form-check-input" checked={settings.isDark}  onChange={() => updateSetting('isDark', !settings.isDark)} type="checkbox" role="switch" id="DarkMode" />
                                <label className="form-check-label" for="DarkMode">Dark Mode</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" checked={settings.showDark} onChange={() => updateSetting('showDark', !settings.showDark)}  type="checkbox" role="switch" id="showDark" />
                                <label className="form-check-label" for="showDark">Quick Setting</label>
                            </div>
                        </div>
                        <div className={styles.settingRow}>
                            <select onChange={(e) => updateSetting('language', e.target.value)} className={"form-select me-1 " + styles.setting} aria-label="Language">
                                <option value="en" selected={settings.language == "en"}>English</option>
                                <option value="ja-Hrkt" selected={settings.language == "ja-Hrkt"}>日本語</option>
                                <option value="ko" selected={settings.language == "ko"}>한국어</option>
                                <option value="zh-Hant" selected={settings.language == "zh-Hant"}>Chinese</option>
                                <option value="fr" selected={settings.language == "fr"}>Français</option>
                                <option value="de" selected={settings.language == "de"}>Deutsch</option>
                                <option value="es" selected={settings.language == "es"}>Español</option>
                                <option value="it" selected={settings.language == "it"}>Italian</option>
                                <option value="ja" selected={settings.language == "ja"}>Japanese</option>
                            </select>
                            <select onChange={(e) => updateSetting('version', e.target.value)} className={"form-select ms-1 " + styles.setting} aria-label="Game version">
                                <option value="red" selected={settings.version == "red"}>Red</option>
                                <option value="blue" selected={settings.version == "blue"}>Blue</option>
                                <option value="yellow" selected={settings.version == "yellow"}>Yellow</option>
                                <option value="gold" selected={settings.version == "gold"}>Gold</option>
                                <option value="silver" selected={settings.version == "silver"}>Silver</option>
                                <option value="crystal" selected={settings.version == "crystal"}>Crystal</option>
                                <option value="ruby" selected={settings.version == "ruby"}>Ruby</option>
                                <option value="sapphire" selected={settings.version == "sapphire"}>Sapphire</option>
                                <option value="emerald" selected={settings.version == "emerald"}>Emerald</option>
                                <option value="firered" selected={settings.version == "firered"}>FireRed</option>
                                <option value="leafgreen" selected={settings.version == "leafgreen"}>LeafGreen</option>
                                <option value="diamond" selected={settings.version == "diamond"}>Diamond</option>
                                <option value="pearl" selected={settings.version == "pearl"}>Pearl</option>
                                <option value="platinum" selected={settings.version == "platinum"}>Platinum</option>
                                <option value="heartgold" selected={settings.version == "heartgold"}>HeartGold</option>
                                <option value="soulsilver" selected={settings.version == "soulsilver"}>SoulSilver</option>
                                <option value="black-2" selected={settings.version == "black-2"}>Black 2</option>
                                <option value="white-2" selected={settings.version == "white-2"}>White 2</option>
                                <option value="x" selected={settings.version == "x"}>X</option>
                                <option value="y" selected={settings.version == "y"}>Y</option>
                                <option value="omega-ruby" selected={settings.version == "omega-ruby"}>Omega Ruby</option>
                                <option value="alpha-sapphire" selected={settings.version == "alpha-sapphire"}>Alpha Sapphire</option>
                                <option value="sun" selected={settings.version == "sun"}>Sun</option>
                                <option value="moon" selected={settings.version == "moon"}>Moon</option>
                                <option value="ultra-sun" selected={settings.version == "ultra-sun"}>Ultra Sun</option>
                                <option value="ultra-moon" selected={settings.version == "ultra-moon"}>Ultra Moon</option>
                                <option value="lets-go-pikachu" selected={settings.version == "lets-go-pikachu"}>Let's Go, Pikachu!</option>
                                <option value="lets-go-eevee" selected={settings.version == "lets-go-eevee"}>Let's Go, Eevee!</option>
                                <option value="sword" selected={settings.version == "sword"}>Sword</option>
                                <option value="shield" selected={settings.version == "shield"}>Shield</option>
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
    async function fetchSetting(setting, defaultValue,db){
        var _setting = await db.get('ultradex-settings', setting) //Pull the setting info from the db
        
        if(_setting == undefined){ //If this setting hasnt been initialized yet, initialize it with the default value
            await db.put('ultradex-settings', defaultValue, setting);
            _setting = defaultValue;
        }
        
        return _setting;
    }
}

export default SettingsMenu;
