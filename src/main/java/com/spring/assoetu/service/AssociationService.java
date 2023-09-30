package com.spring.assoetu.service;

import com.spring.assoetu.entity.Association;
import com.spring.assoetu.entity.UserInfo;
import org.apache.catalina.User;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

public interface AssociationService {

    public Association saveAssociation(Association association) ;
    public Association saveAssoWithImg(Association association, MultipartFile image) ;
    public Association updateAssoWithImg(Association association,MultipartFile image);
    public Association saveBenevole(Long assoId, Long userInfoID) ;
    public Association removeBenevole(Long assoId, Long userInfoID)  ;
    public List<Association> saveAllAssociation(List<Association> associations) ;
    public Association updateAssociation(Association association);
    public List<Association> updateAllAssociation(List<Association> associations) ;
    public Association findOneAsociation(Long id);
    public List<Association> findAllAssociation();
    public List<Association> findByNameContaining(String name);
    public List<Association> findByNameContainingv2(List<Association> associations,String name) ;
    public List<Association> findAllByOrderByNameAsc();
    public  List<Association> findAllByOrderByNameDesc();
    public  List<Association> findAllByOrderByDateAsc();
    List<Association> findAllByOrderByDateDesc();
    public void deleteAssociation(Association association);
    public void deleteAssociationById(Long id) ;
    public void deleteAllAssociation() ;
    public List<Association> userInfoAssociations(Long id) ;

}
