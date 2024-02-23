package com.rentup.RentUp.services;

import java.sql.Date;

import com.rentup.RentUp.dto.UserDTO;

public interface PropertyVisitService {
    UserDTO addVisit(Integer userId, Integer propertyId, Date date);

    Boolean isScheduled(Integer userId,Integer propertyId);
}