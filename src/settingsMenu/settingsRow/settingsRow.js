import styles from "./settingsRow.module.scss";
import Form from "react-bootstrap/Form";
function SettingsRow(props) {
	return (
		<>
			<div className={styles.settingRow}>
				<Form.Switch
					inline
					label={props.settingName}
					onChange={() =>
						props.updateSetting(props.settingKey, !props.settingVal)
					}
					checked={props.settingVal}
					id={props.settingKey}
				/>
				{props.quickSetting && (
					<Form.Check
						checked={props.quickSettingVal}
						onChange={() =>
							props.updateSetting(
								props.quickSettingKey,
								!props.quickSettingVal
							)
						}
						label="Quick Setting"
						id={props.quickSettingKey}
					/>
				)}
			</div>
		</>
	);
}

export default SettingsRow;
