package com.rentup.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class UserResponseDTO {

	private Integer userId;
	private String userEmail;
	private String userPassword;
	private String userName;
	private String userContactNumber;
	private MultipartFile userProfilePicture;
	private Integer propertiesLeft;


}
