package com.m4l0n.kneadly.dto;

import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * DTO for {@link com.m4l0n.kneadly.model.Appointment}
 */
public record CreateAppointmentDTO(
        @NotNull(message = "Please enter a valid date")
        LocalDate date,
        @NotNull(message = "Please enter a valid time")
        LocalTime time,
        @NotNull(message = "Please enter a valid client user id")
        Long clientUserId,
        @NotNull(message = "Please enter a valid therapist user id")
        Long therapistUserId
) implements Serializable {
}