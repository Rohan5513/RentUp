package com.rentup.request;

import lombok.Data;

@Data
public class UserLoginRequest {
    private String mobileNumber;
    private String password;

}

