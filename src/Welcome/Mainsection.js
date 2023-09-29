import React from 'react'
import CustomizeSteeper from './components/CustomizeSteeper'
import BasicAccordion from './components/BasicAccordion'

function Mainsection(props) {
  return (
    <div className="my-5 bg-slate-50">
      <h1 className="text-2xl my-3 py-5  uppercase text-center font-extrabold ">
        Tout savoir à propos des Associations étudiantes ?{" "}
      </h1>
      <CustomizeSteeper />
      <div className="mt-5 mb-3 max-w-5xl mx-auto">
        <BasicAccordion />
      </div>
    </div>
  );
}

export default Mainsection
