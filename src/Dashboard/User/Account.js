import React,{useContext,useState,useEffect} from 'react'
import {GiPadlock} from "react-icons/gi"
import {BiSolidCommentCheck} from "react-icons/bi"
import {BsFillCalendar2EventFill} from "react-icons/bs"
import {TiGroup} from "react-icons/ti"
import {CgOptions} from "react-icons/cg"
import { UserInfoContext } from '../../AuthContext'
import {BsPencilFill} from "react-icons/bs"
import {PiLockKeyOpenFill} from "react-icons/pi"
import { Link } from 'react-router-dom'
import axios from 'axios'



function Account() {

    const { userConnected, setUserConnected } = useContext(UserInfoContext);
    const {association, setAssociation} = useState([])
    console.log(" account " , userConnected)

    useEffect(() => {
        playAsso() 
    }, [])

    const playAsso = ()=>{

      axios.get(`/association/userInfo/associations/${userConnected.id}`)
      .then((res)=>{
          setAssociation(res.data)
      })
      .catch((err)=>{
        console.log("err : " , err )
      });

    }
   
  return (
    <div className="min-h-[94vh]">
      <div className=" pt-[10rem]">
        <div className="flex items-center space-x-4 justify-center">
          <img
            src={
              userConnected.image
                ? `data:image;base64,${userConnected.image}`
                : "/image/main/person.jpeg"
            }
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
          <TiGroup size="24px" className="" />
          {association?.length > 0 ? (
            <p>{association.length} Association(s) suivie (s)</p>
          ) : (
            <p>Aucune association suivie</p>
          )}
        </div>

        <Link
          to="/dashboard/user/update"
          className="px-3 flex items-end space-x-2 hover:cursor-pointer py-2 rounded-xl border border-black hover:bg-black hover:text-white  bg-slate-100 duration-300"
        >
          {" "}
          <BsPencilFill size="24px" className="" /> <p>Modifier mon compte</p>
        </Link>

        <Link
          to="/dashboard/user/update/password"
          className="px-3 flex items-end space-x-2 hover:cursor-pointer py-2 rounded-xl border border-black hover:bg-black hover:text-white  bg-slate-100 duration-300"
        >
          {" "}
          <PiLockKeyOpenFill size="24px" className="" />{" "}
          <p>Modifier mot de passe</p>
        </Link>
      </div>
    </div>
  );
}

export default Account
