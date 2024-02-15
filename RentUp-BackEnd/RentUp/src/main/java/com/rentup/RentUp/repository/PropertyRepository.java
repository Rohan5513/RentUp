package com.rentup.RentUp.repository;

import com.rentup.RentUp.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PropertyRepository extends JpaRepository<Property, Integer> {

}
