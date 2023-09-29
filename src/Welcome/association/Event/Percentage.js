import React from 'react'

function Percentage() {
  return (
    <div className="my-4 flex justify-center">
      <div className="grid grid-cols-1 gap-y-2 lg:gap-y-0 lg:grid-cols-3">
        <div>
          <h1 className="text-3xl text-slate-200 hover:text-slate-400 duration-300 font-black">
            {" "}
            98 Bénevole(s)
          </h1>
        </div>

        <div>
          <h1 className="text-3xl text-slate-200 hover:text-slate-400 duration-300 font-black">
            {" "}
            41 Évènement(s)
          </h1>
        </div>
        <div>
          <h1 className="text-3xl text-slate-200 hover:text-slate-400 duration-300 font-black">
            {" "}
            100 Commentaire(s)
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Percentage
