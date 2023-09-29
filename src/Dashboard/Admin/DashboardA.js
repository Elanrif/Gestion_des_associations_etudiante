import React from 'react'
import SidebarA from './SidebarA'
import { Outlet } from 'react-router-dom'

function DashboardA() {
  return (
    <div className="flex">
      <div className='w-1/6'>
        {" "}
        <SidebarA />
      </div>
      <div className="w-3/4 mx-auto border  min-h-[88vh]">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardA
