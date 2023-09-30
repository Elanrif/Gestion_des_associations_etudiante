import React from 'react'
import SidebarU from './SidebarU'
import { Outlet } from 'react-router-dom'

function DashboardU() {
  return (
    <div className="flex"> {/* les 2 doivent donner 100% donc 1 qui est le width du parent. */}
      <div className="w-1/6">
        <SidebarU /> {/* comme si ce sideBar n'avait pas de largeur , donc specifier dans le div */}
      </div>
      <div className=" w-5/6 px-[4rem] mx-auto min-h-[88vh]">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardU
