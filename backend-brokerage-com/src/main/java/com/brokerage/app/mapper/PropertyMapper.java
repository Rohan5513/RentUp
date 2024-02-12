package com.brokerage.app.mapper;

import org.springframework.stereotype.Component;

import com.brokerage.app.dto.PropertyDTO;
import com.brokerage.app.entities.Property;
import com.brokerage.app.entities.PropertyStatus;

@Component
public class PropertyMapper {

    public PropertyDTO toDTO(Property property) {
        PropertyDTO propertyDTO = new PropertyDTO();
        propertyDTO.setPropertyId(property.getPropertyId());
        propertyDTO.setPropertyImages(property.getPropertyImages());
        propertyDTO.setPropertyAddress(property.getAddress());
        propertyDTO.setAreaId(property.getArea());
        propertyDTO.setUserId(property.getUser());
        propertyDTO.setPropertyStatus(property.getStatus().name().toUpperCase());
        return propertyDTO;
    }

    public Property toEntity(PropertyDTO propertyDTO) {
        Property property = new Property();
        property.setPropertyId(propertyDTO.getPropertyId());
        property.setPropertyImages(propertyDTO.getPropertyImages());
        property.setAddress(propertyDTO.getPropertyAddress());
        property.setArea(propertyDTO.getAreaId());
        property.setUser(propertyDTO.getUserId());
        property.setStatus(PropertyStatus.valueOf(propertyDTO.getPropertyStatus().toUpperCase()));
        return property;
    }
}

