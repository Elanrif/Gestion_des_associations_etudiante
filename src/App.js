import "./App.css";
import React , {useState,useEffect} from "react"
import { Routes, Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import Contactez from "./Welcome/Contactez";
import Main from "./Welcome/Main";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.js";
import Login from "./Forms/Login";
import Forgot from "./Forms/Forgot";
import Register from "./Forms/Register";
import DashboardU from "./Dashboard/User/DashboardU";
import DashboardA from "./Dashboard/Admin/DashboardA";
import MainU from "./Dashboard/User/Main/MainU";
import MainA from "./Dashboard/Admin/Main/MainA";
import UpdateAccount from "./Dashboard/User/UpdateAccount/UpdateAccount";
import UpdatePass from "./Dashboard/User/UpdateAccount/UpdatePass";
import Association from "./Welcome/association/Association";
import UsersPage from "./Dashboard/Admin/Main/UsersPage";
import GetWorkUser from "./GetWorkUser";
import PartF from "./PartF";
import Associations from "./Dashboard/Admin/Main/Associations";
import Evenementt from "./Dashboard/Admin/Main/Evenement";
import UpdateAssociation from "./Dashboard/Admin/AssociationForm/UpdateAssociation";
import AddAssociation from "./Dashboard/Admin/AssociationForm/AddAssociation";
import UpdateUser from "./Forms/UpdateUser";
import Bureaus from "./Dashboard/Admin/Main/Bureaus";
import AddMembre from "./Dashboard/Admin/Membre/AddMembre";
import UpdateMembre from "./Dashboard/Admin/Membre/UpdateMembre";
import UpdateEvent from "./Dashboard/Admin/Event/UpdateEvent";
import AddEvent from "./Dashboard/Admin/Event/AddEvent";
import Comments from "./Dashboard/Admin/Main/Comments";
import Benevoles from "./Dashboard/Admin/Main/Benevoles";
import { UserInfoContext } from "./AuthContext"; /* un context peut être utilisé plusieur fois sur différent endroit ou même imbriqué*/
import Account from "./Dashboard/User/Account";
import PageNotFound from "./PageNotFound";
import AssociationAuth from "./Dashboard/User/Main/Association";


function App() {

  /* pour éviter que a chaque fois qu'on actualise on doit s'authentifier.car il trouve que le state etait initialisé à useState({}) */
  const auth = sessionStorage.getItem("auth") ? JSON.parse( sessionStorage.getItem("auth")) : {} ; 
  //aussi initialisé userLoading selon la valeur de auth.
  const authBool  =  auth ? true : false  // ici on inialise par {} et pas par false le auth.

  //on passe les 2 dans Login et Register apres avec le context dans les formulaire de LOGIN et REGISTER
  const [userConnected, setUserConnected] = useState(auth); // useState({})
  const [userLoading,setUserLoading] = useState(authBool)  // useState(null)


  console.log("session : ", userConnected)

  //puis ici dès que on se connecte je relance le useEffect
    useEffect(() => {
      console.log("App.js :: User :  ", userConnected);

     /* // quand on avorte le projet on a à faire ça
      sessionStorage.removeItem("auth")
      setUserLoading(false) */
    
    }, [userLoading])

    /* useEffect(()=>{
      sessionStorage.removeItem("auth")
    },[]) */


  return (
    <div className="mb-10">
      {/* je passe a tout mes Route le userConnected et setUserConnected ainsi je peux acçeder a n'important quel composant en utilisante le useContext UserInfoContext */}
      <UserInfoContext.Provider
        value={{ userConnected, setUserConnected, userLoading, setUserLoading }}
      >
        {/* je passe les 2 au cas ou je voudrais modifier le state */}

        <Routes>
          <Route path="/a" element={<PartF />} />
          <Route path="/a/:id" element={<GetWorkUser />} />

          <Route path="/" element={<Welcome />}>
            <Route index="main" element={<Main />} />
            <Route path="nous-contacter" element={<Contactez />} end />
            <Route
              path="login"
              element={
                <Login
                  setUserInfo={setUserConnected}
                  setLoading={setUserLoading}
                />
              }
            />
            <Route
              path="register"
              element={
                <Register
                  setUserInfo={setUserConnected}
                  setLoading={setUserLoading}
                />
              }
            />
            <Route path="forgot-password" element={<Forgot />} />
            <Route
              path="association/:associationID"
              element={<Association />}
            />
          </Route>

          {/* user dashboard */}

          {/* je suis sûr que ces Route et composant s afficheront quand le USER se connecte ou se login  */}
          {userLoading /* je peux aussi vérifier avec userConnected  */ && (
            <>
              <Route path="/dashboard/user" element={<DashboardU />}>
                <Route index="acceuil" element={<MainU />} />
                <Route path="profile" element={<Account />} />
                <Route path="associations" element={<AssociationAuth />} />
              </Route>

              <Route
                path="/dashboard/user/update"
                element={<UpdateAccount />}
              />
              <Route
                path="/dashboard/user/v1/update"
                element={<UpdateUser />}
              />
              <Route
                path="/dashboard/user/update/password"
                element={<UpdatePass />}
              />
            </>
          )}

          {/* user fin  */}

          {userLoading && userConnected.role === "ADMIN" && (
            <>
              <Route path="/dashboard/admin" element={<DashboardA />}>
                <Route index="main" element={<MainA />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="associations" element={<Associations />} />
                <Route path="bureaus" element={<Bureaus />} />
                <Route path="benevoles" element={<Benevoles />} />
                <Route path="comments" element={<Comments />} />
                <Route path="events" element={<Evenementt />} />
              </Route>
              <Route
                path="/dashboard/admin/association/save"
                element={<AddAssociation />}
              />
              <Route
                path="/dashboard/admin/association/update/:assoId"
                element={<UpdateAssociation />}
              />

              <Route
                path="/dashboard/admin/user/update/:userId"
                element={<UpdateUser person={"admin"} />}
              />

              {/* l'une des meilleurs façons de faire les formulaire */}
              <Route
                path="/dashboard/admin/bureau/update/:bureauId"
                element={<UpdateMembre />}
              />
              <Route
                path="/dashboard/admin/bureau/create"
                element={<AddMembre />}
              />

              <Route
                path="/dashboard/admin/event/create"
                element={<AddEvent />}
              />

              <Route
                path="/dashboard/admin/event/update/:eventId"
                element={<UpdateEvent />}
              />
            </>
          )}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </UserInfoContext.Provider>
    </div>
  );
}

export default App;
