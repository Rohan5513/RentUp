package com.brokerage.app.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.brokerage.app.dto.PropertyDTO;
import com.brokerage.app.request.PropertyRequest;

public interface PropertyService {
    List<PropertyDTO> getAllProperties();
    PropertyDTO getPropertyById(Integer id);
    PropertyDTO saveProperty(PropertyDTO propertyDTO);
    void deleteProperty(Integer id);
	PropertyDTO addProperty(PropertyRequest propertyRequest, List<MultipartFile> images);
}

