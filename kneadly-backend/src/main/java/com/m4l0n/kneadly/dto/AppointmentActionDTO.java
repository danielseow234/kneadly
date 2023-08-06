package com.m4l0n.kneadly.dto;

import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

/**
 * DTO for {@link com.m4l0n.kneadly.model.Appointment}
 */
public record AppointmentActionDTO(
        @NotNull(message = "Id cannot be null")
        Long id,
        @NotNull(message = "Client user id cannot be null")
        Long therapistUserId,
        @NotNull(message = "Receipt handle cannot be null")
        String receiptHandle
) implements Serializable {
}