package com.m4l0n.kneadly.service;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

public interface QueueService {

    void addAppointmentToQueue(Long appointmentId, Long therapistId, String therapistUserEmail);

    void removeAppointmentFromQueue(Long therapistId, String receiptHandle);

    CompletableFuture<Map<String, String>> retrieveAppointmentFromQueue(Long therapistId);

}
