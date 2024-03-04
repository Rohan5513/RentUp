package com.rentup.request;

import lombok.Data;

@Data
public class UserSignUpRequest {
	
    private String email;
    private String password;
    private String name;
    private String contactNumber;
   
}
