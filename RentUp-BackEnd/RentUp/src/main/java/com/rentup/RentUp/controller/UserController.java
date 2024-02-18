package com.rentup.RentUp.controller;

import java.io.IOException;

import com.rentup.RentUp.dto.UserDTO;
import com.rentup.RentUp.request.UserLoginRequest;
import com.rentup.RentUp.request.UserSignUpRequest;

import com.rentup.RentUp.services.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;




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


	@PostMapping(value = "/register")
	public ResponseEntity<?> addUser(@RequestBody UserSignUpRequest request) throws Exception {
		
	
		
			return ResponseEntity.
					status(HttpStatus.CREATED).
					body(userService.addUser(request));
			
		
	}
	
	

	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest loginRequest) throws IOException, Exception {
		UserDTO user = userService.loginUser(loginRequest.getMobileNumber(), loginRequest.getPassword());
		System.out.println(user);
		if (user != null) {
			System.out.println(user);
			return ResponseEntity.ok(user);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}


	@GetMapping("/{mobileNumber}")
	public ResponseEntity<?> getUserByMobileNumber(@PathVariable String mobileNumber){
		return ResponseEntity.status(HttpStatus.OK).body(userService.getUserByMobileNumber(mobileNumber));
	}

	


	@PostMapping("/create_order")
	@ResponseBody
	public String createOrder(@RequestBody String data) throws RazorpayException {
		JSONObject jsonData = new JSONObject(data);
		int amount = jsonData.getInt("price");
		var client = new RazorpayClient("rzp_test_c3HAknCruxSgid","we0dLWDuEcKL4QyJ02kpv4NK");
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("amount",amount*100);
		jsonObject.put("currency","INR");
		jsonObject.put("receipt","txn_235425");

		Order create = client.orders.create(jsonObject);

		return create.toString();
	}


	@GetMapping("/subscription_type/{mobileNumber}")
	public String getSubsricptionType(@PathVariable String mobileNumber){
		return userService.getSubscriptionType(mobileNumber);
	}

	@PutMapping("/{mobileNumber}/{newPass}")
	public ResponseEntity<?> updatePassWord(@PathVariable String mobileNumber,@PathVariable String newPass){
		return ResponseEntity.status(HttpStatus.OK).body(userService.changePassword(mobileNumber,newPass));
	}

	@PutMapping("/subscription/{mobileNumber}/{planType}")
	public ResponseEntity<?> updateSubscription(@PathVariable String mobileNumber,@PathVariable String planType){
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(userService.updateSubscription(mobileNumber,planType));
	}

	@GetMapping("/{mobileNumber}/properties")
	public ResponseEntity<?> getUsersPropertiesLeft(@PathVariable String mobileNumber){
		System.out.println(mobileNumber);
		return null;
	}


}
