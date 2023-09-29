import React from 'react'
import RegisterR from './RegisterR'
import Left from './Left'
import { UserInfoContext } from '../AuthContext';

 const descp = (
   <span>
     Veuillez entrer vos données personnels pour rester connectez avec nous. et
     reçevoir tout les nouveaus informations.
   </span>
 );

function Register({setUserInfo,setLoading}) {

 
  return (
    <div className="flex justify-center h-[90vh] w-full">
      <Left name="Se connecter" content={descp} />
      <UserInfoContext.Provider value={{ setUserInfo, setLoading }}>
        <RegisterR />
      </UserInfoContext.Provider>
    </div>
  );
}

export default Register
