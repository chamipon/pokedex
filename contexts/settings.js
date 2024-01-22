
import { createContext, useState } from 'react';

const SettingsContext = createContext(false, () => 1);



export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        isDark: true,
        showDark: true,
        isShiny: false,
        showShiny: false,
        useArt: true,
        showArt: false,
        language: "en",
        version: "sword",
        goLink: false,
        fetched: false
    }, () => 1); 
    async function updateSetting(setting, value){
        var newsettings = JSON.parse(JSON.stringify(settings)) //Need to do this to get settings by value, not by reference
        newsettings[setting] = value;
        setSettings(newsettings)
        const db = await idb.openDB('ultradex', 1, {
            upgrade(db) {
              db.createObjectStore('ultradex-settings');
            },
        });
        await db.put('ultradex-settings', value, setting);
    }
    return (  
    <SettingsContext.Provider value={[settings, updateSetting, setSettings]}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;