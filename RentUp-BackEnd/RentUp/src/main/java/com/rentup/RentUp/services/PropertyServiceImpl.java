package com.rentup.RentUp.services;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import com.rentup.RentUp.dto.PropertyDTO;
import com.rentup.RentUp.entities.Property;
import com.rentup.RentUp.entities.PropertyStatus;
import com.rentup.RentUp.entities.User;
import com.rentup.RentUp.mapper.PropertyMapper;
import com.rentup.RentUp.repository.AreaRepository;
import com.rentup.RentUp.repository.PropertyRepository;
import com.rentup.RentUp.repository.UserRepository;
import com.rentup.RentUp.request.PropertyRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class PropertyServiceImpl implements PropertyService {
    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private UserRepository userRepository;

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

    @Override
    public PropertyDTO addProperty(PropertyRequest propertyRequest, List<MultipartFile> images) {
        // Validate or process images as needed
        // You may want to save images to a storage service (AWS S3, Google Cloud Storage, etc.) and store the URLs in the database

        Property property =propertyMapper.mapRequestToEntity(propertyRequest);

        property.setArea(areaRepository.findByAreaName(propertyRequest.getAreaId()));
        System.out.println(property);
        property.setUser(userRepository.findById(propertyRequest.getUserId()).orElseThrow() );
        if(images!=null) {
            // Set images in the property entity based on your data model
            property.setPropertyImages(processImages(images));
        }
        property.setPropertyImages(null);

        Property savedProperty = propertyRepository.save(property);
        System.out.println("saved"+savedProperty);
        return propertyMapper.toDTO(savedProperty);
    }

    private List<byte[]> processImages(List<MultipartFile> images) {
        // Implement logic to process and save images, e.g., convert to byte arrays
        // You may use a library like Apache Commons IO to convert MultipartFile to byte array
        // Be aware of potential security issues, validate and sanitize input data

        // Example: Convert MultipartFiles to byte arrays
        List<byte[]> imageBytesList = images.stream()
                .map(this::convertMultipartFileToBytes)
                .collect(Collectors.toList());

        return imageBytesList;
    }

    private byte[] convertMultipartFileToBytes(MultipartFile file) {
        try {
            return file.getBytes();
        } catch (IOException e) {
            // Handle exception (e.g., log, throw custom exception)
            e.printStackTrace();
            return null;
        }
    }
    
	@Override
	public List<PropertyDTO> getPropertiesByUserId(Integer userId) {
		 User user = userRepository.findById(userId).orElseThrow() ;
		 List<Property> list = propertyRepository.findByUser(user); 
		 System.out.println(list);
		 List<PropertyDTO> propertyDTOs = list.stream()
		            .map(propertyMapper::toDTO) // Assuming 'this' refers to the controller instance
		            .collect(Collectors.toList());
		 
		 
		return propertyDTOs ;
	}

	 public void updatePropertyStatusToRented(Integer propertyId) {
	        Property property = propertyRepository.findById(propertyId)
	                .orElseThrow(() -> new RuntimeException("Property not found with id: " + propertyId));

	        property.setStatus(PropertyStatus.RENTED);
	        propertyRepository.save(property);
	    }




}

