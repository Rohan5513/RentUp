package com.rentup.RentUp.controller;

import com.rentup.RentUp.dto.cityDTO;
import com.rentup.RentUp.entities.City;
import com.rentup.RentUp.repository.CityRepository;
import com.rentup.RentUp.services.CityService;


import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/city")
@CrossOrigin(origins = "http://localhost:3000")
public class CityController {

    @Autowired
    private CityService cityService;
    
    @Autowired
    private ModelMapper mapper;
    
    @Autowired
    private CityRepository cityRepo ;

    @GetMapping("/")
    public ResponseEntity<?> getAllCities(){
        return ResponseEntity.status(HttpStatus.OK).body(cityService.getAllCities());
    }
    
    @PostMapping("/add")
    public ResponseEntity<String> addCity(@RequestBody cityDTO city) {
    	   if (cityRepo.existsByCityName(city.getCityName())){
               return ResponseEntity.badRequest().body("City already exists");
           }
    	City entity =  mapper.map(city, City.class);
    	   cityRepo.save(entity);
           return ResponseEntity.ok("City added successfully");
       }
    	
    

}
