package com.m4l0n.kneadly.kneadly.controller;

import com.m4l0n.kneadly.kneadly.response.Response;
import com.m4l0n.kneadly.kneadly.response.ResponseAPI;
import com.m4l0n.kneadly.kneadly.response.StatusCode;
import com.m4l0n.kneadly.kneadly.service.TestService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    private final TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    @GetMapping("/readFile")
    public Response readFile() {
        try {
            return ResponseAPI.positiveResponse(testService.readFile());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

    @GetMapping("/listFile")
    public Response listFile() {
        try {
            return ResponseAPI.positiveResponse(testService.listFiles());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseAPI.negativeResponse(StatusCode.INTERNAL_SERVER_ERROR, e.getMessage(), null);
        }
    }

}
