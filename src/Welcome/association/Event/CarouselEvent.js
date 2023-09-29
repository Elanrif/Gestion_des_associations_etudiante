import React ,{useContext} from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardMainSection from '../../CardMainSection';
import { AssoContext } from '../../../Dashboard/Admin/Context'; 

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}  block  mr-10 rounded-full bg-black`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}  block ml-5 ms-10 z-10 p-1 rounded-full bg-black`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

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

function CarouselEvent() {

    /* directement desctructurer   */
     const { association } = useContext(AssoContext);

 /*    const items = [
      "/Evenement/images/asso_bien_etre.jpeg",
      "/Evenement/images/asso_culturelle.png",
      "/Evenement/images/association_art.jpg",
      "/Evenement/images/club-debat.jpg",
    ];
 */
    

  return (
    <div className='lg:max-w-[84rem] mx-auto my-10'>
      <Slider {...settings}>
        {association.events &&  association.events.map((item, index) => (
          <div key={index} className="mx-3">
            <CardMainSection event={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CarouselEvent
