package com.m4l0n.kneadly.controller;

import com.m4l0n.kneadly.response.Response;
import com.m4l0n.kneadly.response.ResponseAPI;
import com.m4l0n.kneadly.response.StatusCode;
import com.m4l0n.kneadly.service.MassageTherapistService;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;

@RestController
@RequestMapping(value = "/massage-therapist")
public class MassageTherapistController {

    private final MassageTherapistService massageTherapistService;
    private Counter pageViewsCounter;
    private Timer therapistTimer;
    private MeterRegistry meterRegistry;


    public MassageTherapistController(MassageTherapistService massageTherapistService) {
        this.massageTherapistService = massageTherapistService;
        this.meterRegistry = meterRegistry;

        pageViewsCounter = meterRegistry
                .counter("PAGE_VIEWS.Therapist");

        therapistTimer = meterRegistry
                .timer("execution.time.therapist");
    }

    @GetMapping("/get-all")
    public Response getAllMassageTherapists() {
        long startTime = System.currentTimeMillis();
        pageViewsCounter.increment();
        try {
            return ResponseAPI.positiveResponse(massageTherapistService.getAllMassageTherapists());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        } finally {
            therapistTimer.record(Duration.ofMillis(System.currentTimeMillis() - startTime));
        }
    }

}
