package com.spring.assoetu.service;

import com.spring.assoetu.entity.Association;
import com.spring.assoetu.entity.UserInfo;
import com.spring.assoetu.repository.AssociationRepository;
import com.spring.assoetu.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository ;

    @Autowired
    private AssociationRepository associationRepository ;

    @Override
    public UserInfo login(UserInfo userInfo) {

        UserInfo user = userRepository.findOneByEmail(userInfo.getEmail()) ;

        /* pour les String on utilise equals et non == ou !== */
        if(user !=null && userInfo.getPassword().equals(user.getPassword())){

            return user ;
        }
        return null;
    }

    @Override
    public UserInfo saveUser(UserInfo userInfo) {
        return userRepository.save(userInfo);
    }

    @Override
    public UserInfo saveUserWithImg(UserInfo userInfo, MultipartFile image) {

        if(image !=null){
            String fileName = StringUtils.cleanPath(image.getOriginalFilename());
            if(fileName.contains(".."))
            {
                System.out.println("Ficher non valide.");
            }
            try {
                userInfo.setImage(Base64.getEncoder().encodeToString(image.getBytes()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return  userRepository.save(userInfo);
    }

    @Override
    public UserInfo updateUserWithImg(UserInfo userInfo, MultipartFile image) {
        if(image !=null){

            String fileName = StringUtils.cleanPath(image.getOriginalFilename());
            if(fileName.contains(".."))
            {
                System.out.println("Ficher non valide.");
            }

            try {
                userInfo.setImage(Base64.getEncoder().encodeToString(image.getBytes()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            UserInfo u = userRepository.findById(userInfo.getId()).get();  /* j'avais par défaut : .orElse(null)*/
                 userInfo.setImage(u.getImage());
            System.out.println("************** USER WITH IMAGE : **************** " + u.getImage());
        }

        // Vérifier si le rôle est null et lui attribuer "USER" par défaut
        if (userInfo.getRole() == null) {
            userInfo.setRole("USER");
        }

        return userRepository.save(userInfo);
    }

    @Override
    public List<UserInfo> saveAllUser(List<UserInfo> userInfos) {
        return userRepository.saveAll(userInfos);
    }

    @Override
    public UserInfo updateUser(UserInfo userInfo) {
        return userRepository.save(userInfo);
    }

    @Override
    public List<UserInfo> updateAllUser(List<UserInfo> userInfos) {
        return userRepository.saveAll(userInfos);
    }

    @Override
    public UserInfo findUserById(Long id) {

        return userRepository.findById(id).get();
    }

    @Override
    public List<UserInfo> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<UserInfo> findByFirstNameContainingOrLastNameContaining(String firstName, String lastName) {
        return userRepository.findByFirstNameContainingOrLastNameContaining(firstName,lastName);
    }

    @Override
    public List<UserInfo> findAllByOrderByFirstNameAsc() {
        return userRepository.findAllByOrderByFirstNameAsc();
    }

    @Override
    public List<UserInfo> findAllByOrderByFirstNameDesc() {
        return userRepository.findAllByOrderByFirstNameDesc();
    }

    @Override
    public List<UserInfo> findAllByOrderByLastNameAsc() {
        return userRepository.findAllByOrderByLastNameAsc();
    }

    @Override
    public List<UserInfo> findAllByOrderByLastNameDesc() {
        return userRepository.findAllByOrderByLastNameDesc();
    }

    @Override
    public void deleteUser(UserInfo userInfo) {
        userRepository.delete(userInfo);
    }

    @Override
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public void deleteAllUser() {
        userRepository.deleteAll();
    }

    @Override
    public List<UserInfo> findAllBenevoles() {

        List<UserInfo> u = userRepository.findAll() ;
        List<UserInfo> userInfos = new ArrayList<>() ;

        for(UserInfo userInfo : u){

            if(userInfo.getAssociations() != null){
                userInfos.add(userInfo) ;
            }

        }

        return userInfos;
    }

    @Override
    public List<UserInfo> findAllBenevolesByAssociations(Long id) {

        Association association = associationRepository.findById(id).orElse(null) ;

        if(association !=null) {

            return  association.getBenevoles();
        }
        return null;
    }
}
