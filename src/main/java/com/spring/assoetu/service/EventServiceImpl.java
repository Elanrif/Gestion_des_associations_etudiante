package com.spring.assoetu.service;

import com.spring.assoetu.entity.Association;
import com.spring.assoetu.entity.Bureau;
import com.spring.assoetu.entity.Event;
import com.spring.assoetu.repository.AssociationRepository;
import com.spring.assoetu.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Service
public class EventServiceImpl implements EventService{
    @Autowired
    private EventRepository eventRepository ;

    @Autowired
    private AssociationRepository associationRepository ;


    @Override
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public List<Event> saveAllEvent(List<Event> events) {
        return eventRepository.saveAll(events);
    }

    @Override
    public Event updateEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public List<Event> updateAllEvent(List<Event> events) {
        return eventRepository.saveAll(events);
    }

    @Override
    public void deleteEvent(Event event) {

        eventRepository.delete(event);
    }

    @Override
    public void deleteEventById(Long id) {

        eventRepository.deleteById(id);
    }

    @Override
    public void deleteAllEvent() {

        eventRepository.deleteAll();
    }

    @Override
    public Event saveWithImg(Event event, MultipartFile image, Long associationId) {
        Association association = associationRepository.findById(associationId).orElse(null) ;

        if(image != null){

            String fileName = StringUtils.cleanPath(image.getOriginalFilename());
            if(fileName.contains(".."))
            {
                System.out.println("Ficher non valide.");
            }

            try {
                event.setImage(Base64.getEncoder().encodeToString(image.getBytes()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }else{

            Event e = eventRepository.findById(event.getId()).get();
            event.setImage(e.getImage());
        }

        /*méthode utilitaire :aide la synchronisation, on a utilisé les cascades :
         suffit d'enregistrer l'une des deux entités*/
        association.addEvents(event);

        return eventRepository.save(event);
    }

    @Override
    public Event updateWithImg(Event event, MultipartFile image, Long associationId) {
        Association association = associationRepository.findById(associationId).orElse(null) ;

        if(image != null){

            String fileName = StringUtils.cleanPath(image.getOriginalFilename());
            if(fileName.contains(".."))
            {
                System.out.println("Ficher non valide.");
            }

            try {
                event.setImage(Base64.getEncoder().encodeToString(image.getBytes()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }else{

            Event e = eventRepository.findById(event.getId()).get();
            event.setImage(e.getImage());
        }

        /*méthode utilitaire :aide la synchronisation, on a utilisé les cascades :
         suffit d'enregistrer l'une des deux entités*/
        association.addEvents(event);

        return eventRepository.save(event);
    }

    @Override
    public List<Event> findByTypeContainingOrDescpContaining(String type, String descp) {
        return eventRepository.findByTypeContainingOrDescpContaining(type,descp);
    }

    @Override
    public List<Event> findAllByOrderByTypeAsc() {
        return eventRepository.findAllByOrderByDateAsc();
    }

    @Override
    public List<Event> findAllByOrderByTypeDesc() {
        return eventRepository.findAllByOrderByTypeDesc();
    }

    @Override
    public List<Event> findAllByOrderByDateAsc() {
        return eventRepository.findAllByOrderByDateAsc();
    }

    @Override
    public List<Event> findAllByOrderByDateDesc() {
        return eventRepository.findAllByOrderByDateDesc();
    }

    @Override
    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    @Override
    public Event findById(Long id) {
        return eventRepository.findById(id).get();
    }

    @Override
    public Association findAssociationFromEvent(Long eventId) {

        Event e = eventRepository.findById(eventId).orElse(null) ;
        return e.getAssociation();
    }
}
