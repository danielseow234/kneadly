package com.m4l0n.kneadly.dto;

import jakarta.validation.constraints.Email;

import java.io.Serializable;

/**
 * DTO for {@link com.m4l0n.kneadly.model.KneadlyUser}
 */
public record UserLoginDTO(
        @Email(message = "Email should be valid")
        String emailAddress,
        String password
) implements Serializable {
}