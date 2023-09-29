import React from 'react'
import { GrFacebook, GrMail } from "react-icons/gr";
import { BsTwitter,BsTelephoneFill, BsInstagram } from "react-icons/bs";
import { SiWhatsapp } from "react-icons/si";
import { GiPositionMarker } from "react-icons/gi";
import { FaBlenderPhone } from "react-icons/fa";

function Footer() {

  const items = [
    {
      title: "Qui sommes-nous ?",
      content:
        " Nous sommes une association étudiante dynamique et engagée au sein de notre établissement d'enseignement supérieur. Notre organisation est composée d'étudiants provenant de divers horizons et de différentes filières, tous réunis par une passion commune pour l'engagement, la représentation des étudiants, et la création d'un environnement universitaire enrichissant. Notre mission est de donner une voix aux étudiants, de faciliter le développement personnel, et de favoriser des opportunités de réseautage et de carrière. Nous croyons fermement en la responsabilité sociale et nous nous efforçons d'apporter une contribution positive à notre communauté locale. Ensemble, nous formons une équipe déterminée à faire de notre établissement un lieu où chaque étudiant peut s'épanouir et réussir.",
    },
    {
      title: "Suivez-nous",

      data: [
        {
          icon: <GrFacebook size="2rem" className="text-blue-800" />,
          social_media: "Facebook",
          key: true,
        },
        {
          icon: <BsTwitter size="2rem" className="text-blue-700" />,
          social_media: "Twitter",
          key: true,
        },
        {
          icon: <BsInstagram size="2rem" className="text-orange-600" />,
          social_media: "Instagram",
          key: true,
        },
        {
          icon: <SiWhatsapp size="2rem" className="text-green-500" />,
          social_media: "Whatsapp",
          key: true,
        },
      ],
    },
    {
      title: "Nous-contactez",
      data: [
        {
          icon: <GiPositionMarker size="2rem" className="text-orange-900" />,
          social_media: "Avenue de Sebta Mhannech II 93002- Tétouan-Maroc",
        },
        {
          icon: <BsTelephoneFill size="2rem" className="" />,
          social_media: "(+212) 6 39 99 64 32",
        },
        {
          icon: <FaBlenderPhone size="2rem" className="" />,
          social_media: "(+212) 5 39 99 45 00",
        },
        {
          icon: <GrMail size="2rem" className="text-orange-500" />,
          social_media: "fs.tetouan.contact@gmail.com",
        },
      ],
    },
  ];
  return (
    <div className="pt-10 pb-4 xl:ms-0 xl:text-start  xl:flex justify-evenly space-x-3 ">
      {items.map((item, index) => (
        <div key={index} className='mx-auto my-4 xl:my-0'>
          <h1 className="text-2xl font-extrabold xl:text-start text-center uppercase">{item.title}</h1>
          <aside className="max-w-md mx-auto mt-3">
            {item.content && item.content}
          </aside>

          <div className='mx-auto w-96'>
            {item.data &&
              item.data.map((liste, cle) => {
                return (
                  <div
                    key={cle}
                    className={`group flex space-x-3 text-md items-center my-5 ${liste.key && 'hover:cursor-pointer'}`}
                  >
                    <div> {liste.icon}</div>
                    <div className={`${liste.key && 'group-hover:text-blue-600'}`}>{liste.social_media}</div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Footer
