import React,{useState,useEffect,useContext} from 'react'
import CardMainSection from './CardMainSection'
import cult from "./images/asso_culturelle.png"
import art from "./images/association_art.jpg"
import sport from "./images/asso_sportive.jpg"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}  block mr-5 xl:mr-2 p-1 rounded-full bg-black`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}  block ml-5 xl:ml-[-2rem] z-10 p-1 rounded-full bg-black`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}


function MainAside() {

    const [events, setEvents] = useState([])

    useEffect(() => {
      display() 
    }, [])

    const display = ()=>{

       axios
         .get("/evenement/find/all")
         .then((res) => {
          setEvents(res.data)
         })
         .catch((err) => {
           console.log("err", err);
         });
    }


    const items = [cult,art,sport,art]

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
             slidesToShow: 2,
             slidesToScroll: 2,
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
    <div className="pb-10 px-10  min-h-[40vh] bg-orange-100">
      <div className="max-w-[84rem] mx-auto">
        <h1 className="text-2xl uppercase font-extrabold text-center py-14">
          Découvrir toutes les Évènements Des Associations Étudiantes
        </h1>

        {events.length > 0 && (
          <Slider {...settings}>
            {events
              .sort((a, b) => b.id - a.id)
              .map((item, index) => (
                <div key={index} className="mx-3">
                  <CardMainSection event = {item} />
                </div>
              ))}
          </Slider>
        )}
      </div>
    </div>
  );
}

export default MainAside
