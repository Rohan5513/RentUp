package com.rentup.RentUp.services;

import java.util.List;

import com.rentup.RentUp.dto.AreaDTO;

public interface AreaService {

    List<String> getAllAreas();

    List<String> getAreaByCityName(String cityName);

	boolean addArea(AreaDTO area);
}
