import React from 'react';
import bien_etre from "./images/asso_bien_etre.jpeg"
import etu_general from "./images/asso_etu_gene.jpg"
import asso_art from "./images/association_art.jpg"
import culturelle from "./images/asso_culturelle.png"
import club_debat from "./images/club-debat.jpg"
import humanitaire from "./images/asso-humanitaire_service.jpg"
import asso_sportive from "./images/asso_sportive.jpg"


  const definitions = [
    {
      image : etu_general ,
      name: "Association Étudiante Générale (AEG)",
      def:
        "L'Association Étudiante Générale représente l'ensemble des étudiants de l'établissement. Elle s'occupe généralement de l'organisation d'événements, de la défense des droits des étudiants et de la gestion des affaires étudiantes.",
      desc:
        "L'AEG est l'association principale qui rassemble tous les étudiants de l'établissement. Elle joue un rôle central dans la vie étudiante en coordonnant diverses activités et en représentant les intérêts des étudiants auprès de l'administration de l'école.",
    },
    {
      image :club_debat,
      name: "Club de Débat",
      def:
        "Le Club de Débat réunit des étudiants intéressés par l'art de la rhétorique et de la discussion. Il organise des débats et des discussions sur des sujets variés.",
      desc:
        "Le Club de Débat offre aux étudiants l'opportunité d'améliorer leurs compétences en communication et en argumentation. Les membres participent à des débats sur des questions d'actualité et apprennent à défendre leurs points de vue de manière convaincante.",
    },
    {
      image : humanitaire,
      name: "Associations Humanitaires et de Service",
      def:
        "Ces associations se concentrent sur des actions bénévoles et des projets de service à la communauté.",
      desc:
        "Les associations humanitaires et de service sont axées sur la contribution à la société. Les membres participent à des activités de bénévolat, à des collectes de fonds et à des projets de service pour aider les personnes dans le besoin.",
    },
    {
      image : asso_sportive,
      name: "Associations Sportives",
      def:
        "Si votre établissement dispose d'installations sportives, vous pourriez créer des équipes sportives ou des clubs sportifs.",
      desc:
        "Les associations sportives favorisent la participation à des activités sportives au sein de l'établissement. Elles organisent des entraînements, des compétitions et des événements sportifs pour les étudiants intéressés par le sport.",
    },
    {
      image : asso_art,
      name: "Associations d'Artistes",
      def:
        "Si vous êtes passionné par les arts, vous pourriez créer une association d'artistes pour promouvoir la créativité.",
      desc:
        "Les associations d'artistes rassemblent des étudiants intéressés par les arts visuels, la musique, la danse, la littérature et d'autres formes d'expression artistique. Elles encouragent la créativité et organisent des expositions, des spectacles et des ateliers artistiques.",
    },
    {
      image : bien_etre,
      name: "Associations de Bien-Être Étudiant",
      def:
        "Ces associations se concentrent sur le bien-être mental, physique et émotionnel des étudiants.",
      desc:
        "Les associations de bien-être étudiant mettent l'accent sur la santé mentale, le bien-être physique et les conseils pour les étudiants. Elles proposent des ressources, des événements et des activités visant à améliorer la qualité de vie des étudiants.",
    },
    {
      image : culturelle,
      name: "Associations d'Échange Culturel",
      def:
        "Elles favorisent l'échange interculturel entre étudiants locaux et internationaux.",
      desc:
        "Les associations d'échange culturel encouragent les échanges entre étudiants locaux et internationaux pour promouvoir la compréhension interculturelle. Elles organisent des événements, des repas internationaux et des activités visant à créer des liens entre les différentes cultures présentes sur le campus.",
    },
  ];

 /*  {
    items.map((item, index) => (
      <div className="grid grid-cols-3 gap-x-5 ">
        <div>
          <img src={item.img} />
          {item.nom}
        </div>
        <div>{item.definition}</div>
        <div className="my-2  px-3 bg-slate-50 rounded-xl">
          {item.explication}
        </div>
      </div>
    ));
  } */
  
 /*  return <div></div>; */

export default definitions
