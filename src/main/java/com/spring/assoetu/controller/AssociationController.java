package com.spring.assoetu.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.spring.assoetu.entity.Association;
import com.spring.assoetu.entity.UserInfo;
import com.spring.assoetu.service.AssociationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/association")
@CrossOrigin
public class AssociationController {

    @Autowired
    private AssociationService associationService ;

    @PostMapping("/v1/save")
    public Association saveAssociation(@RequestBody Association association){

        return associationService.saveAssociation(association);
    }

    @GetMapping("/benevole/integrated/{userInfo}/{assoId}")
    public ResponseEntity<Association> saveBenevole(@PathVariable("assoId") Long assoId, @PathVariable("userInfo") Long userInfo) {

       Association association = associationService.saveBenevole(assoId,userInfo);

       if(association == null){

           return new ResponseEntity("Veuillez vérifier vos informations", HttpStatus.BAD_REQUEST) ;
       }
        return new ResponseEntity(association, HttpStatus.OK) ;
    }

    @GetMapping("/benevole/des_integrated/{userInfo}/{assoId}")
    public ResponseEntity<Association> removeBenevole(@PathVariable Long assoId,@PathVariable("userInfo") Long userInfo) {

        Association association = associationService.removeBenevole(assoId,userInfo);
        if(association == null){

            return new ResponseEntity("Veuillez vérifier vos informations", HttpStatus.BAD_REQUEST) ;
        }
        return new ResponseEntity(association, HttpStatus.OK) ;
    }

    @PostMapping("/v2/save")
    public Association savev1AsociationWithImg(@RequestPart("name") String name ,
                                @RequestPart("def") String def,
                                @RequestPart("desc") String desc,
                                @RequestPart("date") String date,
                                @RequestPart(value = "image",required = false) MultipartFile image){

        // Créez un formateur de date avec le format spécifié
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // Utilisez la méthode parse pour convertir la chaîne en LocalDate
        LocalDate localDat = LocalDate.parse(date, formatter);

        Association association = new Association() ;
        association.setName(name);
        association.setDef(def);
        association.setDesc(desc);
        association.setDate(localDat);

        return  associationService.saveAssoWithImg(association,image) ;
    }

    @PutMapping("/save")
    public Association saveAssociationWithImg(@RequestPart("association") String asso,
                                                @RequestPart("date") String date,
                                                @RequestPart(value = "image",required = false) MultipartFile image) throws JsonProcessingException {

        // Convertir la chaîne JSON en objet Association en utilisant Jackson, il ne prends pas en compte le type localDate
        ObjectMapper objectMapper = new ObjectMapper();
        Association association = objectMapper.readValue(asso, Association.class);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDat = LocalDate.parse(date, formatter);

        association.setDate(localDat);

        return associationService.saveAssoWithImg(association,image);
    }

    @RequestMapping(value="/saveAll",method = RequestMethod.POST)
    public List<Association> saveAssociations(@RequestBody List<Association> associations){

        return associationService.saveAllAssociation(associations) ;
    }

    @PutMapping("/update")
    public Association updateAssociationWithImg(@RequestPart("association") String asso,
                                         @RequestPart("date") String date,
                                         @RequestPart(value = "image",required = false) MultipartFile image) throws JsonProcessingException {

        // Convertir la chaîne JSON en objet Association en utilisant Jackson, il ne prends pas en compte le type localDate
        ObjectMapper objectMapper = new ObjectMapper();
        Association association = objectMapper.readValue(asso, Association.class);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDat = LocalDate.parse(date, formatter);

        association.setDate(localDat);

        return associationService.updateAssoWithImg(association,image);
    }

    @RequestMapping(value="/updateAll",method = RequestMethod.POST)
    public List<Association> updateAssociations(@RequestBody List<Association> associations){

        return associationService.updateAllAssociation(associations) ;
    }

    @GetMapping("/find/{id}")
    public Association findAssociation(@PathVariable("id") Long id){

        return associationService.findOneAsociation(id);
    }

    @GetMapping("/find/all")
    public List<Association> findAllAssociation(){

        return associationService.findAllAssociation();
    }


    @GetMapping("/findByName/containing")
    public List<Association> findByNameContaining(@RequestParam("name") String name){

        return associationService.findByNameContaining(name);
    }


    @GetMapping("/findAllByOrderByNameAsc")
    public List<Association> findAllByOrderByNameAsc(){

        return associationService.findAllByOrderByNameAsc() ;
    }

    @GetMapping("/findAllByOrderByNameDesc")
    public List<Association> findAllByOrderByNameDesc(){

        return associationService.findAllByOrderByNameDesc();
    }

    @GetMapping("/findAllByOrderByDateAsc")
    public List<Association> findAllByOrderByDateAsc(){

        return associationService.findAllByOrderByDateAsc();
    }

    @GetMapping("/findAllByOrderByDateDesc")
    public List<Association> findAllByOrderByDateDesc(){

        return associationService.findAllByOrderByDateDesc();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable Long id){
        associationService.deleteAssociationById(id);
    }

    @DeleteMapping("/delete")
    public void deleteAssociation(@RequestBody Association association){
        associationService.deleteAssociation(association);
    }

    @DeleteMapping("/delete/all")
    public void deleteAll(){
        associationService.deleteAllAssociation();
    }


}
