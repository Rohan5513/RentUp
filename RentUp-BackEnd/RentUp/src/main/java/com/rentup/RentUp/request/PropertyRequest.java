package com.rentup.RentUp.request;

import lombok.Data;

import java.util.List;

@Data
public class PropertyRequest {
    private int propertyId;
    private List<byte[]> propertyImages;
    private String address;
    private String areaId;
    private Integer userId;
    private String status;
    private Double area;
    private String preferredTenant;
    private String flatType;
}
