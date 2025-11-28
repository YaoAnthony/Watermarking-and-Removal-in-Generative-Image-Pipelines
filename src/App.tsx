//react
import { useLayoutEffect } from 'react'

//react route dom
import { Routes, Route, useLocation, } from 'react-router-dom'

//motion
import { AnimatePresence } from 'motion/react';

import Mainpage from './Pages/Mainpage';

// theme
import { useThemeSync } from './hook/useThemeSync';

// Scroll to the top of the page when the location changes
function ScrollToTop() {
    const location = useLocation();

    useLayoutEffect(() => {
        // Scroll to the top of the page when the location changes
        window.scrollTo(0, 0);
    }, [location]);

  // Return null as this component doesn't render anything
  return null;
}
const App = () => {
    const location = useLocation();

    // 处理主题
    useThemeSync();
    
    
    return (
        
        <div className="relative w-full min-h-screen">
            <ScrollToTop />
            
            <AnimatePresence mode="wait">
                
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Mainpage />} />
                </Routes>
            </AnimatePresence>
        </div>
        
    );
}


export default App;
