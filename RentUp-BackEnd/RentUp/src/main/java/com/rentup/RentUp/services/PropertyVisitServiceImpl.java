package com.rentup.RentUp.services;

import com.rentup.RentUp.dto.PropertyDTO;
import com.rentup.RentUp.dto.PropertyVisitDTO;
import com.rentup.RentUp.entities.Property;
import com.rentup.RentUp.entities.PropertyVisit;
import com.rentup.RentUp.entities.User;
import com.rentup.RentUp.mapper.PropertyMapper;
import com.rentup.RentUp.repository.PropertyRepository;
import com.rentup.RentUp.repository.PropertyVisitRepository;
import com.rentup.RentUp.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PropertyVisitServiceImpl implements PropertyVisitService{

    @Autowired
    private PropertyVisitRepository propertyVisitRepo;

    @Autowired
    private PropertyMapper mapper;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PropertyRepository propertyRepo;

    @Override
    public String scheduleVisit(PropertyVisitDTO propertyVisitDTO) {
        PropertyVisit propertyVisit  = mapper.mapVisitRequestToEntity(propertyVisitDTO);
        User user = userRepo.findByContactNumber(propertyVisitDTO.getUser().getContactNumber());
        Property property = propertyRepo.findByPropertyId(propertyVisitDTO.getProperty().getPropertyId());
        user.addPropertyVisited(property);
        property.addVisitor(user);
        int propertiesLeft = user.getPropertiesLeft();
        propertiesLeft--;
        user.setPropertiesLeft(propertiesLeft);
        userRepo.save(user);
        propertyVisitRepo.save(propertyVisit);
        return "Scheduled";
    }

    @Override
    public Boolean isVisitScheduled(String mobileNumber, PropertyDTO propertyDTO) {
        Property property = propertyRepo.findByPropertyId(propertyDTO.getPropertyId());
        List<User> visitors = property.getVisitors();
        return visitors.contains(userRepo.findByContactNumber(mobileNumber));
    }
}
