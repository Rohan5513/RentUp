package com.rentup.services;

import com.rentup.entities.City;
import com.rentup.repository.CityRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CityServiceImpl implements CityService{

    @Autowired
    private CityRepository cityRepo;

    @Override
    public List<String> getAllCities() {
        List<City> citiesEntity = cityRepo.findAll();
        List<String> cityNames = citiesEntity.stream()
                .map(City::getCityName).collect(Collectors.toList());
        return cityNames;
    }

}
