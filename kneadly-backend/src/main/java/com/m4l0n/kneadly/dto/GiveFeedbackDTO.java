package com.m4l0n.kneadly.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

public record GiveFeedbackDTO(
        @NotNull(message = "Description cannot be null")
        @NotBlank(message = "Description cannot be blank")
        String description,
        @Min(value = 1, message = "Rating cannot be less than 1")
        @Min(value = 5, message = "Rating cannot be more than 5")
        @NotNull(message = "Rating cannot be null")
        Integer rating,
        @NotNull(message = "Appointment id cannot be null")
        Long appointmentId
) implements Serializable {
}