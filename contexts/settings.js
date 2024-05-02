import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
const SettingsContext = createContext(false, () => 1);

export const SettingsProvider = ({ children }) => {
	const { data: session } = useSession();
	const [settings, setSettings] = useState({}, () => 1);
	const { theme, setTheme } = useTheme("system");
	const settingArray = [
		// Array of all of the settings and their default values
		{ key: "theme", defaulVal: "system" },
		{ key: "isShiny", defaulVal: false },
		{ key: "showShiny", defaulVal: true },
		{ key: "useArt", defaulVal: true },
		{ key: "showArt", defaulVal: true },
		{ key: "language", defaulVal: "en" },
		{ key: "version", defaulVal: "sword" },
		{ key: "versionGroup", defaulVal: "sword-shield" },
		{ key: "goLink", defaulVal: false },
		{ key: "showSpeciesInfo", defaulVal: true },
		{ key: "showStats", defaulVal: true },
		{ key: "showEvoChain", defaulVal: true },
		{ key: "showAbilities", defaulVal: true },
		{ key: "showMoves", defaulVal: true },
		{ key: "showForms", defaulVal: true },
	];
	useEffect(() => {
		//Whenever the session changes, update the settings
		if (session) {
			//User is now logged in
			fetchSettingsKV().then((res) => {
				res && setSettings(applySettingsKV(res.user));
			});
		} else if (session !== undefined) {
			//User is now logged out
			fetchSettingsIndexDB().then((res) => {
				setSettings(res);
			});
		}
	}, [session, setSettings]);
	useEffect(() => {
		// Add class to the body element to keep track of the theme
		settings && setTheme(settings.theme);
	}, [settings, settings.theme]);
	return (
		<SettingsContext.Provider value={[settings, updateSetting, setSettings]}>
			{children}
		</SettingsContext.Provider>
	);

	async function updateSetting(setting, value) {
		var newsettings = JSON.parse(JSON.stringify(settings)); //Need to do this to get settings by value, not by reference
		newsettings[setting] = value; // Update the changed setting
		setSettings(newsettings); // Update state with new settings

		if (session) {
			//If logged in, save the new settings to the DB
			setSettingsKV(newsettings);
		} else {
			//If not logged in, save the settings locally
			const db = await idb.openDB("ultradex", 1, {
				upgrade(db) {
					db.createObjectStore("ultradex-settings");
				},
			});
			await db.put("ultradex-settings", value, setting);
		}
	}
	async function fetchSettingsIndexDB() {
		//Fetches the user's settings from indexedb
		const db = await idb.openDB("ultradex", 1, {
			upgrade(db) {
				db.createObjectStore("ultradex-settings");
			},
		});
		let fetchedSettings = {};
		await Promise.all(
			settingArray.map(async (setting) => {
				fetchedSettings[setting.key] = await fetchSettingIndexDB(
					setting.key,
					setting.defaulVal,
					db
				);
			})
		);
		fetchedSettings.fetched = true;
		return fetchedSettings;
	}

	async function fetchSettingIndexDB(setting, defaultValue, db) {
		var _setting = await db.get("ultradex-settings", setting); //Pull the setting info from the db

		if (_setting == undefined) {
			//If this setting hasnt been initialized yet, initialize it with the default value
			await db.put("ultradex-settings", defaultValue, setting);
			_setting = defaultValue;
		}

		return _setting;
	}

	async function setSettingsKV(settings) {
		let reqBody = { id: session.user.id, settings: settings };
		const response = await fetch("/api/user", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(reqBody),
		});
	}
	async function fetchSettingsKV() {
		const response = await fetch("/api/user", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: session.user.id,
			},
		});

		const res = await response.json();
		return res;
	}
	function applySettingsKV(user) {
		let fetchedSettings = {};
		settingArray.forEach((setting) => {
			//Look for the setting in the user object
			let fetchedSetting = user ? user.settings[setting.key] : null;
			//If the setting isn't in the user object (not in the database) use the default value
			fetchedSettings[setting.key] =
				fetchedSetting !== null ? fetchedSetting : setting.defaulVal;
		});
		fetchedSettings.fetched = true;
		if (!user) setSettingsKV(fetchedSettings);
		return fetchedSettings;
	}
};

export default SettingsContext;
