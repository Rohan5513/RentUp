package com.brokerage.app.dto;

import java.util.List;

import com.brokerage.app.entities.Area;
import com.brokerage.app.entities.FlatType;
import com.brokerage.app.entities.PropertyStatus;
import com.brokerage.app.entities.TenantType;
import com.brokerage.app.entities.User;

import lombok.Data;

@Data
public class PropertyDTO {

    private int propertyId;
    private List<byte[]> propertyImages;
    private String address;
    private Area areaId;
    private User userId;
    private Double carpetArea;
    private PropertyStatus status;
    private TenantType tenantType;
    private FlatType flatType;

    // Constructors, getters, and setters
}
