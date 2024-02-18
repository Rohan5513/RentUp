package com.rentup.RentUp.services;

import com.rentup.RentUp.dto.PropertyDTO;
import com.rentup.RentUp.dto.PropertyVisitDTO;

public interface PropertyVisitService {

    String scheduleVisit(PropertyVisitDTO propertyVisitDTO);

    Boolean isVisitScheduled(String mobileNumber, PropertyDTO propertyDTO);
}
