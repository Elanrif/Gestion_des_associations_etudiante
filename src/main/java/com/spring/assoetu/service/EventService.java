package com.spring.assoetu.service;

import com.spring.assoetu.entity.Association;
import com.spring.assoetu.entity.Event;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface EventService {
    public Event saveEvent(Event event) ;
    public List<Event> saveAllEvent(List<Event> events) ;
    public Event updateEvent(Event event);
    public List<Event> updateAllEvent(List<Event> events) ;
    public void deleteEvent(Event event);
    public void deleteEventById(Long id) ;
    public void deleteAllEvent() ;
    public Event saveWithImg(Event event, MultipartFile image, Long associationId) ;
    public Event updateWithImg(Event event,MultipartFile image,Long associationId);
    public List<Event> findByTypeContainingOrDescpContaining(String type, String descp) ;
    public List<Event> findAllByOrderByTypeAsc() ;
    public List<Event> findAllByOrderByTypeDesc() ;
    public List<Event> findAllByOrderByDateAsc() ;
    public List<Event> findAllByOrderByDateDesc();
    public List<Event> findAll() ;
    public Event findById(Long id) ;
    public Association findAssociationFromEvent(Long eventId) ;
}
