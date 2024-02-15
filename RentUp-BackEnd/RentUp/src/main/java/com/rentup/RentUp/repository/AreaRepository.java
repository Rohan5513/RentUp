package com.rentup.RentUp.repository;

import com.rentup.RentUp.entities.Area;
import com.rentup.RentUp.entities.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AreaRepository extends JpaRepository<Area, Integer> {
    List<Area> findByCity(City city);
}