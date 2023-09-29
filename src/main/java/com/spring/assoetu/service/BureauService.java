package com.spring.assoetu.service;


import com.spring.assoetu.entity.Association;
import com.spring.assoetu.entity.Bureau;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BureauService  {
    public Bureau saveBureau(Bureau bureau) ;
    public List<Bureau> saveAllBureau(List<Bureau> bureaus) ;
    public Bureau updateBureau(Bureau bureau);
    public List<Bureau> updateAllBureau(List<Bureau> bureaus) ;
    public void deleteBureau(Bureau bureau);
    public void deleteBureauById(Long id) ;
    public void deleteAllBureau() ;
    public Bureau saveWithImg(Bureau bureau, MultipartFile image,Long associationId) ;
    public Bureau updateWithImg(Bureau bureau,MultipartFile image,Long associationId);
    public List<Bureau> findByFirstNameContainingOrLastNameContainingOrStatusContaining(String firstName, String lastName, String status) ;
    public List<Bureau> findAllByOrderByFirstNameAsc() ;
    public List<Bureau> findAllByOrderByFirstNameDesc() ;
    public List<Bureau> findAllByOrderByLastNameAsc() ;
    public List<Bureau> findAllByOrderByLastNameDesc();
    public List<Bureau> findAll() ;
    public Bureau findById(Long id) ;
    public Association findAssociationFromBureau(Long mbreId) ;
}
