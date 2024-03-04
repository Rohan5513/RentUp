package com.rentup.request;

import lombok.Data;

@Data
public class ChangePasswordRequest {
    private String contactNumber;
    private String oldPassword;
    private String newPassword;
}