package com.m4l0n.kneadly.controller;

import com.m4l0n.kneadly.dto.NewsletterDTO;
import com.m4l0n.kneadly.response.Response;
import com.m4l0n.kneadly.response.ResponseAPI;
import com.m4l0n.kneadly.response.StatusCode;
import com.m4l0n.kneadly.service.NewsletterService;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.Map;

@RestController
@RequestMapping(value = "/newsletter", produces = MediaType.APPLICATION_JSON_VALUE)
public class NewsletterController {

    private final NewsletterService newsletterService;
    private Counter pageViewsCounter;
    private Timer newsletterTimer;
    private MeterRegistry meterRegistry;

    public NewsletterController(NewsletterService newsletterService,  MeterRegistry meterRegistry) {

        this.newsletterService = newsletterService;
        this.meterRegistry = meterRegistry;

        pageViewsCounter = meterRegistry
                .counter("PAGE_VIEWS.Newsletter");

        newsletterTimer = meterRegistry
                .timer("execution.time.newsletter");
    }

    @PostMapping("/subscribe")
    public Response subscribe(@RequestBody Map<String, String> body) {
        long startTime = System.currentTimeMillis();
        pageViewsCounter.increment();
        try {
            newsletterService.subscribe(body.get("emailAddress"));
            return ResponseAPI.emptyPositiveResponse();
        } catch (Exception e) {
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        } finally {
            newsletterTimer.record(Duration.ofMillis(System.currentTimeMillis() - startTime));
        }
    }

    @PostMapping("/send")
    public Response sendNewsletter(@RequestBody @Valid NewsletterDTO newsletterDTO) {
        long startTime = System.currentTimeMillis();
        pageViewsCounter.increment();
        try {
            newsletterService.sendNewsletter(newsletterDTO);
            return ResponseAPI.emptyPositiveResponse();
        } catch (Exception e) {
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        } finally {
            newsletterTimer.record(Duration.ofMillis(System.currentTimeMillis() - startTime));
        }
    }

}
