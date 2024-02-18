package com.rentup.RentUp.dto;

import com.rentup.RentUp.entities.City;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class AreaDTO {

	
	 
	    private String areaName; 
	    private String city;
}
