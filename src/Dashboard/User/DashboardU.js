import React from 'react'
import SidebarU from './SidebarU'
import { Outlet } from 'react-router-dom'

function DashboardU() {
  return (
    <div className="flex">
      <SidebarU />
      <div className="ps-[7rem] lg:ps-[18rem]  w-full min-h-[100vh]">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardU
