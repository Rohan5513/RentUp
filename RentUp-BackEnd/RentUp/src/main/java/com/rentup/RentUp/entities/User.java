package com.rentup.RentUp.entities;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
    private String profilePicture;

    @Column(name = "properties_left")
    private Integer propertiesLeft;

    @Column(name ="subscription_type", columnDefinition = "VARCHAR(10) DEFAULT NULL")
    private String subscriptionType;

    @Column(name ="subscription_start_date")
    private Date subscriptionStartDate = Date.valueOf(LocalDate.now().minusDays(7));

    @Column(name ="subscription_end_date")
    private Date subscriptionEndDate=Date.valueOf(LocalDate.now().minusDays(7));

    @ManyToMany
    @JoinTable(
            name = "user_visited_properties",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "property_id")
    )
    private List<Property> visitedProperties = new ArrayList<>();


    public void addPropertyVisited(Property property){
        visitedProperties.add(property);
    }

}