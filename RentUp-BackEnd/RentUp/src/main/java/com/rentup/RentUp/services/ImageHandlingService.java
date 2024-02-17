package com.rentup.RentUp.services;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.rentup.RentUp.dto.ApiResponse;
import com.rentup.RentUp.entities.User;

public interface ImageHandlingService {
	ApiResponse uploadImage(Integer empId, MultipartFile image) throws IOException, Exception;
	byte[] serveImage(Integer empId) throws IOException, Exception;
	//used for uploading img along with emp details
	void uploadImage(User emp, MultipartFile image) throws IOException;
}