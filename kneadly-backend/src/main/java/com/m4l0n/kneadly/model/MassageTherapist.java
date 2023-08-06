package com.m4l0n.kneadly.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Getter
@Setter
@Entity
@Table(name = "massage_therapist")
public class MassageTherapist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "massage_therapist_id", nullable = false)
    private Long massageTherapistId;
    @OneToOne
    @JoinColumn(name = "massage_therapist_user_id")
    private KneadlyUser massageTherapistUser;
    @Column(name = "massage_therapist_rating", precision = 2, scale = 1)
    private BigDecimal massageTherapistRating;
    @Column(name = "massage_therapist_ratings_num")
    private Integer massageTherapistNumberOfRatings;
    private String massageTherapistDescription;
    private String massageTherapistProfilePicture;
    private String massageTherapistStreetAddress;
    private String massageTherapistCity;
    private String massageTherapistState;
    private String massageTherapistZipCode;

    public void addRating(Integer rating) {
        int numRatings = this.getMassageTherapistNumberOfRatings() + 1;
        BigDecimal newRating = (this.getMassageTherapistRating()
                .multiply(BigDecimal.valueOf(this.getMassageTherapistNumberOfRatings()))
                .add(BigDecimal.valueOf(rating)))
                .divide(BigDecimal.valueOf(numRatings), 1, RoundingMode.HALF_UP);
        this.setMassageTherapistRating(newRating);
        this.setMassageTherapistNumberOfRatings(numRatings);
    }
}