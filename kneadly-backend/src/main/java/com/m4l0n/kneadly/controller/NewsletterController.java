package com.m4l0n.kneadly.controller;

import com.m4l0n.kneadly.dto.NewsletterDTO;
import com.m4l0n.kneadly.response.Response;
import com.m4l0n.kneadly.response.ResponseAPI;
import com.m4l0n.kneadly.response.StatusCode;
import com.m4l0n.kneadly.service.NewsletterService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(value = "/newsletter", produces = MediaType.APPLICATION_JSON_VALUE)
public class NewsletterController {

    private final NewsletterService newsletterService;

    public NewsletterController(NewsletterService newsletterService) {
        this.newsletterService = newsletterService;
    }

    @PostMapping("/subscribe")
    public Response subscribe(@RequestBody Map<String, String> body) {
        try {
            newsletterService.subscribe(body.get("emailAddress"));
            return ResponseAPI.emptyPositiveResponse();
        } catch (Exception e) {
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

    @PostMapping("/send")
    public Response sendNewsletter(@RequestBody @Valid NewsletterDTO newsletterDTO) {
        try {
            newsletterService.sendNewsletter(newsletterDTO);
            return ResponseAPI.emptyPositiveResponse();
        } catch (Exception e) {
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

}
