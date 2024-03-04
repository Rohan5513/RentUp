package com.rentup.mapper;


import com.rentup.dto.PropertyDTO;
import com.rentup.entities.FlatType;
import com.rentup.entities.Property;
import com.rentup.entities.PropertyStatus;
import com.rentup.entities.TenantType;
import com.rentup.request.PropertyRequest;
import org.springframework.stereotype.Component;


@Component
public class PropertyMapper {

    public PropertyDTO toDTO(Property property) {
        PropertyDTO propertyDTO = new PropertyDTO();
        propertyDTO.setPropertyId(property.getPropertyId());
//        propertyDTO.setPropertyImages(property.getPropertyImages());
        propertyDTO.setAddress(property.getAddress());
        propertyDTO.setAreaId(property.getArea());
        propertyDTO.setUserId(property.getUser());
        propertyDTO.setTenantType(property.getTenantType());
        propertyDTO.setFlatType(property.getFlatType());
        propertyDTO.setCarpetArea(property.getCarpet_area());
        propertyDTO.setStatus(property.getStatus());
        propertyDTO.setPrice(property.getPrice());
        return propertyDTO;
    }

    public Property toEntity(PropertyDTO propertyDTO) {
        Property property = new Property();
        property.setPrice(propertyDTO.getPrice());
        property.setPropertyId(propertyDTO.getPropertyId());
//        property.setPropertyImages(propertyDTO.getPropertyImages());
        property.setAddress(propertyDTO.getAddress());
        property.setArea(propertyDTO.getAreaId());
        property.setUser(propertyDTO.getUserId());
        property.setTenantType(propertyDTO.getTenantType());
        property.setCarpet_area(propertyDTO.getCarpetArea());
        property.setFlatType(propertyDTO.getFlatType());
        property.setStatus(propertyDTO.getStatus());
        return property;
    }

    public  Property mapRequestToEntity(PropertyRequest request) {
        Property property = new Property();
        property.setPrice(request.getPrice());
        property.setPropertyId(request.getPropertyId());
        property.setAddress(request.getAddress());
        property.setCarpet_area(request.getArea());
        property.setStatus(PropertyStatus.valueOf("AVAILABLE"));
        property.setTenantType(Enum.valueOf(TenantType.class, request.getPreferredTenant().toUpperCase()));
        property.setFlatType(Enum.valueOf(FlatType.class, request.getFlatType().toUpperCase()));
        return property;
    }

    public  PropertyRequest mapEntityToRequest(Property entity) {
        PropertyRequest request = new PropertyRequest();
        request.setPrice(entity.getPrice());
        request.setPropertyId(entity.getPropertyId());
        request.setAddress(entity.getAddress());
        request.setAreaId(entity.getArea().getAreaName());
        request.setUserId(entity.getUser().getUserId());
        request.setStatus(entity.getStatus().toString());
        request.setArea(entity.getCarpet_area());
        request.setPreferredTenant(entity.getTenantType().name());
        request.setFlatType(entity.getFlatType().name());
        return request;
    }
}

