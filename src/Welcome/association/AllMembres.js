import React ,{useState,useContext,useEffect} from 'react'
import Slider from "react-slick";
import UserSlide from './UserSlide';
import { AssoContext } from "../../Dashboard/Admin/Context";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={`${className} px-3 rounded-full  me-[4rem] block  `} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`${className}  block p-3 rounded-full ms-10 z-10 `} onClick={onClick} />
  );
}


function AllMembres() {

     const { association } = useContext(AssoContext);

     const settings = {
       dots: true,
       infinite: true,
       slidesToShow: 3,
       slidesToScroll: 1,
       nextArrow: <SampleNextArrow />,
       prevArrow: <SamplePrevArrow />,
       responsive: [
         {
           breakpoint: 1024,
           settings: {
             slidesToShow: 3,
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

  return (
    <div className="lg:max-w-[84rem] mx-auto my-7">
      <h1 className="capitalize text-4xl font-black my-5 text-center text-slate-500">
        Toute l'équipe du bureau &nbsp; <span></span>
      </h1>
      <Slider {...settings}>
        {association.bureaus &&
          association.bureaus.map((item, index) => (
            <div key={index}>
              <UserSlide avatar={item} />
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default AllMembres
