import React,{useState,useEffect} from 'react'
import BasicSpeedDial from './components/BasicSpeedDial';
import Mainsection from './Mainsection';
import MainAside from './MainAside';
import NewSletter from './NewSletter';
import Slider from "react-slick";
import CustomizedTimelines from './components/CcustomizeTimeLines';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import BackDrop from '../BackDrop';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function SampleNextArrow(props) {

  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}  block mr-10 `}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}  block ms-10 z-10 `}
      onClick={onClick}
    />
  );
}


function Main() {

   const navigate = useNavigate(); 

   const [associations, setAssociations] = useState([])


   const settings = {
     dots: true,
     infinite: true,
     slidesToShow: 1,
     slidesToScroll: 1,
     nextArrow: <SampleNextArrow  />,
     prevArrow: <SamplePrevArrow  />,
     responsive: [
       {
         breakpoint: 1024,
         settings: {
           slidesToShow: 1,
           slidesToScroll: 1,
           infinite: true,
           dots: true,
         },
       },
       {
         breakpoint: 600,
         settings: {
           slidesToShow: 1,
           slidesToScroll: 1,
           initialSlide: 1,
         },
       },
       {
         breakpoint: 480,
         settings: {
           slidesToShow: 1,
           slidesToScroll: 1,
         },
       },
     ],
   };

   useEffect(() => {
   
       display() ; 
   }, [])

   const display = ()=>{
  
       axios.get("http://localhost:8080/association/find/all")
       .then((response)=>{
         
          setAssociations(response.data)
          console.log("associations : " , response.data )
       }).catch((err)=>{
        console.log("Erreur télechargement d'associaitons : ", err) 
       })

   }

   const follow = () =>
     toast.success("Vous suivez maintenant cette association !", {
       position: "top-right",
       autoClose: 3000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "colored",
     });

   const unfollow = () =>
     toast.warn("Vous ne suivez plus cette association ", {
       position: "top-right",
       autoClose: 3000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "colored",
     });

  

  return (
    <div className="mt-5">
      <div>  
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
      {associations ? (
        <Slider {...settings}>
          {associations.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <div className="h-[80vh] relative group">
                  <div
                    className="absolute hover:cursor-pointer top-0 left-0 w-full h-full bg-gradient-to-b from-slate-500 to-black opacity-75"
                    onClick={() => navigate(`/association/${item.id}`)}
                  ></div>
                  <img
                    src={
                      item.image === null
                        ? "/image/associations/association_art.jpg"
                        : `data:image/jpeg;base64,${item.image}`
                    }
                    className="h-[80vh] w-full hover:cursor-pointer"
                  />
                  <div className="absolute bg-transparent  shadow-sm p-4 rounded-lg top-[5rem] left-[5rem] bottom-0">
                    <h1 className="bg-clip-text text-transparent bg-gradient-to-l from-white to-blue-400 md:text-4xl uppercase font-extrabold ms-[5rem] text-3xl">
                      {item.name}
                    </h1>
                    <div className="mt-5 max-w-5xl md:block xl:mb-5 hidden">
                      <CustomizedTimelines def={item.def} expl={item.desc} />
                    </div>
                  </div>
                  <React.Fragment>
                    <div className="absolute bottom-0 group-hover:visible invisible right-5">
                      <BasicSpeedDial
                        value={item} toast={{ follow,unfollow }}
                        className="group-hover:block invisible"
                      />
                    </div>
                  </React.Fragment>
                </div>
              </React.Fragment>
            );
          })}
        </Slider>
      ) : (
        <div className="h-[80vh] relative group">
          <div className="text-center mt-[40vh]">
            <p className="text-lg font-semibold">
              {" "}
              Association en cours de téléchargement...
            </p>
            <BackDrop />
          </div>
        </div>
      )}
      <Mainsection />
      <MainAside />
      <NewSletter />
    </div>
  );
}

export default Main
