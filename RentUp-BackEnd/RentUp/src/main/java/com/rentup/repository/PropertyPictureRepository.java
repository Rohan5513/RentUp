package com.rentup.repository;

import com.rentup.entities.PropertyPicture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyPictureRepository extends JpaRepository<PropertyPicture,Integer> {
}
