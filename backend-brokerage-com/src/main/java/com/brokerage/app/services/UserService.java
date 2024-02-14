package com.brokerage.app.services;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.brokerage.app.dto.UserDTO;
import com.brokerage.app.entities.User;

public interface UserService {
    UserDTO addUser(UserDTO userDTO, MultipartFile userProfilePicture);
    UserDTO loginUser(String mobileNumber, String password);
	//boolean changePassword(ChangePasswordRequest request);
	
	User findById(Integer userId);
	UserDTO updateUser(Integer userId, String userName, String userEmail, MultipartFile userProfilePicture) throws IOException;
	List<UserDTO> getAllUsers();
}

