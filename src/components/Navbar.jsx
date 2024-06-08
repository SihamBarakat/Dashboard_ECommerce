import React, { useEffect } from "react";

import { Cart, Chat, Search, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import { IoMdLogIn } from "react-icons/io";
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Login from '../login/Login'
import { AiOutlineMenu } from 'react-icons/ai';
import avatar from '../data/avatar.jpg';
import { MdKeyboardArrowDown } from 'react-icons/md';
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);
const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">

    <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
    <div className="flex">
     
    <NavButton title="Login" customFunc={() => handleClick('login')} color={currentColor} icon={<IoMdLogIn />} />
      
      
     
      {isClicked.login && (<Login />)}
      {/* {isClicked.notification && (<Login />)} */}
      {isClicked.userProfile && (<UserProfile />)}
    </div>
  </div>
  );
};

export default Navbar;