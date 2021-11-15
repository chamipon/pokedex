
import { createContext, useState } from 'react';

const ShinyContext = createContext(false, () => 1);

export const ShinyProvider = ({ children }) => {
    const [isShiny, setIsShiny] = useState(false); //Display normal or shiny sprites
    function toggleShiny(){
        setIsShiny(!isShiny)
    }
    return (  
    <ShinyContext.Provider value={[isShiny, toggleShiny]}>
      {children}
    </ShinyContext.Provider>
  );
};

export default ShinyContext;