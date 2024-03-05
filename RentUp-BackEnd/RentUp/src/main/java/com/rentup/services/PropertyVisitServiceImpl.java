package com.rentup.services;


import com.rentup.dto.UserDTO;
import com.rentup.entities.Property;
import com.rentup.entities.PropertyVisit;
import com.rentup.entities.PropertyVisitStatus;
import com.rentup.entities.User;
import com.rentup.repository.PropertyRepository;
import com.rentup.repository.PropertyVisitRepository;
import com.rentup.repository.UserRepository;
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
        visit.setStatus(PropertyVisitStatus.WAITING);
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

	@Override
	public void acceptVisit(int visitId) {
		PropertyVisit visit = propertyVisitRepository.findById(visitId).orElseThrow() ;
		visit.setStatus(PropertyVisitStatus.ACCEPTED);
		 propertyVisitRepository.save(visit);
		
	}

	@Override
	public void rejectVisit(int visitId) {
		PropertyVisit visit = propertyVisitRepository.findById(visitId).orElseThrow() ;
		visit.setStatus(PropertyVisitStatus.REJECTED);
		 propertyVisitRepository.save(visit);
		
	}
}