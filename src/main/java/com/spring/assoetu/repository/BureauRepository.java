package com.spring.assoetu.repository;

import com.spring.assoetu.entity.Bureau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BureauRepository extends JpaRepository<Bureau,Long> {

    public List<Bureau> findByFirstNameContainingOrLastNameContainingOrStatusContaining(String firstName, String lastName,String status) ;
    public List<Bureau> findAllByOrderByFirstNameAsc() ;
    public List<Bureau> findAllByOrderByFirstNameDesc() ;
    public List<Bureau> findAllByOrderByLastNameAsc() ;
    public List<Bureau> findAllByOrderByLastNameDesc();
}
