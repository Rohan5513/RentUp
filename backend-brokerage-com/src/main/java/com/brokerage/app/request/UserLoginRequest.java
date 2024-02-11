package com.brokerage.app.request;

import lombok.Data;

@Data
public class UserLoginRequest {
    private String mobileNumber;
    private String password;

    // Constructors, getters, and setters
}

