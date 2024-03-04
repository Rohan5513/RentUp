package com.rentup.repository;

import com.rentup.entities.Area;
import com.rentup.entities.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AreaRepository extends JpaRepository<Area, Integer> {
    List<Area> findByCity(City city);

	Area findByAreaName(String areaId);
}