package com.spring.assoetu.repository;

import com.spring.assoetu.entity.Bureau;
import com.spring.assoetu.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event,Long> {

    public List<Event> findByTypeContainingOrDescpContaining(String type, String descp) ;
    public List<Event> findAllByOrderByTypeAsc() ;
    public List<Event> findAllByOrderByTypeDesc() ;
    public List<Event> findAllByOrderByDateAsc() ;
    public List<Event> findAllByOrderByDateDesc();
}
