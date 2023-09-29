import React from 'react'
import Pannel from './Pannel'
import FormRegister from './FormRegister';

function RegisterR() {
  return (
    <div className="w-full">
      <Pannel
        title="Créer votre compte"
        text="Veuillez renseigner tout les champ !."
      />
      <div className='text-center'>
        <FormRegister name="register" />
      </div>
    </div>
  );
}

export default RegisterR
