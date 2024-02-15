package com.rentup.RentUp.services;

import java.io.IOException;
import java.util.List;

import com.rentup.RentUp.dto.UserDTO;
import com.rentup.RentUp.entities.User;
import com.rentup.RentUp.mapper.CustomMapper;
import com.rentup.RentUp.repository.UserRepository;
import com.rentup.RentUp.security.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomMapper customMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDTO addUser(UserDTO userDTO, MultipartFile userProfilePicture) {
        User user = customMapper.mapDTOToUser(userDTO);
        if (userProfilePicture != null && !userProfilePicture.isEmpty()) {
            try {
                // Convert the MultipartFile to byte[]
                byte[] imageData = userProfilePicture.getBytes();

                // Set the image data in the User entity
                user.setProfilePicture(imageData);
            } catch (IOException e) {
                // Handle processing errors
                e.printStackTrace();
            }
        }
        user.setPassword(passwordEncoder.encodePassword(user.getPassword()));
        User savedUser = userRepository.save(user);
        return customMapper.mapUserToDTO(savedUser);
    }

    @Override
    public UserDTO loginUser(String mobileNumber, String password) {
    	System.out.println(passwordEncoder.encodePassword("Pass@123"));
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
    public User findById(Integer userId) {

        return userRepository.findById(userId).orElseThrow();
    }

    @Override
    public UserDTO updateUser(Integer userId, String userName, String userEmail, MultipartFile userProfilePicture)  {
        User user = userRepository.findById(userId).orElseThrow();

        user.setEmail(userEmail);
        user.setName(userName);
        byte[] userProfilePictureBytes=null;
        try {
        	if(userProfilePicture !=null) {
            userProfilePictureBytes = userProfilePicture.getBytes();
        	}
        } catch (IOException e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        user.setProfilePicture(userProfilePictureBytes);
        return  customMapper.mapUserToDTO(userRepository.save(user));

    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOList = users.stream().map(user->customMapper.mapUserToDTO(user)).toList();
        return userDTOList;
    }
}
