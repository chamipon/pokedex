import React, { useState, useEffect, useContext } from "react";
import styles from "./settingsRow.module.scss";
function SettingsRow(props) { 
    return (
        <>
            <div className={styles.settingRow}>
                <div className={"form-check form-switch form-check-inline " + styles.setting}>
                    <input className="form-check-input" checked={props.settingVal}  onChange={() => props.updateSetting(props.settingKey, !props.settingVal)} type="checkbox" role="switch" id={props.settingKey} />
                    <label className="form-check-label" htmlFor={props.settingKey}>{props.settingName}</label>
                </div>
            {props.quickSetting && 
                <div className="form-check form-check-inline">
                    <input className="form-check-input" checked={props.quickSettingVal} onChange={() => props.updateSetting(props.quickSettingKey, !props.quickSettingVal)}  type="checkbox" role="switch" id={props.quickSettingKey} />
                    <label className="form-check-label" htmlFor={props.quickSettingKey}>Quick Setting</label>
                </div>}
            </div>
        </>
	);
}

export default SettingsRow;
