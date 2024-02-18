package com.rentup.RentUp.controller;

import com.rentup.RentUp.dto.PropertyDTO;
import com.rentup.RentUp.dto.PropertyVisitDTO;
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
    private PropertyVisitService propertyService;

    @PostMapping("/schedule")
    public ResponseEntity<?> scheduleVisit(@RequestBody PropertyVisitDTO propertyVisitDTO){
        return ResponseEntity.status(HttpStatus.OK).body(propertyService.scheduleVisit(propertyVisitDTO));
    }

    @PostMapping("/schedule/{mobileNumber}")
    public ResponseEntity<?> isVisitScheduled(@PathVariable String mobileNumber,@RequestBody PropertyDTO propertyDTO){
        return  ResponseEntity.status(HttpStatus.OK).body(propertyService.isVisitScheduled(mobileNumber,propertyDTO));
    }

}
