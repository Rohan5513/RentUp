package com.rentup.RentUp.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.*;

import java.sql.Date;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(name = "contact_number", nullable = false, length = 20)
    private String contactNumber;

    @Lob
    @Column(name = "profile_picture")
    private byte[] profilePicture;

    @Column(name = "properties_left")
    private Integer propertiesLeft;

    @Column(name ="subscription_type", columnDefinition = "VARCHAR(10) DEFAULT NULL")
    private String subscriptionType;

    @Column(name ="subscription_start_date")
    private Date subscriptionStartDate = null;

    @Column(name ="subscription_end_date")
    private Date subscriptionEndDate = null;

}