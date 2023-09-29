import React  from 'react'
import Left from './Left'
import LoginR from './LoginR'
import { UserInfoContext } from '../AuthContext'


const descp = <span>Entrer vos informations, pour vous connectez.</span>

function Login({setUserInfo,setLoading}) {
 

  return (
    <>
      {setUserInfo && (
        <div className="flex justify-center h-[90vh] w-full">
          <Left name="S'inscrire" content={descp} />
          <UserInfoContext.Provider value={{ setUserInfo, setLoading }}>
            <LoginR />
          </UserInfoContext.Provider>
        </div>
      )}
    </>
  );
}

export default Login
