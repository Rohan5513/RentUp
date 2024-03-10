package com.rentup.services;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.rentup.dto.PropertyDTO;
import com.rentup.entities.Property;
import com.rentup.entities.PropertyPicture;
import com.rentup.entities.PropertyStatus;
import com.rentup.entities.User;
import com.rentup.mapper.PropertyMapper;
import com.rentup.repository.AreaRepository;
import com.rentup.repository.PropertyPictureRepository;
import com.rentup.repository.PropertyRepository;
import com.rentup.repository.UserRepository;
import com.rentup.request.PropertyRequest;
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

    @Autowired
    private PropertyPictureRepository propertyPictureRepository;

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
    public PropertyDTO addProperty(PropertyRequest propertyRequest, MultipartFile image) throws IOException {

        Property property =propertyMapper.mapRequestToEntity(propertyRequest);

        property.setArea(areaRepository.findByAreaName(propertyRequest.getAreaId()));
        property.setUser(userRepository.findById(propertyRequest.getUserId()).orElseThrow() );


        Property savedProperty = propertyRepository.save(property);
        PropertyPicture propertyPicture = new PropertyPicture();
        propertyPicture.setProperty(savedProperty);
        propertyPicture.setContent(image.getBytes());
        propertyPictureRepository.save(propertyPicture);

        return propertyMapper.toDTO(savedProperty);
    }

    private List<byte[]> processImages(List<MultipartFile> images) {

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
		 List<PropertyDTO> propertyDTOs = list.stream()
		            .map(propertyMapper::toDTO)
		            .collect(Collectors.toList());

		 
		return propertyDTOs ;
	}

    @Override
	 public void updatePropertyStatusToRented(Integer propertyId) {
	        Property property = propertyRepository.findById(propertyId)
	                .orElseThrow(() -> new RuntimeException("Property not found with id: " + propertyId));

	        property.setStatus(PropertyStatus.RENTED);
	        propertyRepository.save(property);
	    }

    @Override
    public byte[] getPropertyPicture(Integer propertyId) {
        Optional<Property> property = propertyRepository.findById(propertyId);
        PropertyPicture propertyPicture = propertyPictureRepository.findByProperty(property);

        if(propertyPicture == null){
            return "No image found".getBytes();
        }

        return propertyPicture.getContent();
    }


}

