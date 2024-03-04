package com.rentup.request;

import lombok.Data;

import java.sql.Date;

@Data
public class PropertyVisitRequest {
    private Integer userId;
    private Integer propertyId;
    private Date visitDate;
}