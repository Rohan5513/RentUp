package com.brokerage.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brokerage.app.entities.Property;

public interface PropertyRepository extends JpaRepository<Property, Integer> {

}
