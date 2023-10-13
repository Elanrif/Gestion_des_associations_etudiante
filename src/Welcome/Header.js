import React from 'react';
import abdk from "./images/abdelmalek.png"
import {HiHome} from "react-icons/hi"
import { BsFillTelephoneFill } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import AccountMenu from './components/AccountMenu';
import CostomMenu from './components/CostomMenu';
import { Link } from 'react-router-dom';
import AuthComponent from './components/AuthComponent';

function Header() {

    const items = [
          { text: "Acceuil", icon: <HiHome size="20px"/>, to : "/" },
          { text: <div><span className='md:block hidden'>Nous-contactez</span><span className='md:hidden block'>Contact</span></div>, icon: <BsFillTelephoneFill size="20px"/> ,to:"/nous-contacter"},
        
        
    ];

  return (
    <div className="mt-5 flex justify-center space-x-3 lg:justify-evenly">
      <Link to="/" className="hidden md:flex space-x-2">
        <img src={abdk} className="h-12 w-12" />
      </Link>

      <div className="flex space-x-5 items-center">

        {items.map((item, index) => {
         if(item.to == null){
           
            return (
              <div key={index} className="flex hover:bg-slate-50 text-sm font-medium items-center space-x-2  hover:cursor-pointer py-2 px-3 border  hover:border-slate-200 rounded-full">
                {item.icon} 
              </div>
            );
         }
         else{
             return (
               <NavLink 
                 className={({ isActive, isPending }) =>
                   isPending
                     ? console.log(" link is pending")
                     : isActive
                     ? "flex space-x-2 text-sm normal-case md:lowercase font-semibold bg-slate-100 border items-center py-2 px-3 rounded-full"
                     : "flex hover:bg-slate-50 text-sm noraml-case font-semibold items-center space-x-2  hover:cursor-pointer py-2 px-3 border md:lowercase hover:border-slate-200 rounded-full"
                 }
                 to={item.to}
                 key={index}
               >
                 <p> {item.icon}</p> <p className='capitalize'>{item.text}</p>
               </NavLink>
             );
         }
        })}

         <div><CostomMenu/></div>

      </div>


      <div className="flex  items-center space-x-2">
      <AuthComponent/>
      <AccountMenu />
      </div>
     
    </div>
  );
}

export default Header
