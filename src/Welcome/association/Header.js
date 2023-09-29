import React,{useContext} from 'react'
import Slider from "react-slick";
import defs from '../NameAsso';
import CustomizedTimelines from '../components/CcustomizeTimeLines';
import BasicSpeedDial from '../components/BasicSpeedDial';
import { AssoContext } from '../../Dashboard/Admin/Context';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomizeSteeper from '../components/CustomizeSteeper';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={`${className}  block mr-10 `} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`${className}  block ms-10 z-10 `} onClick={onClick} />
  );
}

function Header() {

    
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

    
   const { association } = useContext(AssoContext);

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
    <div>
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
      <Slider {...settings}>
        <React.Fragment>
          <div className="h-[80vh] relative group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-500 to-black group-hover:opacity-75 opacity-50"></div>
            <img
              src={
                association.image &&
                `data:image/jpeg;base64,${association.image}`
              }
              className="h-[80vh] w-full"
            />
            <div className="absolute bg-transparent  shadow-sm p-4 rounded-lg top-[5rem] left-[5rem] bottom-0">
              <h1 className="bg-clip-text text-transparent bg-gradient-to-l from-white to-blue-400 md:text-4xl uppercase font-extrabold ms-[5rem] text-3xl">
                {association.name}
              </h1>
              <div className="mt-5 max-w-5xl md:block xl:mb-5 hidden">
                <CustomizedTimelines
                  def={association.def}
                  expl={association.desc}
                />
              </div>
            </div>
            <div className="absolute bottom-0 group-hover:visible invisible right-5">
              <BasicSpeedDial
                value={association}
                toast={{ follow, unfollow }}
                info={"not"}
                className="group-hover:block invisible"
              />
            </div>
          </div>
        </React.Fragment>
      </Slider>

      <div className="my-5 py-5 bg-pink-50">
        <h1 className="text-2xl my-3 py-5  uppercase text-center font-extrabold ">
          Pourquoi vous devriez vous engagagez dès maintenant?{" "}
        </h1>
        <CustomizeSteeper />
      </div>
    </div>
  );
}

export default Header
