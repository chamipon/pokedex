
import { createContext, useState } from 'react';

const SettingsContext = createContext(false, () => 1);

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        showDark: true,
        showShiny: false,
        showArt: false
    }, () => 1); 
    function updateSetting(setting, value){
        var newsettings = JSON.parse(JSON.stringify(settings)) //Need to do this to get settings by value, not by reference
        newsettings[setting] = value;
        setSettings(newsettings)
    }
    return (  
    <SettingsContext.Provider value={[settings, updateSetting]}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;