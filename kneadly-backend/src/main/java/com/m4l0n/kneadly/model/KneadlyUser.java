package com.m4l0n.kneadly.model;

import com.m4l0n.kneadly.enums.Gender;
import com.m4l0n.kneadly.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.Objects;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class KneadlyUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;
    private String userName;
    @Column(unique = true)
    private String userEmail;
    private String userPassword;
    @Column(unique = true)
    private String userPhoneNumber;
    @Enumerated(EnumType.ORDINAL)
    private Gender userGender;
    @Enumerated(EnumType.ORDINAL)
    private Role userRole;

}
