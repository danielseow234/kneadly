package com.m4l0n.kneadly.dto;

import com.m4l0n.kneadly.enums.Gender;
import com.m4l0n.kneadly.enums.Role;

import java.io.Serializable;

/**
 * DTO for {@link com.m4l0n.kneadly.model.KneadlyUser}
 */
public record KneadlyUserDTO(
        Long id,
        String fullName,
        String emailAddress,
        String phoneNumber,
        Gender gender,
        Role role
) implements Serializable {
}