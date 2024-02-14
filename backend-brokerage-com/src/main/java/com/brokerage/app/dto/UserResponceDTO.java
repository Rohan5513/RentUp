package com.brokerage.app.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class UserResponceDTO {
	
	    private Integer userId;
	    private String userEmail;
	    private String userPassword;
	    private String userName;
	    private String userContactNumber;
	    private MultipartFile userProfilePicture;
	    private Integer propertiesLeft;

	    // Constructors, getters, and setters
	



}
