package com.rentup.controller;

import com.rentup.services.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/area")
@CrossOrigin(origins = "http://localhost:3000")
public class AreaController {


    @Autowired
    private AreaService areaService;


    @GetMapping("/")
    public ResponseEntity<?> getAllAreas(){
        return ResponseEntity.status(HttpStatus.OK).body(areaService.getAllAreas());
    }

    @GetMapping("/{cityName}")
    public ResponseEntity<?> getAreaByCity(@PathVariable String cityName){
        System.out.println(cityName);
        return ResponseEntity.status(HttpStatus.OK).body(areaService.getAreaByCityName(cityName));
    }
}
