package com.rentup.repository;

import com.rentup.entities.User;
import com.rentup.entities.UserProfilePicture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfilePictureRepository extends JpaRepository<com.rentup.entities.UserProfilePicture,Integer> {
    UserProfilePicture findByUser(User user);
}
