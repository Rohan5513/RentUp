package com.rentup.RentUp.services;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.rentup.RentUp.dto.UserDTO;
import com.rentup.RentUp.entities.User;
import com.rentup.RentUp.repository.UserRepository;
import com.rentup.RentUp.request.UserSignUpRequest;
import com.rentup.RentUp.security.PasswordEncoder;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private ImageHandlingService imageService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDTO addUser(UserSignUpRequest request , MultipartFile image) throws IOException, Exception {
		
		User user = mapper.map(request, User.class);
		System.out.println(user.getPassword());
		
		user.setPassword(passwordEncoder.encodePassword(user.getPassword()));
		
		
		
		user.setPassword(passwordEncoder.encodePassword(user.getPassword()));
		imageService.uploadImage(user, image);
		user.setPropertiesLeft(5);
		user.setSubscriptionType("GOLD");
		User savedUser = userRepository.save(user);
		
		return mapper.map(savedUser, UserDTO.class);
	}


    @Override
    public UserDTO loginUser(String mobileNumber, String password) throws IOException, Exception {
    	System.out.println(passwordEncoder.encodePassword("Pass@123"));
        User user = userRepository.findByContactNumber(mobileNumber);


		if (user != null && passwordEncoder.verifyPassword(password, user.getPassword())) {
			return mapper.map(user, UserDTO.class);
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
	public UserDTO updateUser(Integer userId, String userName, String userEmail, MultipartFile userProfilePicture) throws IOException, Exception {
		User user = userRepository.findById(userId).orElseThrow();

		user.setEmail(userEmail);
		user.setName(userName);
		byte[] userProfilePictureBytes = null;
		try {
			if (userProfilePicture != null) {
				userProfilePictureBytes = userProfilePicture.getBytes();
			}
		} catch (IOException e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
		//user.setProfilePicture(userProfilePictureBytes);
		return mapper.map(userRepository.save(user),UserDTO.class);

	}



    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        //List<UserDTO> userDTOList = users.stream().map(user->customMapper.mapUserToDTO(user)).toList();
       // return userDTOList;
        return null;
    }

	@Override
	public String getSubscriptionType(String mobileNumber) {
		User user = userRepository.findByContactNumber(mobileNumber);
		if(!(isSubscriptionLeft(user))){
			user.setPropertiesLeft(5);
			user.setSubscriptionStartDate(null);
			user.setSubscriptionEndDate(null);
			user.setSubscriptionType(null);
			userRepository.save(user);
		}
		return user.getSubscriptionType();
	}


	public boolean isSubscriptionLeft(User user){
		Date endDate = user.getSubscriptionEndDate();
		LocalDate currDate = LocalDate.now();
		if(currDate.isAfter(endDate.toLocalDate())){
			return false;
		}
		return true;
	}

	@Override
	public Boolean updateSubscription(String mobileNumber, String planType) {
		User userEntity = userRepository.findByContactNumber(mobileNumber);
		userEntity.setSubscriptionType(planType.toUpperCase());
		if(planType.equalsIgnoreCase("silver")){
			userEntity.setPropertiesLeft(15);
		} else if (planType.equalsIgnoreCase("gold")) {
			userEntity.setPropertiesLeft(35);
		}
		else{
			userEntity.setPropertiesLeft(Integer.MAX_VALUE);
		}
		LocalDate startDate = LocalDate.now();
		Date sqlStartDate = Date.valueOf(startDate);
		Date sqlEndDate = Date.valueOf(startDate.plusMonths(1));
		userEntity.setSubscriptionStartDate(sqlStartDate);
		userEntity.setSubscriptionEndDate(sqlEndDate);
		userRepository.save(userEntity);
		return true;
	}

}
