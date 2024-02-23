package com.rentup.RentUp.controller;

import java.util.List;

import com.rentup.RentUp.dto.PropertyDTO;
import com.rentup.RentUp.request.PropertyRequest;
import com.rentup.RentUp.services.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@CrossOrigin
@RequestMapping("/properties")
public class PropertyController {
    @Autowired
    private PropertyService propertyService;

    @GetMapping
    public ResponseEntity<List<PropertyDTO>> getAllProperties() {
        List<PropertyDTO> properties = propertyService.getAllProperties();
        return new ResponseEntity<>(properties, HttpStatus.OK);
    }

    @PostMapping(value = "/add")
    public ResponseEntity<?> addProperty(@RequestBody PropertyRequest propertyRequest,
                                         @RequestParam(value = "images" , required = false) List<MultipartFile> images) {
        System.out.println(propertyRequest);
        PropertyDTO addedProperty = propertyService.addProperty(propertyRequest, images);
        System.out.println(addedProperty);
        return ResponseEntity.ok(addedProperty);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyDTO> getPropertyById(@PathVariable Integer id) {
        PropertyDTO property = propertyService.getPropertyById(id);
        return new ResponseEntity<>(property, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PropertyDTO> saveProperty(@RequestBody PropertyDTO propertyDTO) {
        PropertyDTO savedProperty = propertyService.saveProperty(propertyDTO);
        return new ResponseEntity<>(savedProperty, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Integer id) {
        propertyService.deleteProperty(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @GetMapping("/users/{userId}")
    public ResponseEntity<?> getPropertiesByUserId(@PathVariable  Integer userId) {
    	System.out.println(userId);
        List<PropertyDTO> properties = propertyService.getPropertiesByUserId(userId);
        
        return new ResponseEntity<>(properties, HttpStatus.OK);
    }
    
    @PutMapping("/{propertyId}")
    public ResponseEntity<?> updatePropertyStatusToRented(@PathVariable Integer propertyId) {
       
            propertyService.updatePropertyStatusToRented(propertyId);
            return new ResponseEntity<>(HttpStatus.OK);
       
    }
}

