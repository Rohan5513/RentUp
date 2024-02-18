package com.rentup.RentUp.dto;

import com.rentup.RentUp.entities.Property;
import com.rentup.RentUp.entities.User;
import lombok.Data;

import java.time.LocalDate;


@Data
public class PropertyVisitDTO {

    private User user;
    private Property property;
    private LocalDate visitDate;
}
