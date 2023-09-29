package com.spring.assoetu.service;

import com.spring.assoetu.entity.UserInfo;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {

    public UserInfo login(UserInfo userInfo) ;
    public UserInfo saveUser(UserInfo userInfo) ;
    public UserInfo saveUserWithImg(UserInfo userInfo, MultipartFile image) ;
    public UserInfo updateUserWithImg(UserInfo userInfo, MultipartFile image);
    public List<UserInfo> saveAllUser(List<UserInfo> userInfos) ;
    public UserInfo updateUser(UserInfo userInfo);
    public List<UserInfo> updateAllUser(List<UserInfo> userInfos) ;
    public UserInfo findUserById(Long id) ;
    public List<UserInfo> findAllUsers() ;
    public List<UserInfo> findByFirstNameContainingOrLastNameContaining(String firstName, String lastName) ;
    public List<UserInfo> findAllByOrderByFirstNameAsc() ;
    public List<UserInfo> findAllByOrderByFirstNameDesc() ;
    public List<UserInfo> findAllByOrderByLastNameAsc() ;
    public List<UserInfo> findAllByOrderByLastNameDesc();
    public void deleteUser(UserInfo userInfo);
    public void deleteUserById(Long id) ;
    public void deleteAllUser() ;
}
