import React,{useContext} from 'react'
import { UserInfoContext } from '../../../AuthContext'

function MainU() {

  /* pas la peine de verifier le context dans le return car je me suis assuré dans le parent App.js que on va 
  affiché ce composant seulement si je suis sûr que l'user est connecté. */
  const { userConnected, setUserConnected } = useContext(UserInfoContext);

  return (
    <div className='h-[100vh] flex items-center justify-center'>
        <div> 
          <p className='text-3xl font-black'>Bienvenu dans votre Tableau de bord.</p> 
          Mr {userConnected.firstName}
        </div>
    </div>
  )
}

export default MainU
