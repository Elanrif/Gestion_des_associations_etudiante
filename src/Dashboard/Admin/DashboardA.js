import React from 'react'
import SidebarA from './SidebarA'
import { Outlet } from 'react-router-dom'

function DashboardA() {
  return (
    <div className="flex">
      <div className="w-1/6">
        {" "}
        <SidebarA />
      </div>
      <div className="w-3/4 mx-auto bg-slate-100 min-h-[88vh]"> {/* mettre par défaut les Outlet a min-h-[93vh] et dans les Outlet ne pas faire des min-h[...] sinon ne pas dépasser 93vh dans les Outlets */}
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardA
