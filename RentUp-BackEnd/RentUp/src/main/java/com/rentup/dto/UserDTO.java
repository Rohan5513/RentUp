package com.rentup.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class UserDTO {
    private Integer userId;
    private String email;
    private String password;
    private String name;
    private String contactNumber;
    private Integer propertiesLeft;
    private String subscriptionType;
    private Date subscriptionEndDate;
    private byte[] profilePicture;

}


