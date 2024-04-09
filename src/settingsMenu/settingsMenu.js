import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import styles from "./settingsMenu.module.scss";
import Link from 'next/link'
import SettingsContext from "../../contexts/settings";
import SettingsRow from "./settingsRow/settingsRow";
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
            var isShiny = await fetchSetting("isShiny", false, db)
            var showShiny = await fetchSetting("showShiny", true, db)
            var useArt = await fetchSetting("useArt", true, db)
            var showArt = await fetchSetting("showArt", true, db)
            var language = await fetchSetting("language", "en", db)
            var version = await fetchSetting("version", "sword", db)
            var goLink = await fetchSetting("goLink", false, db)
            var showSpeciesInfo = await fetchSetting("showSpeciesInfo", true, db)
            var showStats = await fetchSetting("showStats", true, db)
            var showEvoChain = await fetchSetting("showEvoChain", true, db)
            setSettings({
                isDark: isDark,
                isShiny: isShiny,
                showShiny: showShiny,
                useArt: useArt,
                showArt: showArt,
                language: language,
                version: version,
                goLink: goLink,
                showSpeciesInfo: showSpeciesInfo,
                showStats: showStats,
                showEvoChain: showEvoChain,
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
                        <SettingsRow
                            settingVal = {settings.isShiny}
                            settingName = "Shiny Sprites"
                            settingKey = "isShiny"
                            quickSettingKey = "showShiny"
                            quickSetting = {true}
                            quickSettingVal = {settings.showShiny}
                            updateSetting = {updateSetting}
                        ></SettingsRow>
                        <SettingsRow
                            settingVal = {settings.useArt}
                            settingName = "Use Official Art"
                            settingKey = "useArt"
                            quickSettingKey = "showArt"
                            quickSetting = {true}
                            quickSettingVal = {settings.showArt}
                            updateSetting = {updateSetting}
                        ></SettingsRow>
                        <SettingsRow
                            settingVal = {settings.isDark}
                            settingName = "Dark Mode"
                            settingKey = "isDark"
                            updateSetting = {updateSetting}
                        ></SettingsRow>
                        <SettingsRow
                            settingVal = {settings.goLink}
                            settingName = "Pokemon Go Link"
                            settingKey = "goLink"
                            updateSetting = {updateSetting}
                        ></SettingsRow>
                        <SettingsRow
                            settingVal = {settings.showSpeciesInfo}
                            settingName = "Show Species Info"
                            settingKey = "showSpeciesInfo"
                            updateSetting = {updateSetting}
                        ></SettingsRow>
                        <SettingsRow
                            settingVal = {settings.showStats}
                            settingName = "Show Pokemon Stats"
                            settingKey = "showStats"
                            updateSetting = {updateSetting}
                        ></SettingsRow>
                        <SettingsRow
                            settingVal = {settings.showEvoChain}
                            settingName = "Show Evolution Chain"
                            settingKey = "showEvoChain"
                            updateSetting = {updateSetting}
                        ></SettingsRow>
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
