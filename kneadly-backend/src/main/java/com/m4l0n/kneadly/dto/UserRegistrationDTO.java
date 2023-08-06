package com.m4l0n.kneadly.dto;

import com.m4l0n.kneadly.enums.Gender;
import jakarta.validation.constraints.*;

import java.io.Serializable;

/**
 * DTO for {@link com.m4l0n.kneadly.model.KneadlyUser}
 */
public record UserRegistrationDTO(
        @NotBlank(message = "Full name is required")
        @NotNull(message = "Full name is required")
        @Size(min = 3, max = 50, message = "Full name should be between 3 and 50 characters")
        String fullName,
        @Email(message = "Email should be valid")
        String emailAddress,
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", message = "Password should be at least 8 characters long and contain at least one letter and one number")
        String password,
        @Pattern(regexp = "^(?:(?:\\+60|0060)(?:[1]|[0]?[1])[ -]?|[0])[0-9]{2}[ -]?[0-9]{3,4}[ -]?[0-9]{3,4}$", message = "Phone number should be valid")
        String phoneNumber,
        Gender gender
) implements Serializable {
}