import React,{useContext} from 'react'
import {GiPadlock} from "react-icons/gi"
import {BiSolidCommentCheck} from "react-icons/bi"
import {BsFillCalendar2EventFill} from "react-icons/bs"
import {TiGroup} from "react-icons/ti"
import {CgOptions} from "react-icons/cg"
import { UserInfoContext } from '../../AuthContext'



function Account() {

    const { userConnected, setUserConnected } = useContext(UserInfoContext);

    console.log(" account " , userConnected)
   
  return (
    <div className="h-[100vh] bg-slate-100">
      <div className=" pt-[10rem]">
        <div className="flex items-center space-x-4 justify-center">
          <img
            src={`data:image;base64,${userConnected.image}`}
            className="h-[15rem] w-[15rem] rounded-full"
          />
          <div>
            <p className="text-2xl font-semibold text-slate-800">
              {" "}
              {userConnected.firstName} {userConnected.lastName}{" "}
            </p>
            <div className="flex items-center space-x-3 mt-3 justify-start">
              <div className="px-3 flex items-end space-x-2 hover:cursor-pointer py-2 rounded-xl bg-black text-white hover:bg-blue-500 duration-300">
                {" "}
                <GiPadlock size="24px" className="text-white" />{" "}
                <p>confidentialité</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 text-center font-semibold">{userConnected.email}</p>
      </div>

      <div className="flex justify-center space-x-3 items-center mt-8">
        <div className="px-3 flex items-end space-x-2 hover:cursor-pointer py-2 rounded-xl border border-black hover:bg-black hover:text-white  bg-slate-100 duration-300">
          {" "}
          <CgOptions size="24px" className="" /> <p> {userConnected.apogee}</p>
        </div>

        <div className="px-3 flex items-end space-x-2 hover:cursor-pointer py-2 rounded-xl border border-black hover:bg-black hover:text-white  bg-slate-100 duration-300">
          {" "}
          <TiGroup size="24px" className="" />{" "}
          <p>4 Association(s) suivie (s)</p>
        </div>

        <div className="px-3 flex items-end space-x-2 hover:cursor-pointer py-2 rounded-xl border border-black hover:bg-black hover:text-white  bg-slate-100 duration-300">
          {" "}
          <BsFillCalendar2EventFill size="24px" className="" />{" "}
          <p>3 évènement(s) participé(s)</p>
        </div>

        <div className="px-3 flex items-end space-x-2 hover:cursor-pointer py-2 rounded-xl border border-black hover:bg-black hover:text-white  bg-slate-100 duration-300">
          {" "}
          <BiSolidCommentCheck size="24px" className="" />{" "}
          <p>3 commentaire(s)</p>
        </div>
      </div>
    </div>
  );
}

export default Account
