package com.rentup.dto;


import com.rentup.entities.*;
import lombok.Data;

import java.util.List;

@Data
public class PropertyDTO {
	private int propertyId;
	private String address;
	private Area areaId;
	private User userId;
	private Double carpetArea;
	private PropertyStatus status;
	private TenantType tenantType;
	private FlatType flatType;
	private int price ;

}
