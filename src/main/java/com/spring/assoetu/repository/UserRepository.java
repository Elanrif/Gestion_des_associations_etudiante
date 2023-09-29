package com.spring.assoetu.repository;

import com.spring.assoetu.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserInfo,Long> {

    public UserInfo findOneByEmail(String email) ;
    public List<UserInfo> findByFirstNameContainingOrLastNameContaining(String firstName, String lastName) ;
    public List<UserInfo> findAllByOrderByFirstNameAsc() ;
    public List<UserInfo> findAllByOrderByFirstNameDesc() ;
    public List<UserInfo> findAllByOrderByLastNameAsc() ;
    public List<UserInfo> findAllByOrderByLastNameDesc();
}
