package com.m4l0n.kneadly.dto;

public record UserRegistrationDTO(
        String fullName,
        String emailAddress,
        String password,
        String phoneNumber,
        String gender
) {
}
