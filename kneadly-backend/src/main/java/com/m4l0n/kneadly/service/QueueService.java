package com.m4l0n.kneadly.service;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

public interface QueueService {

    void addAppointmentToQueue(Long therapistId, String therapistUserEmail);

}
