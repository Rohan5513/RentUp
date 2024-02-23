package com.rentup.RentUp.repository;

import com.rentup.RentUp.entities.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Integer> {

    City findByCityName(String cityName);
}
