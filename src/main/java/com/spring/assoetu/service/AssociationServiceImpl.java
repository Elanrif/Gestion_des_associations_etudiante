package com.spring.assoetu.service;

import com.spring.assoetu.entity.Association;
import com.spring.assoetu.entity.Bureau;
import com.spring.assoetu.entity.UserInfo;
import com.spring.assoetu.repository.AssociationRepository;
import com.spring.assoetu.repository.BureauRepository;
import com.spring.assoetu.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class AssociationServiceImpl implements AssociationService{
    @Autowired
    private AssociationRepository associationRepository ;

    @Autowired
    private BureauRepository bureauRepository ;

    @Autowired
    private UserRepository userRepository ;

    @Override
    public Association saveAssociation(Association association) {
        return associationRepository.save(association);
    }

    @Override
    public Association saveAssoWithImg(Association association, MultipartFile image) {


       if(image !=null){
           String fileName = StringUtils.cleanPath(image.getOriginalFilename());
           if(fileName.contains(".."))
           {
               System.out.println("Ficher non valide.");
           }
           try {
               association.setImage(Base64.getEncoder().encodeToString(image.getBytes()));
           } catch (IOException e) {
               e.printStackTrace();
           }
       }

        return  associationRepository.save(association);
    }

    @Override
    public Association updateAssoWithImg(Association association, MultipartFile image) {


        if(image != null){

            String fileName = StringUtils.cleanPath(image.getOriginalFilename());
            if(fileName.contains(".."))
            {
                System.out.println("Ficher non valide.");
            }

            try {
                association.setImage(Base64.getEncoder().encodeToString(image.getBytes()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }else{

            Association a = associationRepository.findById(association.getId()).get();
            association.setImage(a.getImage());
        }

        return associationRepository.save(association);
    }

    @Override
    public Association saveBenevole(Long assoId, Long userInfoID) {

        Association association = associationRepository.findById(assoId).orElse(null) ;
        UserInfo userInfo = userRepository.findById(userInfoID).orElse(null) ;
        if(association != null && userInfo != null) {

           userInfo.addAssociations(association);//intègre une association
            // je dois soir enregistrer dans BDD l'une des deux entités. et les cascades s'en chargera de sauvegarder l'autre
           return associationRepository.save(association) ;

        }
        return null;
    }

    @Override
    public Association removeBenevole(Long assoId, Long userInfoID) {

        Association association = associationRepository.findById(assoId).orElse(null) ;
        UserInfo userInfo = userRepository.findById(userInfoID).orElse(null) ;
        if(association != null && userInfo != null) {

            userInfo.removeAssociations(association);//désintégrée l'asso

         return   associationRepository.save(association) ; //je dois soir enregistrer dans BDD l'une des deux entités. et les cascades s'en chargera de sauvegarder l'autre
        }

        return null;
    }

    @Override
    public List<Association> saveAllAssociation(List<Association> associations) {
        return associationRepository.saveAll(associations);
    }

    @Override
    public Association updateAssociation(Association association) {
        return associationRepository.save(association);
    }

    @Override
    public List<Association> updateAllAssociation(List<Association> associations) {
        return associationRepository.saveAll(associations);
    }

    @Override
    public Association findOneAsociation(Long id) {
        return associationRepository.findById(id).get();
    }

    @Override
    public List<Association> findAllAssociation() {
        return associationRepository.findAll();
    }

    @Override
    public List<Association> findByNameContaining(String name) {
        return associationRepository.findByNameContaining(name);
    }

    @Override
    public List<Association> findByNameContainingv2(List<Association> associations,String name) {

        List<Association> assos = new ArrayList<>();

        /*for (Association association : associations) {
            if (association.getName().contains(name)) {
                assos.add(association);
            }
        }*/
        for (Association association : associations) {
            for (char character : name.toCharArray()) {
                if (association.getName().contains(String.valueOf(character))) {
                    assos.add(association);
                    break; // Si on trouve un caractère, pas besoin de vérifier les autres
                }
            }
        }

        return assos;
    }

    @Override
    public List<Association> findAllByOrderByNameAsc() {
        return associationRepository.findAllByOrderByNameAsc();
    }

    @Override
    public List<Association> findAllByOrderByNameDesc() {
        return associationRepository.findAllByOrderByNameDesc();
    }

    @Override
    public List<Association> findAllByOrderByDateAsc() {
        return associationRepository.findAllByOrderByDateAsc();
    }

    @Override
    public List<Association> findAllByOrderByDateDesc() {
        return associationRepository.findAllByOrderByDateDesc();
    }

    @Override
    public void deleteAssociation(Association association) {
        associationRepository.delete(association);
    }

    @Override
    public void deleteAssociationById(Long id) {
        associationRepository.deleteById(id);
    }

    @Override
    public void deleteAllAssociation() {
        associationRepository.deleteAll();
    }

    //sur User on JsonIgnore des associations donc on prends l'id et on get les associations.
    @Override
    public List<Association> userInfoAssociations(Long id) {

        UserInfo userInfo = userRepository.findById(id).orElse(null);

        return userInfo.getAssociations();
    }


}
