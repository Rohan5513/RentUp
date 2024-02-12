package com.brokerage.app.services;

import com.brokerage.app.dto.UserDTO;
import com.brokerage.app.request.ChangePasswordRequest;

public interface UserService {
    UserDTO addUser(UserDTO userDTO);
    UserDTO loginUser(String mobileNumber, String password);
	//boolean changePassword(ChangePasswordRequest request);
	UserDTO updateUser(Integer userId, UserDTO updatedUser);
}

