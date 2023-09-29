package com.spring.assoetu.service;

import com.spring.assoetu.entity.Association;
import com.spring.assoetu.entity.Bureau;
import com.spring.assoetu.repository.AssociationRepository;
import com.spring.assoetu.repository.BureauRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Service
public class BureauServiceImpl implements BureauService {
    @Autowired
    private BureauRepository bureauRepository ;
    @Autowired
    AssociationRepository associationRepository ;

    @Override
    public Bureau saveBureau(Bureau bureau) {
        return bureauRepository.save(bureau);
    }

    @Override
    public List<Bureau> saveAllBureau(List<Bureau> bureaus) {
        return bureauRepository.saveAll(bureaus);
    }

    @Override
    public Bureau updateBureau(Bureau bureau) {
        return bureauRepository.save(bureau);
    }

    @Override
    public List<Bureau> updateAllBureau(List<Bureau> bureaus) {
        return bureauRepository.saveAll(bureaus);
    }

    @Override
    public void deleteBureau(Bureau bureau) {
        bureauRepository.delete(bureau);
    }

    @Override
    public void deleteBureauById(Long id) {
        bureauRepository.deleteById(id);
    }

    @Override
    public void deleteAllBureau() {
        bureauRepository.deleteAll();
    }

    @Override
    public Bureau saveWithImg(Bureau bureau, MultipartFile image,Long associationId) {

        /* initialiser par des desc par défaut selon le status*/
        if(bureau.getStatus() != null){

            String status = bureau.getStatus();

            switch (status) {
                case "Président":
                    bureau.setDesc("Le président est le leader de l'association étudiante. Il est responsable de la direction générale de l'association, de la prise de décisions stratégiques et de la représentation de l'association auprès de l'extérieur. Il supervise les activités et veille à ce que les objectifs de l'association soient atteints.");
                    break;
                case "Vice-Président":
                    bureau.setDesc("Le vice-président assiste le président dans ses fonctions et le remplace en son absence. Il peut également être chargé de domaines spécifiques tels que la coordination des événements, la communication interne, ou d'autres responsabilités assignées par le président.");
                    break;
                case "Sécretaire":
                    bureau.setDesc("Le secrétaire est responsable de la documentation et de l'archivage des activités de l'association. Il rédige les comptes rendus des réunions, gère la correspondance et tient à jour les dossiers des membres. Il joue un rôle essentiel dans la communication interne de l'association.");
                    break;
                case "Trésorier":
                    bureau.setDesc("Le trésorier est en charge de la gestion financière de l'association. Il établit et surveille le budget, gère les transactions financières et tient des registres précis des dépenses et des recettes. Il rend compte régulièrement de la situation financière de l'association.");
                    break;
                case "Responsable des Événements":
                    bureau.setDesc("Le responsable des événements organise et coordonne les activités et événements de l'association. Il planifie les détails logistiques, gère les réservations et s'assure que les événements se déroulent sans accroc.");
                    break;
                case "Responsable des Relations Publiques":
                    bureau.setDesc("Le responsable des relations publiques gère la communication externe de l'association. Il développe des partenariats, gère les médias sociaux, et représente l'association lors d'événements publics.");
                    break;
                case "Responsable de la Formation":
                    bureau.setDesc("Le responsable de la formation s'occupe du développement des compétences des membres de l'association. Il organise des ateliers, des formations et des sessions d'apprentissage pour renforcer les capacités des membres.");
                    break;
                default:
                    bureau.setDesc("");
            }

        }

        Association association = associationRepository.findById(associationId).orElse(null) ;

        if(image != null){

            String fileName = StringUtils.cleanPath(image.getOriginalFilename());
            if(fileName.contains(".."))
            {
                System.out.println("Ficher non valide.");
            }

            try {
                bureau.setImage(Base64.getEncoder().encodeToString(image.getBytes()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }else{

            Bureau b = bureauRepository.findById(bureau.getId()).get();
            bureau.setImage(b.getImage());
        }

        /*méthode utilitaire :aide la synchronisation, on a utilisé les cascades : suffit d'enregistrer l'une des deux entités*/
        association.addBureaus(bureau);

        return bureauRepository.save(bureau);
    }

    @Override
    public Bureau updateWithImg(Bureau bureau, MultipartFile image,Long associationId) {

        if(bureau.getStatus() != null){

            String status = bureau.getStatus();

            switch (status) {
                case "Président":
                    bureau.setDesc("Dirige l'association, prend des décisions stratégiques et la représente à l'extérieur.");
                    break;
                case "Vice-Président":
                    bureau.setDesc("Assiste le président, le remplace en son absence, et peut être responsable de domaines spécifiques.");
                    break;
                case "Sécretaire":
                    bureau.setDesc("Gère la documentation, rédige les comptes rendus, gère la correspondance et tient à jour les dossiers des membres.");
                    break;
                case "Trésorier":
                    bureau.setDesc("Gère les finances, établit et surveille le budget, gère les transactions et tient des registres précis.");
                    break;
                case "Responsable des Événements":
                    bureau.setDesc("Organise et coordonne les activités et événements, planifie les détails logistiques et gère les réservations.");
                    break;
                case "Responsable des Relations Publiques":
                    bureau.setDesc("Gère la communication externe, développe des partenariats et représente l'association lors d'événements publics.");
                    break;
                case "Responsable de la Formation":
                    bureau.setDesc("Développe les compétences des membres, organise des ateliers, des formations et des sessions d'apprentissage.");
                    break;
                default:
                    bureau.setDesc("");
            }


        }

        Association association = associationRepository.findById(associationId).orElse(null) ;

        if(image != null){

            String fileName = StringUtils.cleanPath(image.getOriginalFilename());
            if(fileName.contains(".."))
            {
                System.out.println("Ficher non valide.");
            }

            try {
                bureau.setImage(Base64.getEncoder().encodeToString(image.getBytes()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }else{

            Bureau b = bureauRepository.findById(bureau.getId()).get();
            bureau.setImage(b.getImage());
        }

        association.addBureaus(bureau);
        return bureauRepository.save(bureau);
    }

    @Override
    public List<Bureau> findByFirstNameContainingOrLastNameContainingOrStatusContaining(String firstName, String lastName, String status) {
        return bureauRepository.findByFirstNameContainingOrLastNameContainingOrStatusContaining(firstName,lastName,status);
    }
    @Override
    public List<Bureau> findAllByOrderByFirstNameAsc() {
        return bureauRepository.findAllByOrderByFirstNameAsc();
    }
    @Override
    public List<Bureau> findAllByOrderByFirstNameDesc() {
        return bureauRepository.findAllByOrderByFirstNameDesc();
    }
    @Override
    public List<Bureau> findAllByOrderByLastNameAsc() {
        return bureauRepository.findAllByOrderByLastNameAsc();
    }
    @Override
    public List<Bureau> findAllByOrderByLastNameDesc() {
        return bureauRepository.findAllByOrderByLastNameDesc();
    }

    @Override
    public List<Bureau> findAll() {
        return bureauRepository.findAll();
    }

    @Override
    public Bureau findById(Long id) {
        return bureauRepository.findById(id).get();
    }

    @Override
    public Association findAssociationFromBureau(Long mbreId) {

        Bureau b = bureauRepository.findById(mbreId).orElse(null) ;

        /* vu que dans l'entité bureau : association est en @JsonIgnore, ben on va le prendre par le getter*/
        return b.getAssociation();
    }


}
