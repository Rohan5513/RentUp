package com.rentup.RentUp.repository;

import com.rentup.RentUp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);

    User findByContactNumber(String mobileNumber);
}
