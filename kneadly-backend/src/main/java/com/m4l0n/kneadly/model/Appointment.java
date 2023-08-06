package com.m4l0n.kneadly.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Objects;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id", nullable = false)
    private Long appointmentId;

    private LocalDate appointmentDate;
    private LocalTime appointmentTime;

    @ManyToOne
    @JoinColumn(name = "appointment_client_user_id")
    private KneadlyUser appointmentClient;

    @ManyToOne
    @JoinColumn(name = "appointment_therapist_user_id")
    private KneadlyUser appointmentTherapist;

    @Column(name = "appointment_is_confirmed")
    private Boolean appointmentIsConfirmed;
    private String appointmentFeedbackMessage;
    private Integer appointmentFeedbackRating;
    private LocalDate appointmentFeedbackDate;

}
