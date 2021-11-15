
import { createContext, useState } from 'react';

const DarkContext = createContext(true, () => 1);

export const DarkProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true); //Display normal or Dark sprites
    function toggleDark(){
        setIsDark(!isDark)
    }
    return (  
    <DarkContext.Provider value={[isDark, toggleDark]}>
      {children}
    </DarkContext.Provider>
  );
};

export default DarkContext;