package com.rentup.services;

import com.rentup.dto.UserDTO;

import java.sql.Date;


public interface PropertyVisitService {
    UserDTO addVisit(Integer userId, Integer propertyId, Date date);

    Boolean isScheduled(Integer userId,Integer propertyId);

	void acceptVisit(int visitId);

	void rejectVisit(int visitId);


}