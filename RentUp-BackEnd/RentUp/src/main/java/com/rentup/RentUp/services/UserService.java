package com.rentup.RentUp.services;

import java.io.IOException;
import java.util.List;

import com.rentup.RentUp.dto.UserDTO;
import com.rentup.RentUp.entities.User;
import org.springframework.web.multipart.MultipartFile;


public interface UserService {
	UserDTO addUser(UserDTO userDTO);
	UserDTO loginUser(String mobileNumber, String password);

	User findById(Integer userId);
	UserDTO updateUser(Integer userId, String userName, String userEmail, MultipartFile userProfilePicture) throws IOException;
	List<UserDTO> getAllUsers();

	String getSubscriptionType(String mobileNumber);

	Boolean updateSubscription(String mobileNumber,String planType);
}

