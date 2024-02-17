package com.rentup.RentUp.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "properties")
@Data
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "property_id")
    private int propertyId;

    @ElementCollection
    @CollectionTable(name = "property_images", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "image")
    private List<byte[]> propertyImages;

    @Column(name = "address")
    private String address;

    @ManyToOne
    @JoinColumn(name = "area_id")
    private Area area;

    @Column(name = "carpet_area")
    private Double carpet_area;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private PropertyStatus status;

    @Column(name = "tenant_type")
    @Enumerated(EnumType.STRING)
    private TenantType tenantType;

    @Column(name = "flat_type")
    @Enumerated(EnumType.STRING)
    private FlatType flatType;
    
    private int price ;
}
