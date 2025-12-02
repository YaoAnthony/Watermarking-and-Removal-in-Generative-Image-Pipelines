

// motion
import { motion } from "motion/react";

// icons
import { MenuOutlined } from "@ant-design/icons";

// components
import DarkLightSwitch from "../../DarkLightSwitch";

const DeskTopNav = () => {

  return (
    <nav className={`hidden md:flex w-full items-center justify-end px-12`}>



      {/* NAV RIGHT */}
      <div className="flex items-center gap-7 justify-end">
        <DarkLightSwitch />


        {/* MOBILE MENU ICON */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="text-white text-lg cursor-pointer select-none max-sm:block hidden"
        >
          <MenuOutlined />
        </motion.div>
      </div>
    </nav>
  );
};

export default DeskTopNav;
