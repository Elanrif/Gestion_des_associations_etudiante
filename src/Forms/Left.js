import React from 'react'
import circle from "./image/circle.jpg"
import { Link } from 'react-router-dom'

function Left({name,content}) {

  
  return (
    <div className='md:flex hidden relative items-center justify-center  w-[70%]'>
        <div className='absolute h-full w-full top-0 left-0 bg-green-500 opacity-75'></div>
        <img src={circle} className='h-full w-full'/>
      <div className='text-white xl:block hidden absolute px-1 top-[50%]'>
        <h1 className='uppercase text-xl md:text-3xl font-extrabold'>Bienvenu,chère étudiant(e) !</h1>
        <p className='my-5 max-w-[30rem]'> {content}</p>
        <Link to={name==="Se connecter" ? "/login":"/register"} className='ring-2 ring-white font-bold hover:ring-blue-700 hover:text-blue-800 px-4 text-xl py-2 uppercase rounded-full'>
            {name}
        </Link>
      </div>
    </div>
  )
}

export default Left
