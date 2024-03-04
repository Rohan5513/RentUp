package com.rentup.services;

import java.io.IOException;
import java.util.List;

import com.rentup.dto.UserDTO;
import com.rentup.entities.User;
import org.springframework.web.multipart.MultipartFile;



public interface UserService {
	UserDTO addUser(UserDTO userObject, MultipartFile profilePicture) throws Exception ;
	UserDTO loginUser(String mobileNumber, String password) throws IOException, Exception;

	User findById(Integer userId);
	UserDTO updateUser(Integer userId, String userName, String userEmail) throws Exception ;
	List<UserDTO> getAllUsers();

	String getSubscriptionType(String mobileNumber);

	Boolean updateSubscription(String mobileNumber,String planType);

	Boolean getUserByMobileNumber(String mobileNumber);

	Boolean changePassword(String mobileNumber,String newPass);

	byte[] getProfilePicture(String mobileNumber);
}

