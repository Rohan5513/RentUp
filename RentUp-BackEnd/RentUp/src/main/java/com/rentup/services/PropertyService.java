package com.rentup.services;

import com.rentup.dto.PropertyDTO;
import com.rentup.request.PropertyRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface PropertyService {
    List<PropertyDTO> getAllProperties();
    PropertyDTO getPropertyById(Integer id);
    PropertyDTO saveProperty(PropertyDTO propertyDTO);
    void deleteProperty(Integer id);
    PropertyDTO addProperty(PropertyRequest propertyRequest, List<MultipartFile> images);
    public List<PropertyDTO> getPropertiesByUserId(Integer userId);
    void updatePropertyStatusToRented(Integer propertyId);
}

