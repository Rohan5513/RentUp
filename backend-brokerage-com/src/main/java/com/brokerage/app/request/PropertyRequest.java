package com.brokerage.app.request;

import java.util.List;

import lombok.Data;

@Data
public class PropertyRequest {
	private int propertyId;
    private List<byte[]> propertyImages;
    private String address;
    private Integer areaId;
    private Integer userId;
   private String status;
    private Double area;
    private String tenantType;
    private String flatType;
}
