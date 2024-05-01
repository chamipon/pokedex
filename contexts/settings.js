import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
const SettingsContext = createContext(false, () => 1);

export const SettingsProvider = ({ children }) => {
	const { data: session } = useSession();
	const [settings, setSettings] = useState(
		{
			isDark: true,
			isShiny: false,
			showShiny: false,
			useArt: true,
			showArt: false,
			language: "en",
			version: "shield",
			goLink: false,
			showSpeciesInfo: true,
			showStats: true,
			showEvoChain: true,
			showAbilities: true,
			showMoves: true,
			showForms: true,
		},
		() => 1
	);
	useEffect(() => {
		//Whenever the session changes, update the settings
		if (session) {
			//User is now logged in
			fetchSettingsKV().then((res) => {
				res.user && setSettings(res.user.settings);
			});
		} else {
			//User is now logged out
			fetchSettingsIndexDB();
		}
	}, [session]);

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
		//Fetches the user's settings from indexedd
		const db = await idb.openDB("ultradex", 1, {
			upgrade(db) {
				db.createObjectStore("ultradex-settings");
			},
		});
		var isDark = await fetchSettingIndexDB("isDark", true, db);
		var isShiny = await fetchSettingIndexDB("isShiny", false, db);
		var showShiny = await fetchSettingIndexDB("showShiny", true, db);
		var useArt = await fetchSettingIndexDB("useArt", true, db);
		var showArt = await fetchSettingIndexDB("showArt", true, db);
		var language = await fetchSettingIndexDB("language", "en", db);
		var version = await fetchSettingIndexDB("version", "sword", db);
		var versionGroup = await fetchSettingIndexDB(
			"versionGroup",
			"sword-shield",
			db
		);
		var goLink = await fetchSettingIndexDB("goLink", false, db);
		var showSpeciesInfo = await fetchSettingIndexDB("showSpeciesInfo", true, db);
		var showStats = await fetchSettingIndexDB("showStats", true, db);
		var showEvoChain = await fetchSettingIndexDB("showEvoChain", true, db);
		var showAbilities = await fetchSettingIndexDB("showAbilities", true, db);
		var showMoves = await fetchSettingIndexDB("showMoves", true, db);
		var showForms = await fetchSettingIndexDB("showForms", true, db);
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
};

export default SettingsContext;
