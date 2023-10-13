package com.spring.assoetu.repository;

import com.spring.assoetu.entity.Association;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssociationRepository extends JpaRepository<Association,Long> {
    List<Association> findByNameContaining(String name) ;
    List<Association> findAllByOrderByNameAsc();
    List<Association> findAllByOrderByNameDesc();
    List<Association> findAllByOrderByDateAsc();
    List<Association> findAllByOrderByDateDesc();

}
