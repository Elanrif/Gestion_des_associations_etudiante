import React from "react";
import circle from "./image/circle.jpg";
import { Link } from "react-router-dom";

function LeftAuth({ name, content,data,admin ,nom}) {

  const display = ()=> {

      if(admin === true){
       return (
         <>
           <div className="absolute h-full w-full top-0 left-0 bg-blue-500 opacity-75"></div>
           <img src={circle} className="h-full w-full" />
           <div className="text-white xl:block hidden absolute px-1 top-[50%]">
             <h1 className="uppercase text-xl md:text-3xl font-extrabold">
               {data} !
             </h1>
             <p className="my-5 max-w-[30rem]"> {content}</p>
             <Link
               to={
                 nom === "membre"
                   ? "/dashboard/admin/bureaus"
                   : "/dashboard/admin/users"
               }
               className="ring-2 ring-white font-bold hover:ring-blue-700 hover:text-blue-800 px-4 text-xl py-2 uppercase rounded-full"
             >
               {name}
             </Link>
           </div>
         </>
       );

      }else{
       return(
         <>
        <div className="absolute h-full w-full top-0 left-0 bg-green-500 opacity-75"></div>
      <img src={circle} className="h-full w-full" />
      <div className="text-white xl:block hidden absolute px-1 top-[50%]">
        <h1 className="uppercase text-xl md:text-3xl font-extrabold">
            {data} !
        </h1>
        <p className="my-5 max-w-[30rem]"> {content}</p>
        <Link
          to="/dashboard/user/profile"
          className="ring-2 ring-white font-bold hover:ring-blue-700 hover:text-blue-800 px-4 text-xl py-2 uppercase rounded-full"
        >
          {name}
        </Link>
      </div>
      </>
       )
      }
  }
  return (
    <div className="xl:flex hidden relative items-center justify-center  w-[70%]">
      {display()}
    </div>
  );
}

export default LeftAuth;
