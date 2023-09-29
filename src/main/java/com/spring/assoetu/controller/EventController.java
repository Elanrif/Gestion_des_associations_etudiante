package com.spring.assoetu.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.assoetu.entity.Association;
import com.spring.assoetu.entity.Event;
import com.spring.assoetu.repository.EventRepository;
import com.spring.assoetu.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/evenement")
@CrossOrigin
public class EventController {

    @Autowired
    private EventService eventService ;
    @Autowired
    private EventRepository eventRepository;


    @PostMapping("/v1/save")
    public Event saveEvent(@RequestBody Event event) {
        return eventService.saveEvent(event);
    }

    @PostMapping("/v1/save/all")
    public List<Event> saveAllEvent(@RequestBody List<Event> events) {
        return eventService.saveAllEvent(events);
    }

    @PutMapping("/v1/update")
    public Event updateEvent(@RequestBody Event event) {
        return eventService.updateEvent(event);
    }

   @PutMapping("/v1/update/all")
    public List<Event> updateAllEvent(@RequestBody List<Event> events) {
        return eventService.updateAllEvent(events);
    }

   @DeleteMapping("/delete")
    public void deleteEvent(@RequestBody Event event) {
        eventService.deleteEvent(event);
    }

   @DeleteMapping("/delete/{id}")
    public void deleteEventById(@PathVariable Long id) {

        eventService.deleteEventById(id);
    }

   @DeleteMapping("/delete/all")
    public void deleteAllEvent() {
        eventService.deleteAllEvent();
    }

    @PostMapping("/save/{id}")
    public Event saveWithImg(@RequestPart("evenement") String event,
                             @RequestPart("date") String date,
                             @RequestPart(value="image",required = false) MultipartFile image,
                             @PathVariable Long id)  throws JsonProcessingException {
        // Convertir la chaîne JSON en objet Association en utilisant Jackson, il ne prends pas en compte le type localDate
        ObjectMapper objectMapper = new ObjectMapper();
        Event e = objectMapper.readValue(event, Event.class);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDat = LocalDate.parse(date, formatter);

        e.setDate(localDat);

        return eventService.saveWithImg(e,image,id);
    }

    @PutMapping("/update/{id}")
    public Event updateWithImg(@RequestPart("evenement") String event,
                             @RequestPart("date") String date,
                             @RequestPart(value="image",required = false) MultipartFile image,
                             @PathVariable Long id)  throws JsonProcessingException {
        // Convertir la chaîne JSON en objet Association en utilisant Jackson, il ne prends pas en compte le type localDate
        ObjectMapper objectMapper = new ObjectMapper();
        Event e = objectMapper.readValue(event, Event.class);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDat = LocalDate.parse(date, formatter);

        e.setDate(localDat);

        return eventService.updateWithImg(e,image,id);
    }

    @GetMapping("/findByTypeContainingOrDescpContaining")
    public List<Event> findByTypeContainingOrDescpContaining(@RequestParam("name") String value) {
        return eventService.findByTypeContainingOrDescpContaining(value,value);
    }

    @GetMapping("/findAllByOrderByTypeAsc")
    public List<Event> findAllByOrderByTypeAsc() {
        return eventService.findAllByOrderByTypeAsc();
    }

    @GetMapping("/findAllByOrderByTypeDesc")
    public List<Event> findAllByOrderByTypeDesc() {
        return eventService.findAllByOrderByTypeDesc();
    }

    @GetMapping("/findAllByOrderByDateAsc")
    public List<Event> findAllByOrderByDateAsc() {
        return eventService.findAllByOrderByDateAsc();
    }

    @GetMapping("/findAllByOrderByDateDesc")
    public List<Event> findAllByOrderByDateDesc() {
        return eventService.findAllByOrderByDateDesc();
    }

    @GetMapping("/find/all")
    public List<Event> findAll() {
        return eventService.findAll();
    }

    @GetMapping("/find/{id}")
    public Event findById(@PathVariable Long id) {
        return eventService.findById(id);
    }

    /*retourner l'association de cet eventId : car sur Event @JsonIgnore Association association , on ne peut
    * pas affiché l'association directement sur l'objet Evenement
    */

    @GetMapping("/{eventId}/find/association")
    public Association findAssociationFromEvent(@PathVariable Long eventId) {
        return eventService.findAssociationFromEvent(eventId);
    }


}
