package com.rentup.RentUp.services;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.rentup.RentUp.dto.UserDTO;
import com.rentup.RentUp.entities.User;
import com.rentup.RentUp.request.UserSignUpRequest;


public interface UserService {
	UserDTO addUser(UserSignUpRequest request , MultipartFile image) throws IOException, Exception;
	UserDTO loginUser(String mobileNumber, String password) throws IOException, Exception;

	User findById(Integer userId);
	UserDTO updateUser(Integer userId, String userName, String userEmail, MultipartFile userProfilePicture) throws IOException, Exception;
	List<UserDTO> getAllUsers();

	String getSubscriptionType(String mobileNumber);

	Boolean updateSubscription(String mobileNumber,String planType);

	Boolean getUserByMobileNumber(String mobileNumber);

	Boolean changePassword(String mobileNumber,String newPass);
}

