package com.rentup.repository;

import com.rentup.entities.PropertyVisit;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyVisitRepository extends JpaRepository<PropertyVisit,Integer> {

	List<PropertyVisit> findByProperty(int propertyId);
}