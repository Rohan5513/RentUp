package com.rentup.services;

import java.util.List;

public interface AreaService {

    List<String> getAllAreas();

    List<String> getAreaByCityName(String cityName);
}
