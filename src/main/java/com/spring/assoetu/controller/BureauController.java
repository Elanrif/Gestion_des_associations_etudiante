package com.spring.assoetu.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.assoetu.entity.Association;
import com.spring.assoetu.entity.Bureau;
import com.spring.assoetu.service.BureauService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/bureau")
@CrossOrigin
public class BureauController {

    @Autowired
    private BureauService bureauService ;


    @PostMapping("/v1/save")
    public Bureau saveBureau(@RequestBody Bureau bureau){

        return bureauService.saveBureau(bureau);
    }

    @RequestMapping(value="/saveAll",method = RequestMethod.POST)
    public List<Bureau> saveBureaus(@RequestBody List<Bureau> bureaus){

        return bureauService.saveAllBureau(bureaus) ;
    }

    @PostMapping("/v1/update")
    public Bureau updateBureau(@RequestBody Bureau bureau){

        return bureauService.updateBureau(bureau);
    }

    @RequestMapping(value="/updateAll",method = RequestMethod.POST)
    public List<Bureau> updateBureaus(@RequestBody List<Bureau> bureaus){

        return bureauService.updateAllBureau(bureaus) ;
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable Long id){
        bureauService.deleteBureauById(id);
    }

    @DeleteMapping("/delete")
    public void deleteBureau(@RequestBody Bureau bureau){
        bureauService.deleteBureau(bureau);
    }

    @DeleteMapping("/delete/all")
    public void deleteAll(){
        bureauService.deleteAllBureau();
    }

   @GetMapping("/findAll")
    public List<Bureau> findAll() {
        return bureauService.findAll();
    }

   @GetMapping("/find/{id}")
    public Bureau findById(@PathVariable Long id) {
        return bureauService.findById(id);
    }

    /*on fournit l'id de l'association*/
    @PostMapping("/save/{id}")
    public Bureau saveBureauWithImg(
            @PathVariable("id") Long id,
            @RequestPart("bureau") String bureau,
            @RequestPart(value = "image",required = false) MultipartFile image) throws JsonProcessingException {

        // Convertir la chaîne JSON en objet Association en utilisant Jackson, il ne prends pas en compte le type localDate
        ObjectMapper objectMapper = new ObjectMapper();
        Bureau bur = objectMapper.readValue(bureau, Bureau.class);

        return bureauService.saveWithImg(bur,image,id);
    }

    @PutMapping("/update/{id}")
    public Bureau updateBureauWithImg(
            @PathVariable("id") Long id,
            @RequestPart("bureau") String bureau,
            @RequestPart(value = "image",required = false) MultipartFile image) throws JsonProcessingException {

        // Convertir la chaîne JSON en objet Association en utilisant Jackson, il ne prends pas en compte le type localDate
        ObjectMapper objectMapper = new ObjectMapper();
        Bureau bur = objectMapper.readValue(bureau, Bureau.class);

        return bureauService.updateWithImg(bur,image,id);
    }

    @GetMapping("/findByFirstLastNameStatus")
    public List<Bureau> findByFirstNameContainingOrLastNameContainingOrStatusContaining(
            @RequestParam("name") String value) {
        return bureauService.findByFirstNameContainingOrLastNameContainingOrStatusContaining(value,value,value);
    }
    @GetMapping("/findAllByOrderByFirstNameAsc")
    public List<Bureau> findAllByOrderByFirstNameAsc() {
        return bureauService.findAllByOrderByFirstNameAsc();
    }
    @GetMapping("/findAllByOrderByFirstNameDesc")
    public List<Bureau> findAllByOrderByFirstNameDesc() {
        return bureauService.findAllByOrderByFirstNameDesc();
    }
    @GetMapping("/findAllByOrderByLastNameAsc")
    public List<Bureau> findAllByOrderByLastNameAsc() {
        return bureauService.findAllByOrderByLastNameAsc();
    }
    @GetMapping("/findAllByOrderByLastNameDesc")
    public List<Bureau> findAllByOrderByLastNameDesc() {
        return bureauService.findAllByOrderByLastNameDesc();
    }

    /* @JsonIgnore se trouve sur l'entité Bureau.
     * step 1 : on fournit l'id de Bureau
     * step 2 : on cherche l'enregistrement Bureau , et on prends l'association par le getter getAssociation()
     */
    @GetMapping("/{bureauId}/find/association")
    public Association findMembreAssociation(@PathVariable("bureauId") Long id){

        return bureauService.findAssociationFromBureau(id) ;
    }
}
