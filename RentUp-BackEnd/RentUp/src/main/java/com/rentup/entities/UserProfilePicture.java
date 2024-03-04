package com.rentup.entities;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_profile_picture")
@Data
public class UserProfilePicture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Lob
    @Column(length = 1000000000)
    private byte[] content;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

}
