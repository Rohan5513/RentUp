package com.rentup.RentUp.request;

import lombok.Data;

@Data
public class UserLoginRequest {
    private String mobileNumber;
    private String password;

}

