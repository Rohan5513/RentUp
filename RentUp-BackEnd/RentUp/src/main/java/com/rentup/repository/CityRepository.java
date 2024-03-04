package com.rentup.repository;

import com.rentup.entities.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Integer> {

    City findByCityName(String cityName);
}
