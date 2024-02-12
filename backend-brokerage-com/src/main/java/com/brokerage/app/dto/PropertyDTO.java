package com.brokerage.app.dto;

import com.brokerage.app.entities.Area;
import com.brokerage.app.entities.User;

import lombok.Data;

@Data
public class PropertyDTO {
	private Integer propertyId;

	private String propertyAddress;
	private Area areaId;
	private User userId;
	private String propertyStatus;
	private byte[] propertyImages;

	// getters and setters
}
