package com.rentup.RentUp.services;

import static org.apache.commons.io.FileUtils.readFileToByteArray;
import static org.apache.commons.io.FileUtils.writeByteArrayToFile;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.rentup.RentUp.dto.ApiResponse;
import com.rentup.RentUp.entities.User;
import com.rentup.RentUp.repository.UserRepository;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class ImageHandlingServiceImpl implements ImageHandlingService {
	// injecting value of the field read from applicatoin.properties file
	@Value("${file.upload.location}") // field level DI , <property name n value />
	// ${file.upload.location} SpEL :Spring expr language
	private String uploadFolder;

	@Autowired
	private UserRepository userRepo;

	@PostConstruct
	public void init() throws IOException {
		// chk if folder exists --yes --continue
		File folder = new File(uploadFolder);
		if (folder.exists()) {
			System.out.println("folder exists alrdy !");
		} else {
			// no --create a folder
			folder.mkdir();
			System.out.println("created a folder !");
		}
	}

	@Override
	public ApiResponse uploadImage(Integer userId, MultipartFile image) throws Exception {
		// get user from user id
		User user = userRepo.findById(userId).orElseThrow(() -> new Exception("Invalid emp ID!!!!"));
		// user found --> PERSISTENT
		// store the image on server side folder
		String path = uploadFolder.concat(image.getOriginalFilename());
		System.out.println(path);
		// Use FileUtils method : writeByte[] --> File
		writeByteArrayToFile(new File(path), image.getBytes());
		// set image path
		user.setProfilePicture(path);
		
		return new ApiResponse("Image file uploaded successfully for user id " + userId);
	}

	@Override
	public void uploadImage(User user, MultipartFile image) throws IOException {
		// store the image on server side folder
		String path = uploadFolder.concat(image.getOriginalFilename());
		System.out.println(path);
		// Use FileUtils method : writeByte[] --> File
		writeByteArrayToFile(new File(path), image.getBytes());
		// set image path
		user.setProfilePicture(path);
		// OR to store the img directly in DB as a BLOB
		// emp.setImage(image.getBytes());
		System.out.println("Image file uploaded successfully for user " + user.getName());
	}

	@Override
	public byte[] serveImage(Integer userId) throws Exception {
		// get user by id
		User user = userRepo.findById(userId).orElseThrow(() -> new Exception("Invalid emp ID!!!!"));
		// user found --> PERSISTENT
		String path = user.getProfilePicture();
		System.out.println("from serve image  "+path);
		if (path != null) {
			// path ---> File --> byte[]
			byte[] image =  readFileToByteArray(new File(path));
			System.out.println(image.toString());
			return image;
			// OR from DB : return emp.getImage();
		} else
			throw new Exception("Image not yet assigned !!!!");

	}

}
