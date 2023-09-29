import React from 'react'
import Pannel from './Pannel'
import FormLogin from './FormLogin'

function LoginR() {
  return (
    <div className="w-full">
      <Pannel title="Se connecter" text="connectez vous à votre compte." />
      <div className='text-center'>
        <FormLogin />
      </div>
    </div>
  );
}

export default LoginR
