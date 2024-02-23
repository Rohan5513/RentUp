package com.rentup.RentUp.controller;

import com.rentup.RentUp.request.PropertyVisitRequest;
import com.rentup.RentUp.services.PropertyVisitService;
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


    @PostMapping("/schedule")
    public ResponseEntity<?> scheduleVisit(@RequestBody PropertyVisitRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.addVisit(request.getUserId(),request.getPropertyId(),request.getVisitDate()));
    }

    @GetMapping("/schedule/{userId}/{propertyId}")
    public ResponseEntity<?> isScheduled(@PathVariable String userId,@PathVariable String propertyId){
        return ResponseEntity.status(HttpStatus.OK).body(service.isScheduled(Integer.parseInt(userId),Integer.parseInt(propertyId)));
    }


}