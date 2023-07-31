package com.m4l0n.kneadly.kneadly.dto;

public record KneadlyUserDTO(
        String id,
        String fullName,
        String emailAddress,
        String phoneNumber,
        String gender
) {
}
