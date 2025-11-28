import { useState, useEffect } from "react";

//components
import DeskTopNav from "./DeskTop/TopNavigation";

const Navbar = () => {

  const [isScrolled, setIsScrolled] = useState(false); // 控制滚动状态

  // Scroll event
  useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
  }, []);

  return (
      <header
          className={`fixed top-0 inset-x-0 z-50 py-5 transition-all duration-500 ${
              isScrolled ? "backdrop-blur-md bg-white/50 dark:bg-black/50 shadow-lg" : "bg-transparent"
          }`}
      >
          <DeskTopNav />
      </header>
  );
};

export default Navbar;
