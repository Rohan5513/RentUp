package com.rentup.RentUp.request;

import lombok.Data;

import java.sql.Date;

@Data
public class PropertyVisitRequest {
    private Integer userId;
    private Integer propertyId;
    private Date visitDate;
}