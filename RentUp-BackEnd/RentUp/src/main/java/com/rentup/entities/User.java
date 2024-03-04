package com.rentup.entities;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.time.LocalDate;

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



    @Column(name = "properties_left")
    private Integer propertiesLeft;

    @Column(name ="subscription_type", columnDefinition = "VARCHAR(10) DEFAULT NULL")
    private String subscriptionType;

    @Column(name ="subscription_start_date")
    private Date subscriptionStartDate = Date.valueOf(LocalDate.now().minusDays(5));

    @Column(name ="subscription_end_date")
    private Date subscriptionEndDate=Date.valueOf(LocalDate.now().minusDays(5));


}