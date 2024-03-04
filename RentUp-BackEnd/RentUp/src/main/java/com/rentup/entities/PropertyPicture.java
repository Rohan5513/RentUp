package com.rentup.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "property_picture")
@Data
public class PropertyPicture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Lob
    @Column(length = 1000000000)
    private byte[] content;

    @OneToOne
    @JoinColumn(name = "property_id")
    private Property property;
}
