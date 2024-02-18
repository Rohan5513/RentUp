package com.rentup.RentUp.repository;

import com.rentup.RentUp.entities.Property;
import com.rentup.RentUp.entities.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface PropertyRepository extends JpaRepository<Property, Integer> {
	List<Property> findByUser(User user);

    Property findByPropertyId(Integer id);

}
