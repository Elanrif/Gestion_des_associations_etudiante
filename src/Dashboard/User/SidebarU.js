import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHome, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { SiLoopback } from "react-icons/si";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import MenuAccount from "./MenuAccount";

const SidebarU = () => {
  const menus = [
    { name: "Page d'acceuil", link: "/", icon: AiOutlineHome },
    { name: "Tableau de Bord", link: "/dashboard/user/acceuil", icon: MdOutlineDashboard },
    {
      name: "Mon compte",
      link: "/dashboard/user/profile",
      icon: AiOutlineUser,
      margin: true,
      desctivate :true
    },
    { name: "Articles", link: "/admin/articles", icon: FiFolder },
    { name: "Commandes", link: "/admin/orders", icon: FiShoppingCart },
    {
      name: "Commentaire",
      link: "/comment",
      icon: AiOutlineHeart,
      margin: true,
    },
    { name: "Déconnexion", link: "/logout", icon: HiOutlineLogout },
  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="hidden gap-6  lg:flex">
      <div
        className={`bg-[#030750] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 fixed px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? console.log(" link is pending")
                  : isActive
                  ? ` ${
                      menu?.margin && "mt-5"
                    } group flex items-center text-sm  gap-3.5 font-medium p-2 bg-orange-400 rounded-md`
                  : `${
                      menu?.margin && "mt-5"
                    } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-orange-400 rounded-md`
              }
              to={menu?.link}
              key={i}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </NavLink>
          ))}
            <MenuAccount />
        </div>
      </div>
    </section>
  );
};

export default SidebarU;
