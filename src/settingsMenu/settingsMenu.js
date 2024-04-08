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
            var goLink = await fetchSetting("goLink", false, db)
            var showSpeciesInfo = await fetchSetting("showSpeciesInfo", true, db)
            setSettings({
                isDark: isDark,
                showDark: showDark,
                isShiny: isShiny,
                showShiny: showShiny,
                useArt: useArt,
                showArt: showArt,
                language: language,
                version: version,
                goLink: goLink,
                showSpeciesInfo: showSpeciesInfo,
                fetched: true
            })
        }
        fetchSettings()
	},[]) 
    return (
        <>
        {settings && <div className={"modal fade"} id="settingsMenu" tabIndex="-1" aria-labelledby="settingsModalLabel" aria-hidden="true">
            <div className="modal-md modal-dialog">
                <div className={"modal-content " + styles.modalContent + " " + (settings.isDark && " dark")}>
                    <div className={"modal-header " + styles.modalHeader}>
                        <h5 className="modal-title" id="settingsModalLabel">Settings</h5>
                        <button type="button" className={"btn-close "  + styles.closeButton} data-bs-dismiss="modal" aria-label="Close">
                            <FontAwesomeIcon icon={regular('xmark')} size="lg"/>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className={styles.settingRow}>
                            <div className={"form-check form-switch form-check-inline " + styles.setting}>
                                <input className="form-check-input" checked={settings.useArt}  onChange={() => updateSetting('useArt', !settings.useArt)} type="checkbox" role="switch" id="OfficialArt" />
                                <label className="form-check-label" htmlFor="OfficialArt">Use Official Art</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" checked={settings.showArt} onChange={() => updateSetting('showArt', !settings.showArt)}  type="checkbox" role="switch" id="showArt" />
                                <label className="form-check-label" htmlFor="showArt">Quick Setting</label>
                            </div>
                        </div>
                        <div className={styles.settingRow}>
                            <div className={"form-check form-switch form-check-inline " + styles.setting}>
                                <input className="form-check-input" checked={settings.isShiny}  onChange={() => updateSetting('isShiny', !settings.isShiny)} type="checkbox" role="switch" id="ShinySprites" />
                                <label className="form-check-label" htmlFor="ShinySprites">Shiny Sprites</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" checked={settings.showShiny} onChange={() => updateSetting('showShiny', !settings.showShiny)}  type="checkbox" role="switch" id="showShiny" />
                                <label className="form-check-label" htmlFor="showShiny">Quick Setting</label>
                            </div>
                        </div>
                        <div className={styles.settingRow}>
                            <div className={"form-check form-switch form-check-inline " + styles.setting}>
                                <input className="form-check-input" checked={settings.isDark}  onChange={() => updateSetting('isDark', !settings.isDark)} type="checkbox" role="switch" id="DarkMode" />
                                <label className="form-check-label" htmlFor="DarkMode">Dark Mode</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" checked={settings.showDark} onChange={() => updateSetting('showDark', !settings.showDark)}  type="checkbox" role="switch" id="showDark" />
                                <label className="form-check-label" htmlFor="showDark">Quick Setting</label>
                            </div>
                        </div>
                        <div className={styles.settingRow}>
                            <div className={"form-check form-switch form-check-inline " + styles.setting}>
                                <input className="form-check-input" checked={settings.goLink}  onChange={() => updateSetting('goLink', !settings.goLink)} type="checkbox" role="switch" id="GoLink" />
                                <label className="form-check-label" htmlFor="GoLink">Pokemon Go Link</label>
                            </div>
                        </div>
                        <div className={styles.settingRow}>
                            <div className={"form-check form-switch form-check-inline " + styles.setting}>
                                <input className="form-check-input" checked={settings.showSpeciesInfo}  onChange={() => updateSetting('showSpeciesInfo', !settings.showSpeciesInfo)} type="checkbox" role="switch" id="GoLink" />
                                <label className="form-check-label" htmlFor="showSpeciesInfo">Show Species Info</label>
                            </div>
                        </div>
                        <div className={styles.settingRow}>
                            <select onChange={(e) => updateSetting('language', e.target.value)} value={settings.language} className={"form-select me-1 " + styles.setting} aria-label="Language">
                                <option value="en" >English</option>
                                <option value="ja-Hrkt" >日本語</option>
                                <option value="ko" >한국어</option>
                                <option value="zh-Hant" >Chinese</option>
                                <option value="fr" >Français</option>
                                <option value="de" >Deutsch</option>
                                <option value="es" >Español</option>
                                <option value="it" >Italian</option>
                                <option value="ja" >Japanese</option>
                            </select>
                            <select onChange={(e) => updateSetting('version', e.target.value)} value={settings.version} className={"form-select ms-1 " + styles.setting} aria-label="Game version">
                                <option value="red" >Red</option>
                                <option value="blue" >Blue</option>
                                <option value="yellow" >Yellow</option>
                                <option value="gold" >Gold</option>
                                <option value="silver" >Silver</option>
                                <option value="crystal" >Crystal</option>
                                <option value="ruby" >Ruby</option>
                                <option value="sapphire" >Sapphire</option>
                                <option value="emerald" >Emerald</option>
                                <option value="firered" >FireRed</option>
                                <option value="leafgreen" >LeafGreen</option>
                                <option value="diamond" >Diamond</option>
                                <option value="pearl" >Pearl</option>
                                <option value="platinum" >Platinum</option>
                                <option value="heartgold" >HeartGold</option>
                                <option value="soulsilver" >SoulSilver</option>
                                <option value="black-2" >Black 2</option>
                                <option value="white-2" >White 2</option>
                                <option value="x" >X</option>
                                <option value="y" >Y</option>
                                <option value="omega-ruby" >Omega Ruby</option>
                                <option value="alpha-sapphire" >Alpha Sapphire</option>
                                <option value="sun" >Sun</option>
                                <option value="moon" >Moon</option>
                                <option value="ultra-sun" >Ultra Sun</option>
                                <option value="ultra-moon" >Ultra Moon</option>
                                <option value="lets-go-pikachu" >Let's Go, Pikachu!</option>
                                <option value="lets-go-eevee" >Let's Go, Eevee!</option>
                                <option value="sword" >Sword</option>
                                <option value="shield" >Shield</option>
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
