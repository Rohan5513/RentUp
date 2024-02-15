package com.rentup.RentUp.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Integer userId;
    private String userEmail;
    private String userPassword;
    private String userName;
    private String userContactNumber;
    private byte[] userProfilePicture;
    private Integer propertiesLeft;
    

}


