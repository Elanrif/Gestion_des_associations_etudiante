import React from 'react'

function ButtonAccount(props) {
  return (
    <button type="button" className="ring-2 bg-green-500 opacity-75 text-white ring-white font-bold
      hover:text-slate-50 hover:opacity-100 px-4 text-xl focus:ring-offset-emerald-50 py-2 uppercase rounded-full">
        {props.name}
    </button>
  );
}

export default ButtonAccount
