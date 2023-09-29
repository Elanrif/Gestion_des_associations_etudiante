import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function BasicAccordion() {

    const responses = [
      {
        question: "Qu'est ce que une association étudiante ?",
        reponse:
          "Une association étudiante est une organisation formée par des étudiants au sein d'un établissement d'enseignement supérieur. Elle a pour but de représenter les intérêts des étudiants, de promouvoir des activités et des initiatives variées, de faciliter le développement personnel et le bien-être des membres, ainsi que de contribuer positivement à la vie universitaire et à la communauté.",
      },
      {
        question: "Pourquoi intégrer une association étudiante ?",
        reponse: "Intégrer une association étudiante offre de nombreux avantages, notamment l'opportunité de s'impliquer activement dans la vie étudiante, de développer des compétences en leadership, de rencontrer de nouvelles personnes, d'enrichir son expérience universitaire, de contribuer à des causes importantes et de créer des souvenirs inoubliables."
      },
      {
        question: "Quels sont les postes existants au sein des associations étudiantes ?",
        reponse: "Les associations étudiantes peuvent avoir une variété de postes au sein de leur structure, notamment président, vice-président, trésorier, secrétaire, responsable des événements, responsable des affaires publiques, responsable des médias sociaux, responsable du bien-être, responsable culturel, responsable sportif, et bien d'autres en fonction des besoins et des objectifs spécifiques de l'association."
      },
      {
        question:
          "Quelles sont les principales missions et objectifs des associations étudiantes ?",
        reponse:
          "Les associations étudiantes ont pour mission de représenter les intérêts des étudiants, de promouvoir le bien-être, de favoriser l'engagement communautaire, d'organiser des activités culturelles et sportives, et de faciliter le développement personnel des membres.",
      },
      {
        question:
          "Comment les associations étudiantes sont-elles généralement financées ?",
        reponse:
          "Les associations étudiantes peuvent être financées par des cotisations des membres, des subventions de l'établissement scolaire, des activités de collecte de fonds et des partenariats avec des entreprises locales.",
      },
      {
        question:
          "Quel est le rôle de représentation des associations étudiantes auprès de l'administration de l'établissement ?",
        reponse:
          "Les associations étudiantes représentent les étudiants en faisant remonter leurs préoccupations et en plaidant en faveur de politiques ou de changements qui améliorent la vie étudiante. Elles peuvent également participer à des comités de décision de l'établissement.",
      },
      {
        question:
          "En quoi consistent les activités communautaires et de bénévolat organisées par les associations étudiantes ?",
        reponse:
          "Les activités communautaires et de bénévolat peuvent inclure des projets de service, des collectes de fonds pour des causes sociales, des actions bénévoles dans la communauté locale et des initiatives caritatives visant à aider les personnes dans le besoin.",
      },
      {
        question:
          "Comment les associations étudiantes favorisent-elles le développement personnel et le leadership des étudiants ?",
        reponse:
          "Les associations étudiantes offrent des opportunités de leadership au sein du comité exécutif, de l'organisation d'événements et de la gestion de projets. Elles encouragent également le développement de compétences telles que la communication, la gestion du temps et le travail d'équipe.",
      },
      {
        question:
          "Quels sont les avantages de l'adhésion à une association étudiante pour les étudiants ?",
        reponse:
          "Les avantages de l'adhésion à une association étudiante comprennent l'accès à un réseau social, des opportunités de développement personnel, l'enrichissement de l'expérience étudiante, la possibilité d'influencer les politiques de l'établissement et l'occasion de contribuer positivement à la communauté.",
      },
      {
        question:
          "Comment les associations étudiantes promeuvent-elles la culture, les arts et le bien-être sur le campus ?",
        reponse:
          "Les associations étudiantes organisent des événements culturels, artistiques et sportifs, tels que des expositions, des concerts, des spectacles et des tournois. Elles fournissent également des ressources et des activités visant à améliorer le bien-être mental, physique et émotionnel des étudiants.",
      },
      {
        question:
          "Quelles initiatives les associations étudiantes prennent-elles pour encourager la compréhension interculturelle ?",
        reponse:
          "Les associations étudiantes organisent des activités d'échange culturel, des repas internationaux, des séminaires sur la diversité et des projets de sensibilisation à la culture pour favoriser la compréhension interculturelle entre étudiants locaux et internationaux.",
      },
      // Ajoutez ici d'autres questions et réponses au format similaire
    ];

  return (
    <div className="pt-5">
      {responses.map((reply, index) => (
        <div key={index}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}a-content`}
              id={`panel${index}a-header`}
            >
              <Typography className="text-sm font-mono  hover:text-blue-800 font-extrabold">
                <span className="text-blue-400">{index+1}. </span>{reply.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="max-w-[55rem]">{reply.reponse}</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
}
