package com.rentup.repository;

import com.rentup.entities.Property;
import com.rentup.entities.PropertyPicture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PropertyPictureRepository extends JpaRepository<PropertyPicture,Integer> {
    PropertyPicture findByProperty(Optional<Property> propertyId);
}
