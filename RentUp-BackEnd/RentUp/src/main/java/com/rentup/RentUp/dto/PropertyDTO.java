package com.rentup.RentUp.dto;


import com.rentup.RentUp.entities.*;
import lombok.Data;

import java.util.List;

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

}
