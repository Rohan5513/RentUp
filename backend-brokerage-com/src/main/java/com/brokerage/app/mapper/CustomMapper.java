package com.brokerage.app.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.brokerage.app.dto.UserDTO;
import com.brokerage.app.dto.UserResponceDTO;
import com.brokerage.app.entities.User;

@Component
public class CustomMapper {
	
	 @Autowired
	    private ByteToMultipartFileConverter byteToMultipartFileConverter;

    public UserDTO mapUserToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setUserEmail(user.getEmail());
        userDTO.setUserPassword(user.getPassword());
        userDTO.setUserName(user.getName());
        userDTO.setUserContactNumber(user.getContactNumber());
        userDTO.setUserProfilePicture(user.getProfilePicture());
        userDTO.setPropertiesLeft(user.getPropertiesLeft());
        ;
        return userDTO;
    }

    public User mapDTOToUser(UserDTO userDTO) {
        User user = new User();
        user.setUserId(userDTO.getUserId());
        user.setEmail(userDTO.getUserEmail());
        user.setPassword(userDTO.getUserPassword());
        user.setName(userDTO.getUserName());
        user.setContactNumber(userDTO.getUserContactNumber());
        user.setProfilePicture(userDTO.getUserProfilePicture());
        user.setPropertiesLeft(userDTO.getPropertiesLeft());
        
        return user;
    }
    
    public UserResponceDTO mapDTOToUserResponce(UserDTO userDTO) {
        UserResponceDTO user = new UserResponceDTO();
        user.setUserId(userDTO.getUserId());
        user.setUserEmail(userDTO.getUserEmail());
        user.setUserPassword(userDTO.getUserPassword());
        user.setUserName(userDTO.getUserName());
        user.setUserContactNumber(userDTO.getUserContactNumber());
        user.setUserProfilePicture(byteToMultipartFileConverter.convert(userDTO.getUserProfilePicture()));
        user.setPropertiesLeft(userDTO.getPropertiesLeft());
        return user;
    }
}

