package com.rentup.controller;

import com.rentup.entities.PropertyVisit;
import com.rentup.repository.PropertyVisitRepository;
import com.rentup.request.PropertyVisitRequest;
import com.rentup.services.PropertyVisitService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/visit")
public class PropertyVisitController {

    @Autowired
    private PropertyVisitService service;
 private PropertyVisitRepository repo ;
    
    public PropertyVisitController(PropertyVisitRepository repo) {
        this.repo = repo;
    }


    @PostMapping("/schedule")
    public ResponseEntity<?> scheduleVisit(@RequestBody PropertyVisitRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.addVisit(request.getUserId(),request.getPropertyId(),request.getVisitDate()));
    }

    @GetMapping("/schedule/{userId}/{propertyId}")
    public ResponseEntity<?> isScheduled(@PathVariable String userId,@PathVariable String propertyId){
        return ResponseEntity.status(HttpStatus.OK).body(service.isScheduled(Integer.parseInt(userId),Integer.parseInt(propertyId)));
    }
    
    @GetMapping("/property-visits/{propertyId}")
    public ResponseEntity<?>  getVisitsByPropertyId(@PathVariable int propertyId) {
    	
    	List<PropertyVisit> p = repo.findByProperty(propertyId);
    	  return ResponseEntity.ok(p);
    			
    }
    
    @PutMapping("/accept/{visitId}")
    public void acceptVisit(@PathVariable int visitId) {
    	service.acceptVisit(visitId);
    }

    @PutMapping("/reject/{visitId}")
    public void rejectVisit(@PathVariable int visitId) {
    	service.rejectVisit(visitId);
    }


}