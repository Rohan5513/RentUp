package com.brokerage.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brokerage.app.dto.UserDTO;
import com.brokerage.app.request.ChangePasswordRequest;
import com.brokerage.app.request.UserLoginRequest;
import com.brokerage.app.services.UserService;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    
 

    @PostMapping(value="/register")
    public ResponseEntity<?> addUser(@RequestBody UserDTO userDTO) throws Exception {
    	
        
        UserDTO newUser = userService.addUser(userDTO);
        if (newUser != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest loginRequest) {
        UserDTO user = userService.loginUser(loginRequest.getMobileNumber(), loginRequest.getPassword());
        if (user != null) {
        	System.out.println(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Integer userId  , @RequestBody UserDTO updatedUser) {
        // Assuming you have a service method to handle password change logic
        UserDTO userDTO = userService.updateUser( userId , updatedUser);
        if (userDTO!=null) {
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed to change password: Incorrect old password");
        }
    }
}
