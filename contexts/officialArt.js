
import { createContext, useState } from 'react';

const OfficialArtContext = createContext(false, () => 1);

export const OfficialArtProvider = ({ children }) => {
    const [isOfficialArt, setIsOfficialArt] = useState(true); //Display normal or OfficialArt sprites
    function toggleOfficialArt(){
        setIsOfficialArt(!isOfficialArt)
    }
    return (  
    <OfficialArtContext.Provider value={[isOfficialArt, toggleOfficialArt]}>
      {children}
    </OfficialArtContext.Provider>
  );
};

export default OfficialArtContext;