import React from 'react'
import FormDialo from './components/FormDialo';


function NewSletter() {

  return (
    <div className="py-5 bg-slate-50 min-h-[20rem] flex items-center text-white justify-center">
      <div className="text-center">
        <h1 className="text-2xl text-black font-extrabold uppercase ">
          Inscrivez-vous à notre{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            newsletter 
          </span>
        </h1>
      <FormDialo/>
      </div>
    </div>
  );
}

export default NewSletter
