package com.brokerage.app.services;

import java.util.List;

import com.brokerage.app.dto.PropertyDTO;

public interface PropertyService {
    List<PropertyDTO> getAllProperties();
    PropertyDTO getPropertyById(Integer id);
    PropertyDTO saveProperty(PropertyDTO propertyDTO);
    void deleteProperty(Integer id);
}

