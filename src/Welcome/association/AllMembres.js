import React ,{useState,useContext,useEffect} from 'react'
import Slider from "react-slick";
import UserSlide from './UserSlide';
import { AssoContext } from "../../Dashboard/Admin/Context";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={`${className} px-3 rounded-full bg-black me-10 block  `} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`${className}  block p-3 rounded-full bg-black ms-10 z-10 `} onClick={onClick} />
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

     const asso = [
       {
         id: 1,
         name: "Club des Sciences",
         description:
           "Le club des sciences rassemble les étudiants passionnés par les sciences.",
         date: "2023-09-19",
       },
       {
         id: 2,
         name: "Club de Théâtre",
         description:
           "Le club de théâtre organise des activités théâtrales et des représentations.",
         date: "2023-09-19",
       },
       {
         id: 3,
         name: "Club de Musique",
         description:
           "Le club de musique offre un espace pour les mélomanes et les musiciens.",
         date: "2023-09-19",
       },
       {
         id: 4,
         name: "Club de Développement Personnel",
         description:
           "Le club de développement personnel propose des ateliers et des conférences pour le bien-être des étudiants.",
         date: "2023-09-19",
       },
     ];

   
  
  return (
    <div className="lg:max-w-[84rem] mx-auto my-7">
      <h1 className="capitalize text-4xl font-black my-5 text-center text-slate-500">
        Tout les membres du bureau &nbsp; <span>(+99)</span>
      </h1>
      <Slider {...settings}>
        {association.bureaus && association.bureaus.map((item, index) => (
          <div key={index}>
            <UserSlide avatar={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AllMembres
