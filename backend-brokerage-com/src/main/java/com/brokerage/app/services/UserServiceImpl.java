package com.brokerage.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brokerage.app.dto.UserDTO;
import com.brokerage.app.entities.User;
import com.brokerage.app.mapper.CustomMapper;
import com.brokerage.app.repository.UserRepository;
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
}
