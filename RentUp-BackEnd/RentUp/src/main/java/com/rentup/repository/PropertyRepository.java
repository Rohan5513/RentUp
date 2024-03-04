package com.rentup.repository;

import java.util.List;

import com.rentup.entities.Property;
import com.rentup.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PropertyRepository extends JpaRepository<Property, Integer> {

	List<Property> findByUser(User user);

}
