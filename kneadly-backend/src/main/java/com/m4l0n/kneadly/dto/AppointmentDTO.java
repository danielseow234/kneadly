package com.m4l0n.kneadly.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * DTO for {@link com.m4l0n.kneadly.model.Appointment}
 */
public record AppointmentDTO(
        Long id,
        @JsonFormat(pattern = "dd/MM/yyyy")
        @DateTimeFormat(pattern = "dd/MM/yyyy")
        LocalDate date,
        @JsonFormat(pattern = "HH:mm")
        @DateTimeFormat(pattern = "HH:mm")
        LocalTime time,
        Long clientUserId,
        Long therapistUserId,
        String therapistUserName,
        Boolean isConfirmed,
        String feedbackMessage,
        Integer feedbackRating,
        @JsonFormat(pattern = "dd/MM/yyyy")
        @DateTimeFormat(pattern = "dd/MM/yyyy")
        LocalDate feedbackDate
) implements Serializable {
}