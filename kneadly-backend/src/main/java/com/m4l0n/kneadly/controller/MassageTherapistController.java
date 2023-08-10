package com.m4l0n.kneadly.controller;

import com.amazonaws.xray.spring.aop.XRayEnabled;
import com.m4l0n.kneadly.response.Response;
import com.m4l0n.kneadly.response.ResponseAPI;
import com.m4l0n.kneadly.response.StatusCode;
import com.m4l0n.kneadly.service.MassageTherapistService;
import io.micrometer.core.annotation.Timed;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;

@RestController
@XRayEnabled
@RequestMapping(value = "/massage-therapist")
public class MassageTherapistController {

    private final MassageTherapistService massageTherapistService;
    private final Counter pageViewsCounter;


    public MassageTherapistController(MassageTherapistService massageTherapistService, MeterRegistry meterRegistry) {
        this.massageTherapistService = massageTherapistService;

        pageViewsCounter = Counter.builder("execution.count.therapist")
                .tag("counter", "therapist")
                .register(meterRegistry);
    }

    @GetMapping("/get-all")
    public Response getAllMassageTherapists() {
        pageViewsCounter.increment();
        try {
            return ResponseAPI.positiveResponse(massageTherapistService.getAllMassageTherapists());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

}
