package com.rentup.RentUp.controller;

import java.io.IOException;

import com.rentup.RentUp.dto.UserDTO;
import com.rentup.RentUp.request.UserLoginRequest;
import com.rentup.RentUp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;


	@GetMapping("/all")
	public ResponseEntity<?> getAllUsers(){
		return ResponseEntity.ok(userService.getAllUsers()) ;
	}

	@PostMapping(value = "/register",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> addUser(@RequestBody UserDTO userDTO,@RequestPart("userProfilePicture") MultipartFile userProfilePicture) throws Exception {

		UserDTO newUser = userService.addUser(userDTO,userProfilePicture);
		if (newUser != null) {
			return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest loginRequest) {
		UserDTO user = userService.loginUser(loginRequest.getMobileNumber(), loginRequest.getPassword());
		System.out.println(user);
		if (user != null) {
			System.out.println(user);
			return ResponseEntity.ok(user);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	@PutMapping("/{userId}")
	public ResponseEntity<?> updateUserProfile(@PathVariable Integer userId,
											   @RequestParam("userName") String userName,
											   @RequestParam("userEmail") String userEmail,
											   @RequestParam("userProfilePicture") MultipartFile userProfilePicture) throws IOException {
		UserDTO userDTO = userService.updateUser(userId, userName,userEmail,userProfilePicture);
		System.out.println(userDTO);
		return ResponseEntity.ok(userDTO);

	}
}
