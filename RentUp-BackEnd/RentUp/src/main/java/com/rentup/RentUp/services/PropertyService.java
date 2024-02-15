package com.rentup.RentUp.services;

import com.rentup.RentUp.dto.PropertyDTO;
import com.rentup.RentUp.request.PropertyRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface PropertyService {
    List<PropertyDTO> getAllProperties();
    PropertyDTO getPropertyById(Integer id);
    PropertyDTO saveProperty(PropertyDTO propertyDTO);
    void deleteProperty(Integer id);
    PropertyDTO addProperty(PropertyRequest propertyRequest, List<MultipartFile> images);
}

