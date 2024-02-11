package com.brokerage.app.security;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.stereotype.Component;


@Component
public class PasswordEncoder {

    public String encodePassword(String password) {
        try {
            // Create MessageDigest instance for MD5 hashing
            MessageDigest md = MessageDigest.getInstance("MD5");
            
            // Add password bytes to digest
            md.update(password.getBytes());
            
            // Get the hashed password bytes
            byte[] bytes = md.digest();
            
            // Convert byte array to hex string
            StringBuilder sb = new StringBuilder();
            for (byte b : bytes) {
                sb.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
            }
            
            // Return the hashed password as a hex string
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            // Handle NoSuchAlgorithmException
            e.printStackTrace();
            return null;
        }
    }

    public boolean verifyPassword(String password, String hashedPassword) {
        // Encode the provided password and compare it with the hashed password
        return encodePassword(password).equals(hashedPassword);
    }
}

