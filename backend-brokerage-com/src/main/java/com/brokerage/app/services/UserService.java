package com.brokerage.app.services;

import com.brokerage.app.dto.UserDTO;

public interface UserService {
    UserDTO addUser(UserDTO userDTO);
    UserDTO loginUser(String mobileNumber, String password);
}

