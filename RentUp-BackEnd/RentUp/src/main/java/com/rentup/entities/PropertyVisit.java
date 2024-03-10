package com.rentup.entities;


import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Entity
@Table(name = "property_visit")
@Data
public class PropertyVisit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "visit_id")
    private Integer visitId;

    private Integer user;

    private Integer property;

    private Date visitDate;

    
    private PropertyVisitStatus status ;
}