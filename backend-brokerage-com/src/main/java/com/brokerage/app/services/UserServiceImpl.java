package com.brokerage.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brokerage.app.dto.UserDTO;
import com.brokerage.app.entities.User;
import com.brokerage.app.mapper.CustomMapper;
import com.brokerage.app.repository.UserRepository;
import com.brokerage.app.request.ChangePasswordRequest;
import com.brokerage.app.security.PasswordEncoder;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomMapper customMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDTO addUser(UserDTO userDTO) {
        User user = customMapper.mapDTOToUser(userDTO);
        user.setPassword(passwordEncoder.encodePassword(user.getPassword()));
        User savedUser = userRepository.save(user);
        return customMapper.mapUserToDTO(savedUser);
    }

    @Override
    public UserDTO loginUser(String mobileNumber, String password) {
        User user = userRepository.findByContactNumber(mobileNumber);
        if (user != null && passwordEncoder.verifyPassword(password, user.getPassword())) {
            return customMapper.mapUserToDTO(user);
        }
        return null; // Login failed
    }
    
    
//	@Override
//    public boolean changePassword(ChangePasswordRequest request) {
//        // Retrieve the user by userId
//        User user = userRepository.findByContactNumber(request.getContactNumber());
//        request.setOldPassword(passwordEncoder.encodePassword(request.getOldPassword()));
//        request.setNewPassword(passwordEncoder.encodePassword(request.getNewPassword()));
//        if (user == null) {
//            // User not found
//            return false;
//        }
//
//        // Verify the old password
//        if (!user.getPassword().equals(request.getOldPassword())) {
//            // Incorrect old password
//            return false;
//        }
//
//        // Update the user's password with the new one
//        user.setPassword(request.getNewPassword());
//        userRepository.save(user);
//
//        return true;
//    }

	@Override
	public UserDTO updateUser(Integer userId, UserDTO updatedUser) {
		//User user = customMapper.mapDTOToUser(updatedUser);
		User user = userRepository.findById(userId).orElseThrow();
		
		user.setEmail(updatedUser.getUserEmail());
		user.setName(updatedUser.getUserName());
		user.setProfilePicture(updatedUser.getUserProfilePicture());
		
		return customMapper.mapUserToDTO(userRepository.save(user));
	}
}
