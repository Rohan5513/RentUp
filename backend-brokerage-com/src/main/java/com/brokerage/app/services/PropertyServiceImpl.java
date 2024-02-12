package com.brokerage.app.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brokerage.app.dto.PropertyDTO;
import com.brokerage.app.entities.Property;
import com.brokerage.app.mapper.PropertyMapper;
import com.brokerage.app.repository.PropertyRepository;

@Service
public class PropertyServiceImpl implements PropertyService {
    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private PropertyMapper propertyMapper;

    @Override
    public List<PropertyDTO> getAllProperties() {
        List<Property> properties = propertyRepository.findAll();
        properties.forEach(property-> property.getArea().getCity());
        return properties.stream()
                .map(propertyMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PropertyDTO getPropertyById(Integer id) {
        Property propertyOptional = propertyRepository.findById(id).orElseThrow();
       
            return propertyMapper.toDTO(propertyOptional);
        
    }

    @Override
    public PropertyDTO saveProperty(PropertyDTO propertyDTO) {
        Property property = propertyMapper.toEntity(propertyDTO);
        Property savedProperty = propertyRepository.save(property);
        return propertyMapper.toDTO(savedProperty);
    }

    @Override
    public void deleteProperty(Integer id) {
        propertyRepository.deleteById(id);
    }
}

