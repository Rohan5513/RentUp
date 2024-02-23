package com.rentup.RentUp.services;

import com.rentup.RentUp.dto.UserDTO;
import com.rentup.RentUp.entities.Property;
import com.rentup.RentUp.entities.PropertyVisit;
import com.rentup.RentUp.entities.User;
import com.rentup.RentUp.repository.PropertyRepository;
import com.rentup.RentUp.repository.PropertyVisitRepository;
import com.rentup.RentUp.repository.UserRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class PropertyVisitServiceImpl implements PropertyVisitService{

    @Autowired
    private PropertyVisitRepository propertyVisitRepository;
    
    @Autowired
    private ModelMapper mapper;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PropertyRepository propertyRepo;

    @Override
    public UserDTO addVisit(Integer userId, Integer propertyId, Date date) {
        User user = userRepo.findById(userId).orElseThrow();
        int propertiesLeft = user.getPropertiesLeft();
        propertiesLeft--;
        user.setPropertiesLeft(propertiesLeft);
        Property property = propertyRepo.findById(propertyId).orElseThrow();
        PropertyVisit visit = new PropertyVisit();
        User updatedUser = userRepo.save(user);
        visit.setUser(user.getUserId());
        visit.setProperty(property.getPropertyId());
        visit.setVisitDate(date);
        propertyVisitRepository.save(visit);
        return mapper.map(updatedUser,UserDTO.class);
    }

    @Override
    public Boolean isScheduled(Integer userId, Integer propertyId) {
        List<PropertyVisit> visits = propertyVisitRepository.findAll();
        for(PropertyVisit v:visits){
            if( userId==v.getUser() && propertyId==v.getProperty()){
                return true;
            }
        }
        return false;
    }
}