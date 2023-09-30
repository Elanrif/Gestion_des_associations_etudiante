import React,{useContext} from 'react'
import { UserInfoContext } from '../../../AuthContext'

function MainU() {

  /* pas la peine de verifier le context dans le return car je me suis assuré dans le parent App.js que on va 
  affiché ce composant seulement si je suis sûr que l'user est connecté. */
  const { userConnected, setUserConnected } = useContext(UserInfoContext);

  return (
    <div className="h-[93vh] pt-5 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center relative">
        <div className=" opacity-20 text-center border border-pink-300">
          <img src="/image/main/speak.png" />
        </div>
        <div className='absolute top-[9rem]'>
          <p className="text-3xl text-center font-black">
            Bienvenu Mr/Mlle. {userConnected.firstName}
          </p>
          <p className="text-thin text-slate-900 font-normal mt-3">
            Votre compte a été crée avec succès, nous sommes ravis de vous voir
            parmis nous. n'hésitez pas à exploRer les différentes section pour
            découvrir les associations existante ainsi que les évènements à
            venir.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainU
