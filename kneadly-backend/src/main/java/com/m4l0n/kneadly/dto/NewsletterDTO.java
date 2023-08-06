package com.m4l0n.kneadly.dto;

import jakarta.validation.constraints.NotNull;

public record NewsletterDTO(
        @NotNull(message = "Topic cannot be null")
        String topic,
        @NotNull(message = "Message cannot be null")
        String message
) {
}
